import Blits from '@lightningjs/blits'
import HeaderBar from '../components/HeaderBar.js'
import { theme as baseTheme } from '../theme/theme.js'

// PUBLIC_INTERFACE
export default Blits.Component('SettingsScreen', {
  /**
   * Basic settings placeholder screen.
   */
  components: { HeaderBar },
  template: `
    <Element :color="$background" w="$app.w" h="$app.h">
      <HeaderBar title="Settings" />
      <Element x="40" y="120">
        <Text content="Settings will go here." fontSize="24" :textColor="$text" />
      </Element>
    </Element>
  `,
  state() {
    const t = baseTheme
    return {
      background: t.colors.background,
      text: t.colors.text
    }
  }
})
