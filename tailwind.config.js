const colors = require('tailwindcss/colors');

module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        colors: {
        // use colors only specified
        white: colors.white,
        gray: colors.gray,
        blue: colors.blue,
        red: colors.red,
        violet: colors.violet,
        black: colors.black,
        yellow: colors.yellow,
        dg: {
            '1000':"#0a0a0a",
            '900': "#1a1a1a",
            '700': "#212121",
            '400': "#343434",
            '300': "#535353"
        }

        },
        extend: {
            boxShadow: {
                'w-glow': '0 0 20px 20px rgb(0,0,0)',
            }
        },
    },
    plugins: [],
};