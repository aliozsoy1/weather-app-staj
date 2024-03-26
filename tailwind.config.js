/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'product' : '#8FB2F5',
        'textbox-bg' : '#1E1E29',
        'base' : {
          '900' : '#13131A',
          '800' : '#16161F',
          '700' : '#1C1C27',
          '600' : '#22222F',
          '500' : '#3B3B54',
          '400' : '#7F7F98',
          '300' : '#ABABC4',
          '200' : '#BFBFD4',
          '100' : '#FAFAFA',
          'white' : '#FFFFFF',
        }
      },
    },
  },
  plugins: [],
}

