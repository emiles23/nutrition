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
        extend: {
            colors: {
                primary: {
                    600: "#029400",
                    500: "#55c60c",
                    400: "#9edf58",
                },

                secondary: {
                    600: "#6d3a81",
                    500: "#9d66b1",
                    400: "#cf95e3",
                },

                protein: {
                    600: "#c51223",
                    500: "#ff534c",
                    400: "#ff8778",
                },

                grease: {
                    600: "#c69c00",
                    500: "#fdcd44",
                    400: "#ffff77",
                },

                crabohydrates: {
                    600: "#008994",
                    500: "#07b9c5",
                    400: "#61ecf8",
                },
            },
        }
    }
}
