/**
 * Image pipeline.
 *
 *   src/assets/images/   sources, committed to git
 *          |  sharp
 *          v
 *   src/assets/img/      generated, git-ignored: <name>-<width>.<ext>
 *
 * HTML and CSS reference the generated files by these stable names; Vite adds
 * the content hash on build. Run with `npm run images` — npm also runs it
 * before `dev` and `build`. Unchanged sources are skipped.
 */
import { createHash } from 'node:crypto'
import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, extname, join, relative, resolve, sep } from 'node:path'
import sharp from 'sharp'
import config from '../image.config.js'

const ROOT = resolve(import.meta.dirname, '..')
const SOURCE_DIR = resolve(ROOT, 'src/assets/images')
const OUT_DIR = resolve(ROOT, 'src/assets/img')
// Cache metadata only; kept out of src/ so it never ships.
const MANIFEST = resolve(ROOT, '.image-manifest.json')

const FALLBACK_FORMAT = { '.jpg': 'jpeg', '.jpeg': 'jpeg', '.png': 'png' }
const EXT = { avif: 'avif', webp: 'webp', jpeg: 'jpg', png: 'png' }

/** Encoder options per format. Only options that format actually accepts. */
function encoderOptions(format, quality) {
  switch (format) {
    case 'jpeg':
      return { quality, progressive: true, mozjpeg: true }
    case 'png':
      return { quality, compressionLevel: 9, palette: true }
    default:
      return { quality, effort: 4 }
  }
}

const hash = (input) => createHash('sha256').update(input).digest('hex').slice(0, 8)

function listSources() {
  if (!existsSync(SOURCE_DIR)) return []
  return readdirSync(SOURCE_DIR, { recursive: true, withFileTypes: true })
    .filter((entry) => entry.isFile() && FALLBACK_FORMAT[extname(entry.name).toLowerCase()])
    .map((entry) => join(entry.parentPath, entry.name))
}

function loadManifest() {
  try {
    return JSON.parse(readFileSync(MANIFEST, 'utf8'))
  } catch {
    return {}
  }
}

async function build(file, key, settings) {
  const fallback = FALLBACK_FORMAT[extname(file).toLowerCase()]
  const stem = key.slice(0, -extname(key).length)
  const { width: sourceWidth } = await sharp(file).metadata()

  let widths = [...new Set(settings.widths)].filter((w) => w <= sourceWidth).sort((a, b) => a - b)
  if (widths.length === 0) widths = [sourceWidth]

  const outputs = []
  for (const width of widths) {
    const resized = sharp(file).resize({ width, withoutEnlargement: true })
    for (const format of settings.fallback ? [...settings.formats, fallback] : settings.formats) {
      const name = `${stem}-${width}.${EXT[format]}`
      const target = join(OUT_DIR, name)
      mkdirSync(dirname(target), { recursive: true })
      const quality = settings.quality[format] ?? 80
      await resized.clone().toFormat(format, encoderOptions(format, quality)).toFile(target)
      outputs.push(name)
    }
  }
  return outputs
}

async function run() {
  mkdirSync(OUT_DIR, { recursive: true })

  const previous = loadManifest()
  const manifest = {}
  let built = 0

  for (const file of listSources()) {
    const key = relative(SOURCE_DIR, file).replaceAll(sep, '/')
    const settings = { ...config, ...config.overrides?.[key] }
    const fileHash = hash(
      Buffer.concat([readFileSync(file), Buffer.from(JSON.stringify(settings))]),
    )
    const known = previous[key]

    if (known?.hash === fileHash && known.outputs.every((n) => existsSync(join(OUT_DIR, n)))) {
      manifest[key] = known
    } else {
      manifest[key] = { hash: fileHash, outputs: await build(file, key, settings) }
      built += 1
    }
  }

  // Drop files from earlier runs that no source produces any more.
  const keep = new Set(Object.values(manifest).flatMap((entry) => entry.outputs))
  let removed = 0
  for (const entry of readdirSync(OUT_DIR, { recursive: true, withFileTypes: true })) {
    if (!entry.isFile()) continue
    const name = relative(OUT_DIR, join(entry.parentPath, entry.name)).replaceAll(sep, '/')
    if (!keep.has(name)) {
      rmSync(join(OUT_DIR, name))
      removed += 1
    }
  }

  writeFileSync(MANIFEST, `${JSON.stringify(manifest, null, 2)}\n`)

  const total = Object.keys(manifest).length
  console.log(
    `images: ${total} source(s), ${built} built, ${total - built} unchanged` +
      (removed ? `, ${removed} stale file(s) removed` : ''),
  )
}

run().catch((error) => {
  console.error(`\nimages: failed — ${error.message}\n`)
  process.exitCode = 1
})
