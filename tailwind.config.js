/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      height: {
        'screen-minus-120': 'calc(100vh - 120px)',
      },

      boxShadow: {
        custom: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
        border:"rgba(0, 0, 0, 0.1) 0px 4px 12px"
      },
      fontSize: {
        clamp: "clamp(1rem, 5vw, 4rem)",
      },
      colors: {
        
        black: '#0a0b11',
        white: '#FFFFFF',
        appbarIcon: '#FFFFFF',
        appbarText: '#FFFFFF',
        navbar: '#252641',
        secondary: '#7F00FF',
        primaryBg: {
          light: '#FFFFFF',
          dark: '#171827',
        },
        secondaryBg: {
          light: '#FFFFFF',
          dark: "#1f2136",
        },
        text: {
          light: '#0a0b11',
          dark: '#FFFFFF',
        },
        icon: {
          light: '#0a0b11',
          dark: '#FFFFFF',
        },
        secondaryText: {
          light: '#797979',
          dark: '#DADADA',
        },
        base: {
          light: '#FFFFFF',
          dark: '#0a0b11',
        },
        highlight: {
          light: 'grey',
          dark: 'blueGrey',
        },
        error: 'red',
        // background:"#28282c",
        primary: "#7F00FF",
        thin: "#91929E",
        border: "#2b2d32",
        gradient: "linear-gradient(to right, #f7ab47 0%, #ffd030 100%)",
      },
    },
  },
  plugins: [],
};
