import Blits from '@lightningjs/blits'

// PUBLIC_INTERFACE
export const ThemeProvider = Blits.Component('ThemeProvider', {
  /**
   * Provides theme object to its children via reactive state binding.
   * Props:
   *  - theme: theme object with colors, spacing, radius, etc.
   */
  props: ['theme'],
  template: `
    <Element w="$app.w" h="$app.h">
      <Slot />
    </Element>
  `,
  state() {
    return {
      theme: this.theme
    }
  }
})
