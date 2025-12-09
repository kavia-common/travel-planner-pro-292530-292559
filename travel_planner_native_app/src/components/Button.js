import Blits from '@lightningjs/blits'
import { theme as baseTheme, withAlpha } from '../theme/theme.js'

// PUBLIC_INTERFACE
export default Blits.Component('Button', {
  /**
   * Button with label and callback.
   * Props: label, onPress (function), w, h
   */
  props: ['label', 'onPress', 'w', 'h'],
  template: `
    <Element :w="$w" :h="$h" :color="$bg" :alpha="$alpha">
      <Text :content="$label" :x="$paddingX" :y="$paddingY" :textColor="$text" fontSize="24" />
    </Element>
  `,
  state() {
    const t = baseTheme
    return {
      bg: t.colors.primary,
      text: 0xffffffff,
      alpha: 1,
      paddingX: 16,
      paddingY: 12,
      w: this.w || 220,
      h: this.h || 56
    }
  },
  input: {
    enter() {
      if (typeof this.onPress === 'function') {
        this.alpha = 0.85
        setTimeout(() => (this.alpha = 1), 120)
        this.onPress()
      }
    }
  },
  focus() {
    // Slight highlight on focus
    this.alpha = 0.95
  },
  unfocus() {
    this.alpha = 1
  }
})
