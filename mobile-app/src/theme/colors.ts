/**
 * Color palette based on the Biblioteca website design
 */
export const colors = {
  // Primary colors
  primary: '#ff4e5b',
  primaryDark: '#db5660',
  primaryLight: '#f12a47',

  // Background colors
  background: '#ffffff',
  backgroundDark: '#0c0116',
  backgroundGray: '#eae7e7',
  backgroundFooter: '#272222',

  // Text colors
  textPrimary: '#0c0116',
  textSecondary: '#666666',
  textLight: '#ffffff',
  textMuted: '#908d92',

  // Accent colors
  black: '#000000',
  white: '#ffffff',
  gray: '#8d8791',
  grayLight: '#ebebeb',

  // Status colors
  success: '#00a199',
  error: '#ed2540',
};

export const fonts = {
  primary: 'System',
  sizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 22,
    xxl: 28,
    xxxl: 36,
  },
  weights: {
    light: '300' as const,
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const borderRadius = {
  sm: 4,
  md: 8,
  lg: 16,
  xl: 24,
  round: 9999,
};
