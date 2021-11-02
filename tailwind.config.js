const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
    mode: "jit",
    purge: [
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./vendor/laravel/jetstream/**/*.blade.php",
        "./storage/framework/views/*.php",
        "./resources/views/**/*.blade.php",
        "./resources/js/**/*.vue",
    ],

    theme: {
        colors: {
            primary: {
                600: "#029400",
                500: "#55c60c",
                400: "#8cfa4e",
            },

            secondary: {
                600: "#6d3a81",
                500: "#9d66b1",
                400: "#cf95e3",
            },
        },
    }
}
