import Blits from '@lightningjs/blits'
import App from './App.js'

// Launch with standard key mappings
Blits.Launch(App, 'app', {
  w: 1280,
  h: 720,
  keys: {
    up: ['ArrowUp'],
    down: ['ArrowDown'],
    left: ['ArrowLeft'],
    right: ['ArrowRight'],
    enter: ['Enter', 'Space'],
    back: ['Escape', 'Backspace']
  }
})
