/**
 * Models and helpers for Trip and Itinerary types.
 * Using JSDoc typedefs to keep code type-safe in editors.
 */

/**
 * @typedef {Object} ItineraryItem
 * @property {string} id
 * @property {string} tripId
 * @property {string} dayId
 * @property {string} time - e.g., "09:00"
 * @property {string} title
 * @property {string} notes
 * @property {string} [location]
 */

/**
 * @typedef {Object} TripDay
 * @property {string} id
 * @property {string} dateISO - YYYY-MM-DD
 * @property {ItineraryItem[]} items
 */

/**
 * @typedef {Object} Trip
 * @property {string} id
 * @property {string} title
 * @property {string} startDateISO
 * @property {string} endDateISO
 * @property {string} destination
 * @property {TripDay[]} days
 * @property {number} createdAt
 */

/**
 * PUBLIC_INTERFACE
 * Create a new Trip skeleton with computed days between start and end date.
 * @param {Object} p
 * @param {string} p.id
 * @param {string} p.title
 * @param {string} p.destination
 * @param {string} p.startDateISO
 * @param {string} p.endDateISO
 * @returns {Trip}
 */
export function createTrip({ id, title, destination, startDateISO, endDateISO }) {
  const days = []
  const start = new Date(startDateISO)
  const end = new Date(endDateISO)
  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    days.push({
      id: `${id}-${d.toISOString().slice(0, 10)}`,
      dateISO: d.toISOString().slice(0, 10),
      items: []
    })
  }
  return {
    id,
    title,
    destination,
    startDateISO,
    endDateISO,
    days,
    createdAt: Date.now()
  }
}
