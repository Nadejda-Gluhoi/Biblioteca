/**
 * Custom Button Component
 * Child-friendly button with large touch targets and rounded corners
 * Supports multiple variants: primary, secondary, outline, disabled
 */

import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
} from 'react-native';
import { colors, fonts, spacing, borderRadius, shadows } from '../data/theme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'success' | 'letters' | 'numbers';
  size?: 'small' | 'medium' | 'large' | 'xlarge';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  icon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  style,
  textStyle,
  icon,
}) => {
  const getButtonStyle = (): ViewStyle[] => {
    const baseStyles: ViewStyle[] = [styles.button, styles[size], shadows.medium];

    // Apply variant styles
    switch (variant) {
      case 'secondary':
        baseStyles.push(styles.secondary);
        break;
      case 'outline':
        baseStyles.push(styles.outline);
        break;
      case 'success':
        baseStyles.push(styles.success);
        break;
      case 'letters':
        baseStyles.push(styles.letters);
        break;
      case 'numbers':
        baseStyles.push(styles.numbers);
        break;
      default:
        baseStyles.push(styles.primary);
    }

    if (disabled) {
      baseStyles.push(styles.disabled);
    }

    return baseStyles;
  };

  const getTextStyle = (): TextStyle[] => {
    const baseStyles: TextStyle[] = [styles.text, styles[`${size}Text`]];

    switch (variant) {
      case 'outline':
        baseStyles.push(styles.outlineText);
        break;
      case 'letters':
        baseStyles.push(styles.lettersText);
        break;
      case 'numbers':
        baseStyles.push(styles.numbersText);
        break;
      default:
        baseStyles.push(styles.lightText);
    }

    return baseStyles;
  };

  return (
    <TouchableOpacity
      style={[...getButtonStyle(), style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'outline' ? colors.primary : colors.textLight} />
      ) : (
        <>
          {icon}
          <Text style={[...getTextStyle(), textStyle]}>{title}</Text>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: borderRadius.xl,
    gap: spacing.sm,
  },
  // Size variants
  small: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    minHeight: 40,
  },
  medium: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    minHeight: 52,
  },
  large: {
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xl,
    minHeight: 64,
  },
  xlarge: {
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.xxl,
    minHeight: 80,
  },
  // Color variants
  primary: {
    backgroundColor: colors.primary,
  },
  secondary: {
    backgroundColor: colors.secondary,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 3,
    borderColor: colors.primary,
  },
  success: {
    backgroundColor: colors.success,
  },
  letters: {
    backgroundColor: colors.lettersAccent,
  },
  numbers: {
    backgroundColor: colors.numbersAccent,
  },
  disabled: {
    backgroundColor: colors.textMuted,
    opacity: 0.6,
  },
  // Text styles
  text: {
    fontWeight: fonts.weights.bold,
    textAlign: 'center',
  },
  smallText: {
    fontSize: fonts.sizes.md,
  },
  mediumText: {
    fontSize: fonts.sizes.lg,
  },
  largeText: {
    fontSize: fonts.sizes.xl,
  },
  xlargeText: {
    fontSize: fonts.sizes.xxl,
  },
  lightText: {
    color: colors.textLight,
  },
  outlineText: {
    color: colors.primary,
  },
  lettersText: {
    color: colors.textPrimary,
  },
  numbersText: {
    color: colors.textPrimary,
  },
});

export default Button;
