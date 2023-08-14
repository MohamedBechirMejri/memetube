/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {},
    },
    plugins: [
        require('@tailwindcss/typography'),
        require('@tailwindcss/forms'),
        require('@tailwindcss/line-clamp'),
        require('@tailwindcss/aspect-ratio'),
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        require('tailwindcss-elevation')(['responsive']),
        require('tailwindcss-no-scrollbar'),
    ],
}
