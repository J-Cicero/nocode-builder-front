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
        'playfair-display': ['Playfair Display', 'serif'],
        'dm-sans': ['DM Sans', 'sans-serif'],
      },
      keyframes: {
        'in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'zoom-in-95': {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'slide-in-from-top-1': {
          '0%': { transform: 'translateY(-0.25rem)' },
          '100%': { transform: 'translateY(0)' },
        },
      },
      animation: {
        'in': 'fadeIn 0.2s ease-in',
        'fade-in': 'fadeIn 0.2s ease-in',
        'zoom-in-95': 'zoom-in-95 0.2s ease-out',
        'spin': 'spin 1s linear infinite',
      },
    },
  },
  plugins: [],
}
