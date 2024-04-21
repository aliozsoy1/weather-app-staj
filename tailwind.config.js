/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        product: "#8FB2F5",
        "textbox-bg": "#1E1E29",
        "city-list": "#3B3B54",
        "weather-details-bg": "#16161F",
        base: {
          900: "#13131A",
          800: "#16161F",
          700: "#1C1C27",
          600: "#22222F",
          500: "#3B3B54",
          400: "#7F7F98",
          300: "#ABABC4",
          200: "#BFBFD4",
          100: "#FAFAFA",
          white: "#FFFFFF",
        },
      },
      backgroundImage: {
        "clear-day": "url('/src/images/weatherbg-images/bg-clear-day.jpg')",
        "clear-night": "url('/src/images/weatherbg-images/bg-clear-night.png')",
        "cloudy-day": "url('/src/images/weatherbg-images/bg-cloudy-day.jpg')",
        "cloudy-night": "url('/src/images/weatherbg-images/bg-cloudy-night.png')",
        "fewcloudy-day": "url('/src/images/weatherbg-images/bg-fewclouds-night.png')",
        "fewcloudy-night": "url('/src/images/weatherbg-images/bg-fewclouds-night.png')",
        "rainy-day": "url('/src/images/weatherbg-images/bg-rain-night.png')",
        "rainy-night": "url('/src/images/weatherbg-images/bg-rain-night.png')",
        "storm-day": "url('/src/images/weatherbg-images/bg-storm-night.png')",
        "storm-night": "url('/src/images/weatherbg-images/bg-storm-night.png')",
        "default-day": "url('/src/images/weatherbg-images/bg-cloudy-night.png')",
        "default-night": "url('/src/images/weatherbg-images/bg-cloudy-night.png')",
      },
      fontSize: {
        'heading-hg': '6rem', // 96px
        'heading-xl': '3rem', // 48px
        'heading-lg': '2rem', // 32px
        'heading-md': '1.25rem', // 20px
        'heading-sm': '1rem', // 16px
        'heading-xs': '0.875rem', // 14px
        'text-lg': '1.25rem', // 20px
        'text-md': '1rem',    // 16px
        'text-sm': '0.875rem', // 14px
        'text-xs': '0.75rem',  // 12px
      },
      fontWeight: {
        'text-normal': 400,  // Regular
        'text-bold': 700,    // Bold
        'heading-extrabold': 800,
        'heading-bold': 700,
      },
    },
  },
  plugins: [
    require('tailwindcss-animated')
  ],
};