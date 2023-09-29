/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: "#2663FF",
                low: "#bfdbfe",
                black: "#000000",
                grayish: "#616161",
                grayLight: "#C6C6C6",
                white: "#FAFAFA",
                green: "00D72F",
                card: "#F8F8F8",
                primaryLight: "#83c5be",
                white: "#edf2f4",
                grayText: "#2b2d42",
                grayLight: "#cad2c5",
                red: "#e63946",
                background: "#f1faee",
                blueLighter: "#a8dadc",
                blueLight: "#457b9d",
                blueDark: "#1d3557",
                yellow: "#ffb703",
            },
            fontFamily: {
                lato: ["Lato", "sans-serif"],
            },
        },
    },
    plugins: [],
}
