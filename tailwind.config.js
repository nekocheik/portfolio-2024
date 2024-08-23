/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui'

export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    backgroundSize: {
      '100-auto': '100% auto'
    },
    extend: {
      transitionProperty: {
        size: 'width, height'
      },
      colors: {
        primary: '#7781d3ff', // primary-color
        secondary: '#f6f6f6ff', // secondary-color
        tertiary: '#ed420dff', // tertiary-color
        quinary: '#141414ff', // quinary-color
        'primary-light': '#5e4ae3bf', // primary light
        'primary-medium': '#342583ff', // primary medium
        black: '#000000ff', // black
        white: '#ffffffff', // white
        'primary-ligh': '#4f4296ff', // primary-ligh (check if this is a typo in your token name)
        vert: '#115417ff' // vert
      },
      fontFamily: {
        display: ['Aileron', 'sans-serif'], // Ensuring Aileron falls back to a generic sans-serif if not available
        body: ['Avenir', 'sans-serif'], // Assuming you want Avenir as the body font from your tokens
        kiona: ['Kiona'], // Assuming you want Avenir as the body font from your tokens
        joly: ['Joly Display', 'serif'] // Joly Display for specific use-cases
      },
      fontSize: {
        base: '16px', // Based on your design-system-color fontSize
        'title-desktop': '40px', // title lite/bold/semi bold - desktop
        'title-mobile': '32px', // title lite/bold/semi bold - mobile
        'paragraph-desktop': '16.5px', // paragraph - desktop
        'paragraph-mobile': '13.5px', // paragraph - mobile
        'light-text-mobile': '11px', // light text - mobile
        cta: '16.5px', // CTA font size
        joly: '44px' // Joly special font size
      },
      animation: {
        'hue-rotate-canvas': 'hue-rotate 5s linear infinite',
      },
      keyframes: {
        'hue-rotate': {
          '0%': { filter: 'hue-rotate(0deg)' },
          '50%': { filter: 'hue-rotate(180deg)' },
          '100%': { filter: 'hue-rotate(0deg)' },
        },
      },
      boxShadow: {
        'few-shadow': '0 4px 0 #00000040', // Few shadow
        'ultra-light-shadow': '0 4px 0 #0000000f' // Ultra light shadow
      }
    }
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        storm: {
          primary: '#9aa5ce',
          secondary: '#565f89',
          accent: '#bb9af7',
          neutral: '#111827',
          'base-100': '#24283b',
          info: '#2ac3de',
          success: '#9ece6a',
          warning: '#e0af68',
          error: '#f7768e'
        },
        breeze: {
          primary: '#6807f0',
          secondary: '#6b21a8',
          accent: '#db2777',
          neutral: '#170824',
          'base-100': '#f2f2f2',
          info: '#2ac3de',
          success: '#9ece6a',
          warning: '#e0af68',
          error: '#f7768e'
        }
      },
      'light',
      'dark',
      'cupcake',
      'bumblebee',
      'emerald',
      'corporate',
      'synthwave',
      'retro',
      'cyberpunk',
      'valentine',
      'halloween',
      'garden',
      'forest',
      'aqua',
      'lofi',
      'pastel',
      'fantasy',
      'wireframe',
      'black',
      'luxury',
      'dracula',
      'cmyk',
      'autumn',
      'business',
      'acid',
      'lemonade',
      'night',
      'coffee',
      'winter'
    ]
  }
}
