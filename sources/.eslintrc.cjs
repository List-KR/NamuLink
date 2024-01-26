module.exports = {
	env: {
		es2022: true
	},
	extends: [
		'xo'
	],
	overrides: [
		{
			extends: [
				'xo-typescript',
			],
			files: [
				'**/**.ts',
			],
			rules:
			{
				'@typescript-eslint/naming-convention': ['error', {
					selector: ['variableLike', 'parameterProperty', 'classProperty', 'typeProperty'],
					format: ['PascalCase']
				}],
				'@typescript-eslint/semi': ['error', 'never'],
				'@typescript-eslint/prefer-nullish-coalescing': 'off',
				'new-cap': 'off'
			}
		}
	],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module'
	},
	rules: {
    'no-var': 'off',
		'comma-dangle': 'off',
		indent: ['off', 'tab'],
		semi: 'off'
	}
}
