import Blits from '@lightningjs/blits'

import HomeScreen from './screens/HomeScreen.js'
import CreateTripScreen from './screens/CreateTripScreen.js'
import TripDetailsScreen from './screens/TripDetailsScreen.js'
import SettingsScreen from './screens/SettingsScreen.js'

import { ThemeProvider } from './theme/ThemeProvider.js'
import { theme } from './theme/theme.js'
import { TripsProvider } from './state/TripsContext.js'

// PUBLIC_INTERFACE
const App = Blits.Application({
  /**
   * Root application for Travel Planner. Renders the router view and provides
   * theme and state context providers.
   */
  name: 'TravelPlannerApp',
  template: `
    <Element :color="$theme.backgroundColor" w="$app.w" h="$app.h">
      <ThemeProvider :theme="$theme">
        <TripsProvider>
          <RouterView />
        </TripsProvider>
      </ThemeProvider>
    </Element>
  `,
  state() {
    return {
      theme
    }
  },
  routes: [
    { path: '/', component: HomeScreen, options: { title: 'Home' } },
    { path: '/create', component: CreateTripScreen, options: { title: 'Create Trip' } },
    { path: '/trip/:tripId', component: TripDetailsScreen, options: { title: 'Trip Details' } },
    { path: '/settings', component: SettingsScreen, options: { title: 'Settings' } }
  ]
})

export default App
