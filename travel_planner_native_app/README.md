# Travel Planner Native App (Lightning JS 3 / Blits)

Modern, minimalist travel planner with Ocean Professional theme. Core screens:
- Home (upcoming trips)
- Create Trip (form skeleton)
- Trip Details (day-by-day itinerary)
- Settings

Tech:
- Lightning JS 3.0 (Blits) for native/WebGL UI
- idb-keyval for lightweight local storage
- JSDoc typedefs for type-safe models
- Simple state provider for Trips

## Getting Started

Prerequisites:
- Node.js 18+

Install:
```
npm install
```

Run in dev:
```
npm start
```
This launches the Blits dev server and opens the app at a local URL.

Build:
```
npm run build
```

Serve production build:
```
npm run serve
```

## Controls
- Arrow keys: navigate focus
- Enter/Space: select
- Escape/Backspace: back

## Storage
Lightweight storage uses IndexedDB via `idb-keyval`. Data keys are prefixed with `travel_planner__`. No external services are integrated yet.

## Project Structure
```
src/
  App.js                # Application root & routes
  main.js               # Launcher
  components/
    Button.js
    Card.js
    HeaderBar.js
  screens/
    HomeScreen.js
    CreateTripScreen.js
    TripDetailsScreen.js
    SettingsScreen.js
  models/
    types.js            # Trip & Itinerary typedefs and helpers
  storage/
    storage.js          # get/save/delete/list abstraction
  state/
    TripsContext.js     # trips store/provider
  theme/
    theme.js            # Ocean Professional palette
    ThemeProvider.js
public/
  index.html
```

## Theme: Ocean Professional
- Primary: #2563EB
- Secondary: #F59E0B
- Error: #EF4444
- Background: #f9fafb
- Surface: #ffffff
- Text: #111827
Design: Modern, subtle shadows and rounding, accent highlights.

## Notes
- Input fields are stubbed for now; real text input components can be added later.
- All screens are placeholders and ready for expansion.
- Assets should be placed in `public/assets/` and referenced like `src="assets/my.png"` with explicit width and height when used in Lightning.

``` 

Instructions for future agent:
- If real text input controls are required, add appropriate Lightning components for text entry.
- Add unit tests if a test framework is introduced; currently none provided. 
- Expand state and routing as new features are added (edit trip, delete confirmation, settings options).
```
