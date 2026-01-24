import type { Config } from 'tailwindcss'

export default <Config>{
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#C5A038', // Gold
          light: '#D4B86A',
          dark: '#A08028',
        },
        secondary: {
            DEFAULT: '#2C3E50', // Dark Blue/Slate
            light: '#3E5871', 
        },
        dark: {
            DEFAULT: '#1a1a1a',
            card: '#252525',
            input: '#333333',
        },
        accent: '#E74C3C',
        bull: '#2ecc71',
        bear: '#e74c3c',
      },
      fontFamily: {
        sans: ['Tajawal', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
