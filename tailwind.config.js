/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: {
            DEFAULT: '#123B67',
            50: '#F0F5FA',
            100: '#DCE7F3',
            200: '#BDD3E8',
            300: '#94B8DB',
            400: '#5F95C8',
            500: '#3873B0',
            600: '#235992',
            700: '#1A497B',
            800: '#123B67',
            900: '#0C2847',
            950: '#07182C'
          },
          teal: {
            DEFAULT: '#16A6A0',
            50: '#F0FAF9',
            100: '#DDF4F2',
            200: '#BBEAE5',
            300: '#8CD9D1',
            400: '#4EC0B6',
            500: '#16A6A0',
            600: '#128682',
            700: '#126C69',
            800: '#135654',
            900: '#144846',
            950: '#072A29'
          }
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(18, 59, 103, 0.08)',
        'soft-lg': '0 12px 30px -4px rgba(18, 59, 103, 0.12)',
        'teal-glow': '0 0 25px -5px rgba(22, 166, 160, 0.35)',
      }
    },
  },
  plugins: [],
}

