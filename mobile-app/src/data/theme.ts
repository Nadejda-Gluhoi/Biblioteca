/**
 * Theme configuration for EduMind Kids app
 * Child-friendly colors with warm tones, large buttons, and rounded corners
 */

export const colors = {
  // Primary colors - warm and inviting
  primary: '#FF6B6B',      // Coral red - main action color
  primaryLight: '#FF8E8E', // Lighter coral for hover states
  primaryDark: '#E85555',  // Darker coral for pressed states
  
  // Secondary colors
  secondary: '#4ECDC4',    // Teal - secondary actions
  secondaryLight: '#7EDDD6',
  secondaryDark: '#3DBDB5',
  
  // Accent colors for different sections
  lettersAccent: '#FFE66D',   // Sunny yellow for letters
  numbersAccent: '#95E1D3',   // Mint green for numbers
  
  // Background colors
  background: '#FFF9F0',      // Warm cream background
  backgroundLight: '#FFFFFF',
  backgroundDark: '#F5EDE0',
  backgroundGray: '#E8E8E8',  // Gray background for disabled elements
  cardBackground: '#FFFFFF',
  
  // Text colors
  textPrimary: '#2D3436',     // Dark gray for main text
  textSecondary: '#636E72',   // Medium gray for secondary text
  textLight: '#FFFFFF',
  textMuted: '#B2BEC3',
  
  // Status colors
  success: '#00B894',         // Green for correct answers
  error: '#FF7675',           // Soft red for wrong answers
  warning: '#FDCB6E',         // Yellow for warnings
  
  // Character colors
  simonaColor: '#FF6B6B',     // Simona's theme color
  eliseiColor: '#74B9FF',     // Elisei's theme color
  
  // Star/reward color
  star: '#FFD700',            // Gold for stars
  starOutline: '#FFA500',
  
  // UI elements
  border: '#DFE6E9',
  shadow: 'rgba(0, 0, 0, 0.1)',
  overlay: 'rgba(0, 0, 0, 0.5)',
};

export const fonts = {
  // Using system fonts for better performance
  primary: 'System',
  
  sizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 20,
    xl: 24,
    xxl: 32,
    xxxl: 40,
    title: 48,
  },
  
  weights: {
    light: '300' as const,
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
    extrabold: '800' as const,
  },
  
  lineHeights: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.8,
  },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
};

export const borderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  round: 9999,
};

export const shadows = {
  small: {
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  medium: {
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  large: {
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
};

// Animation durations
export const animations = {
  fast: 150,
  normal: 300,
  slow: 500,
};
