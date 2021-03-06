const plugin = require('tailwindcss/plugin');

module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [
    plugin(function({ addComponents }) {
      const styles = {
        '.max-w-8xl': {
          maxWidth: '100rem',
        },
      }

      addComponents(styles)
    })
  ],
};
