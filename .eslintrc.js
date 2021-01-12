module.exports = {
    parser: '@typescript-eslint/parser',
    plugins: [
        '@typescript-eslint',
        "react",
        "only-warn"
    ],
    env: {
        browser: true,
        amd: true,
        node: true,
        es6: true,
        jest: true,
    },
    parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
        createDefaultProgram: true,
        ecmaFeatures: {
            jsx: true
        }
    },
    // extends: [
    //     "eslint:recommended",
    //     "plugin:react/recommended",
    //     "plugin:react-hooks/recommended",
    //     "plugin:@typescript-eslint/recommended",
    //     "plugin:@typescript-eslint/recommended-requiring-type-checking"
    // ]
};