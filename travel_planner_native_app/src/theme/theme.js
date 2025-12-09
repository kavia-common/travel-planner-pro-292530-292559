export const theme = {
  name: 'Ocean Professional',
  description: 'Blue & amber accents',
  colors: {
    primary: 0x2563ebff,     // #2563EB
    secondary: 0xf59e0bff,   // #F59E0B
    success: 0x10b981ff,     // Tailwind green-500 (refined success)
    error: 0xef4444ff,       // #EF4444
    background: 0xf9fafbff,  // #f9fafb
    surface: 0xffffffff,     // #ffffff
    text: 0x111827ff,        // #111827
    muted: 0x6b7280ff        // gray-500
  },
  elevations: {
    card: 0.06, // subtle alpha overlay for pseudo-elevation
    raised: 0.1
  },
  radius: 16,
  spacing: {
    xs: 8, sm: 12, md: 16, lg: 24, xl: 32
  }
}

export function withAlpha(hexColor, alphaFloat) {
  const a = Math.max(0, Math.min(1, alphaFloat))
  const alpha = Math.round(a * 255)
  return (hexColor & 0xffffff00) | alpha
}

export function gradientBG(primary, background) {
  // Simple two-tone gradient suggestion via overlay element
  return { from: withAlpha(primary, 0.08), to: background }
}
