import Blits from '@lightningjs/blits'
import HeaderBar from '../components/HeaderBar.js'
import Button from '../components/Button.js'
import Card from '../components/Card.js'
import { theme as baseTheme } from '../theme/theme.js'

// PUBLIC_INTERFACE
export default Blits.Component('TripDetailsScreen', {
  /**
   * Trip details: itinerary day-by-day view.
   * Props: tripId (from route)
   */
  props: ['tripId'],
  components: { HeaderBar, Button, Card },
  template: `
    <Element :color="$background" w="$app.w" h="$app.h">
      <HeaderBar :title="$title" />
      <Element x="40" y="100">
        <Text :content="'Destination: ' + $trip.destination" fontSize="24" :textColor="$text" />
        <Text :content="$trip.startDateISO + ' → ' + $trip.endDateISO" y="36" fontSize="22" :textColor="$muted" />
      </Element>

      <Element x="40" y="180">
        <Text content="Itinerary" fontSize="26" :textColor="$text" />
      </Element>

      <Element x="40" y="220">
        <Element :for="(day, idx) in $trip.days" :key="$day.id" :y="$idx * 170">
          <Card w="1200" h="150">
            <Text :content="$day.dateISO" x="24" y="16" fontSize="24" :textColor="$text" />
            <Element x="24" y="56">
              <Text :content="$day.items.length ? 'Planned items:' : 'No items yet. Add later.'" fontSize="22" :textColor="$muted" />
            </Element>
            <Element x="980" y="50">
              <Button label="Add Item" :onPress="() => $addItem($day.id)" w="180" h="56" />
            </Element>
          </Card>
        </Element>
      </Element>

      <Element x="40" :y="$app.h - 100">
        <Button label="Back" :onPress="$goBack" w="160" h="56" />
      </Element>
    </Element>
  `,
  state() {
    const t = baseTheme
    return {
      background: t.colors.background,
      text: t.colors.text,
      muted: t.colors.muted,
      trip: { id: '', title: '', destination: '', startDateISO: '', endDateISO: '', days: [] },
      title: 'Trip Details'
    }
  },
  async mounted() {
    // find TripsProvider
    let p = this.parent
    while (p && typeof p.getTrip !== 'function') p = p.parent
    this._trips = p
    const trip = await this._trips.getTrip(this.tripId)
    if (trip) {
      this.trip = trip
      this.title = trip.title
    }
  },
  methods: {
    async addItem(dayId) {
      // Placeholder: adding a stub item in memory and persisting
      await this._trips.updateTrip(this.tripId, (t) => {
        const clone = JSON.parse(JSON.stringify(t))
        const day = clone.days.find(d => d.id === dayId)
        if (day) {
          day.items.push({
            id: `${dayId}-item-${day.items.length + 1}`,
            tripId: t.id,
            dayId,
            time: '09:00',
            title: 'New activity',
            notes: 'Details to be added'
          })
        }
        return clone
      })
      const updated = await this._trips.getTrip(this.tripId)
      this.trip = updated
    },
    goBack() {
      this.$router.back()
    }
  }
})
