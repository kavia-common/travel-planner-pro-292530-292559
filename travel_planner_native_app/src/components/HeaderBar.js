import Blits from '@lightningjs/blits'
import { theme as baseTheme } from '../theme/theme.js'

// PUBLIC_INTERFACE
export default Blits.Component('HeaderBar', {
  /**
   * Top app bar with title and optional right action.
   * Props: title
   */
  props: ['title'],
  template: `
    <Element w="$app.w" h="72" :color="$bg">
      <Text x="24" y="22" :content="$title" :textColor="$text" fontSize="28" />
      <Slot name="right" />
    </Element>
  `,
  state() {
    const t = baseTheme
    return {
      bg: t.colors.surface,
      text: t.colors.text
    }
  }
})
