import Blits from '@lightningjs/blits'
import { theme as baseTheme, withAlpha } from '../theme/theme.js'

// PUBLIC_INTERFACE
export default Blits.Component('Card', {
  /**
   * Container card for content.
   * Props: w, h, color
   */
  props: ['w', 'h', 'color'],
  template: `
    <Element :w="$w" :h="$h" :color="$color" :alpha="$alpha">
      <Slot />
    </Element>
  `,
  state() {
    const t = baseTheme
    return {
      w: this.w || 1120,
      h: this.h || 140,
      color: this.color || t.colors.surface,
      alpha: 1
    }
  }
})
