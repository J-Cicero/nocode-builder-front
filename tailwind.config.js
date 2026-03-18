export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary:    '#C4622D',
        'primary-dark': '#A04E22',
        secondary:  '#D4A017',
        bg:         '#FBF4E9',
        dark:       '#1A0E0A',
        green:      '#2D5A1B',
        'text-main':'#2C1A0E',
        'text-muted':'#7A5C44',
        border:     '#E8D9C4',
        card:       '#FFFFFF',
        error:      '#B03030',
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        body:    ['DM Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
