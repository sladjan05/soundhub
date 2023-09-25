/** @type {import('prettier').Config} */
module.exports = {
    tabWidth: 4,

    singleQuote: true,
    jsxSingleQuote: true,

    trailingComma: 'none',
    quoteProps: 'consistent',

    plugins: [
        'prettier-plugin-organize-imports',
        'prettier-plugin-tailwindcss'
    ],

    tailwindConfig: 'tailwind.config.js',
    tailwindFunctions: ['cva', 'cn']
};
