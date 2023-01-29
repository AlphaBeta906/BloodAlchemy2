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
		"plugin:astro/recommended"
	],
	overrides: [
		{
			// Define the configuration for `.astro` file.
			files: [
				"*.astro"
			],
			// Allows Astro components to be parsed.
			parser: "astro-eslint-parser",
			// Parse the script in `.astro` as TypeScript by adding the following configuration.
			// It's the setting you need when using TypeScript.
			parserOptions: {},
			rules: {
				// override/add rules settings here, such as:
				// "astro/no-set-html-directive": "error"
			}
		}
	],
	parser: "@babel/eslint-parser",
	parserOptions: {
		requireConfigFile: false,
		ecmaVersion: "latest",
		sourceType: "module"
	},
	plugins: [
		"react",
		"react-hooks"
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
		]
	}
};