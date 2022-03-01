module.exports = {
	parser: '@babel/eslint-parser',
	plugins: ['import', 'jsx-a11y', 'react', 'react-hooks'],
	extends: [
		'./rules/best-practices',
		'./rules/errors',
		'./rules/node',
		'./rules/style',
		'./rules/variables',
		'./rules/es6',
		'./rules/imports',
		'./rules/strict',
		'./rules/react',
		'./rules/react-a11y',
		'./rules/react-hooks.js',
	]
		.map(require.resolve)
		.concat(['prettier', 'plugin:prettier/recommended']),
}
