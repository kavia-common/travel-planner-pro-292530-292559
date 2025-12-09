import Blits from '@lightningjs/blits'
import HeaderBar from '../components/HeaderBar.js'
import Button from '../components/Button.js'
import Card from '../components/Card.js'
import { theme as baseTheme } from '../theme/theme.js'

// PUBLIC_INTERFACE
export default Blits.Component('HomeScreen', {
  /**
   * Home screen: shows upcoming trips list and actions.
   */
  components: { HeaderBar, Button, Card },
  template: `
    <Element :color="$background" w="$app.w" h="$app.h">
      <HeaderBar title="Travel Planner">
        <Element slot="right" :x="$app.w - 200" y="8">
          <Button label="Settings" :onPress="$toSettings" w="160" h="52" />
        </Element>
      </HeaderBar>

      <Element x="40" y="96">
        <Button label="Create Trip" :onPress="$toCreate" w="220" h="56" />
      </Element>

      <Element x="40" y="180">
        <Text content="Upcoming Trips" fontSize="26" :textColor="$text" />
      </Element>

      <Element x="40" y="220">
        <Element 
          :for="(trip, index) in $trips" 
          :key="$trip.id"
          :y="$index * 156"
        >
          <Card w="1200" h="140">
            <Text :content="$trip.title" x="24" y="18" fontSize="28" :textColor="$text" />
            <Text :content="'Destination: ' + $trip.destination" x="24" y="62" fontSize="22" :textColor="$muted" />
            <Text :content="$trip.startDateISO + ' → ' + $trip.endDateISO" x="24" y="96" fontSize="22" :textColor="$muted" />
            <Element x="980" y="44">
              <Button label="Open" :onPress="() => $openTrip($trip.id)" w="180" h="56" />
            </Element>
          </Card>
        </Element>
      </Element>

      <Element x="40" :y="$emptyY" :alpha="$hasTrips ? 0 : 1">
        <Text content="No trips yet. Create your first trip!" fontSize="24" :textColor="$muted" />
      </Element>
    </Element>
  `,
  state() {
    const t = baseTheme
    return {
      background: t.colors.background,
      text: t.colors.text,
      muted: t.colors.muted,
      trips: [],
      hasTrips: false,
      emptyY: 220
    }
  },
  async mounted() {
    // Access TripsProvider (parent) state
    // Find nearest parent with "trips" in state (TripsProvider)
    let p = this.parent
    while (p && typeof p.trips === 'undefined') p = p.parent
    this._tripsProvider = p
    this.trips = p.trips
    this.hasTrips = this.trips.length > 0

    // Watch for updates by polling simple interval (lightweight for skeleton)
    this._int = setInterval(() => {
      if (this.trips !== p.trips) {
        this.trips = p.trips
        this.hasTrips = this.trips.length > 0
      }
    }, 400)
  },
  destroyed() {
    if (this._int) clearInterval(this._int)
  },
  methods: {
    toCreate() {
      this.$router.to('/create')
    },
    toSettings() {
      this.$router.to('/settings')
    },
    openTrip(id) {
      this.$router.to(`/trip/${id}`)
    }
  }
})
