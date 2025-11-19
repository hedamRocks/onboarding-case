/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/components/**/*.{js,vue,ts}",
    "./app/layouts/**/*.vue",
    "./app/pages/**/*.vue",
    "./app/plugins/**/*.{js,ts}",
    "./app/app.vue",
    "./app/error.vue",
  ],
  theme: {
    extend: {
      colors: {
        clever: {
          dark: '#003732',
          medium: '#668784',
          light: '#CCD7D6',
          extralight: '#E6EBEB',
        },
      },
      fontFamily: {
        clever: ['CleverFont', 'sans-serif'],
      },
      animation: {
        'slide-up': 'slide-up 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards',
      },
      keyframes: {
        'slide-up': {
          '0%': {
            opacity: '0',
            transform: 'translateY(20px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
      },
      animationDelay: {
        '75': '75ms',
        '100': '100ms',
        '150': '150ms',
        '200': '200ms',
        '300': '300ms',
        '500': '500ms',
      },
    },
  },
  plugins: [],
}
