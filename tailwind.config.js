/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.tsx"
  ],
  theme: {
    textColor: {
      'red': '#cc0000',
      'white': '#ffffff',
      's-green': '#1db954'
    },
    colors: {
      'light-red': '#ff5436',
      'light-red-confirm': '#d74129',
      'red': '#cc0000',
      'green': '#1db954',
      'green-confirm': '#008633',
      'white': '#ffffff',
      'black': '#191414',
      'uber-black': '#000000',
      'grey': '#2b2424',
      'light-grey': '#333030',
      'lighter-grey': '#4d4848'
    },
    minHeight: {
      'default-header-height': '80px',
      'default-footer-height': '100px',
      'default-page-height': 'calc(100vh - 180px)'
    },
    maxHeight: {
      'search-height': 'calc(100vh - 286px)',
      'default-page-height': 'calc(100vh - 180px)',
      'playlist-height': 'calc(100vh - 400px)'
    },
    backgroundImage: {
      'liked-songs-cover': 'linear-gradient(135deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 30%, rgba(233,251,255,1) 100%)'
    },
    extend: {},
  },
  plugins: [],
}

