import Blits from '@lightningjs/blits'
import { nanoid } from 'nanoid'
import { createTrip } from '../models/types.js'
import { listItems, saveItem, deleteItem, loadItem } from '../storage/storage.js'

const COLLECTION = 'trips'

// PUBLIC_INTERFACE
export const TripsProvider = Blits.Component('TripsProvider', {
  /**
   * Provides trips list state and mutation methods to children.
   */
  template: `
    <Element w="$app.w" h="$app.h">
      <Slot />
    </Element>
  `,
  state() {
    return {
      trips: [],
      loaded: false
    }
  },
  async mounted() {
    // Load initial trips
    this.trips = await listItems(COLLECTION)
    this.loaded = true

    // Seed with stub data if empty
    if (this.trips.length === 0) {
      const id = nanoid()
      const sample = createTrip({
        id,
        title: 'Sample: Pacific Getaway',
        destination: 'Honolulu',
        startDateISO: new Date().toISOString().slice(0, 10),
        endDateISO: new Date(Date.now() + 2 * 86400000).toISOString().slice(0, 10)
      })
      await saveItem(COLLECTION, id, sample)
      this.trips = await listItems(COLLECTION)
    }
  },
  methods: {
    // PUBLIC_INTERFACE
    async createNewTrip({ title, destination, startDateISO, endDateISO }) {
      const id = nanoid()
      const trip = createTrip({ id, title, destination, startDateISO, endDateISO })
      await saveItem(COLLECTION, id, trip)
      this.trips = await listItems(COLLECTION)
      return id
    },
    // PUBLIC_INTERFACE
    async removeTrip(tripId) {
      await deleteItem(COLLECTION, tripId)
      this.trips = await listItems(COLLECTION)
    },
    // PUBLIC_INTERFACE
    async getTrip(tripId) {
      return loadItem(COLLECTION, tripId)
    },
    // PUBLIC_INTERFACE
    async updateTrip(tripId, updater) {
      const t = await this.getTrip(tripId)
      const updated = updater(t)
      await saveItem(COLLECTION, tripId, updated)
      this.trips = await listItems(COLLECTION)
      return updated
    }
  }
})
