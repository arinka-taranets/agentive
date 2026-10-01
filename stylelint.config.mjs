/** @type {import('stylelint').Config} */
export default {
  extends: ['stylelint-config-standard'],
  ignoreFiles: ['dist/**', 'node_modules/**'],
  rules: {
    // Plain kebab-case classes, no BEM. Low specificity is enforced below instead.
    'selector-class-pattern': [
      '^[a-z][a-z0-9]*(-[a-z0-9]+)*$',
      { message: 'Expected class to be kebab-case' },
    ],
    'custom-property-pattern': '^[a-z][a-z0-9]*(-[a-z0-9]+)*$',

    // Cascade layers decide precedence, so selectors stay flat and cheap to override.
    'selector-max-id': 0,
    'selector-max-compound-selectors': 3,
    'max-nesting-depth': [2, { ignoreAtRules: ['media', 'supports', 'layer', 'container'] }],

    // Order inside a layer follows the component, not specificity.
    'no-descending-specificity': null,
  },
}
