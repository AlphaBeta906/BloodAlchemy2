module.exports = {
	env: {
		browser: true,
		es2021: true,
		node: true
	},
	extends: [
		"eslint:recommended",
		"plugin:react/recommended",
		"plugin:react/jsx-runtime",
		"plugin:@typescript-eslint/recommended"
	],
	parser: "@typescript-eslint/parser",
	parserOptions: {
		requireConfigFile: false,
		ecmaVersion: "latest",
		sourceType: "module"
	},
	plugins: [
		"react",
		"react-hooks",
		"@typescript-eslint"
	],
	rules: {
		"indent": [
			"error",
			"tab",
			{
				"SwitchCase": 1
			}
		],
		"linebreak-style": [
			"error",
			"unix"
		],
		"quotes": [
			"error",
			"double"
		],
		"semi": [
			"error",
			"always"
		],
		"react-hooks/rules-of-hooks": "error", // Checks rules of Hooks
		"react-hooks/exhaustive-deps": "warn" // Checks effect dependencies
	}
};