import Blits from '@lightningjs/blits'
import HeaderBar from '../components/HeaderBar.js'
import Button from '../components/Button.js'
import { theme as baseTheme } from '../theme/theme.js'

// PUBLIC_INTERFACE
export default Blits.Component('CreateTripScreen', {
  /**
   * Create Trip: skeleton form with static sample values and create action.
   * Note: Lightning doesn't have native text inputs in this skeleton; values are stubbed.
   */
  components: { HeaderBar, Button },
  template: `
    <Element :color="$background" w="$app.w" h="$app.h">
      <HeaderBar title="Create Trip" />
      <Element x="40" y="120">
        <Text content="Form fields are placeholders for now." fontSize="22" :textColor="$muted" />
      </Element>

      <Element x="40" y="170">
        <Text content="Title: 'Business Summit'" fontSize="24" :textColor="$text" />
      </Element>
      <Element x="40" y="210">
        <Text content="Destination: 'San Francisco'" fontSize="24" :textColor="$text" />
      </Element>
      <Element x="40" y="250">
        <Text :content="'Start: ' + $startDate" fontSize="24" :textColor="$text" />
      </Element>
      <Element x="40" y="290">
        <Text :content="'End:   ' + $endDate" fontSize="24" :textColor="$text" />
      </Element>

      <Element x="40" y="360">
        <Button label="Create Trip" :onPress="$create" w="240" h="56" />
      </Element>

      <Element x="300" y="360">
        <Button label="Back" :onPress="$goBack" w="160" h="56" />
      </Element>
    </Element>
  `,
  state() {
    const t = baseTheme
    const today = new Date().toISOString().slice(0, 10)
    const end = new Date(Date.now() + 86400000).toISOString().slice(0, 10)
    return {
      background: t.colors.background,
      text: t.colors.text,
      muted: t.colors.muted,
      startDate: today,
      endDate: end
    }
  },
  mounted() {
    // find TripsProvider
    let p = this.parent
    while (p && typeof p.createNewTrip !== 'function') p = p.parent
    this._trips = p
  },
  methods: {
    async create() {
      const id = await this._trips.createNewTrip({
        title: 'Business Summit',
        destination: 'San Francisco',
        startDateISO: this.startDate,
        endDateISO: this.endDate
      })
      this.$router.to(`/trip/${id}`)
    },
    goBack() {
      this.$router.back()
    }
  }
})
