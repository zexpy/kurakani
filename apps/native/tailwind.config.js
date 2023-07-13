/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            colors: {
                primary: '#2663FF',
                low: '#bfdbfe',
                black: '#000000',
                grayish: '#616161',
                grayLight: '#C6C6C6',
                white: '#FAFAFA',
                green: '00D72F',
                card: '#F8F8F8',
            },
            fontFamily: {
                lato: ['Lato', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
