/**
 * Game Option Button Component
 * Large, colorful buttons used in educational games
 * Shows letters or numbers with feedback states (correct/incorrect)
 */

import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Animated } from 'react-native';
import { colors, fonts, spacing, borderRadius, shadows } from '../data/theme';

interface GameOptionButtonProps {
  label: string | number;
  onPress: () => void;
  disabled?: boolean;
  state?: 'default' | 'correct' | 'incorrect' | 'selected';
  size?: 'medium' | 'large';
}

const GameOptionButton: React.FC<GameOptionButtonProps> = ({
  label,
  onPress,
  disabled = false,
  state = 'default',
  size = 'large',
}) => {
  const getBackgroundColor = () => {
    switch (state) {
      case 'correct':
        return colors.success;
      case 'incorrect':
        return colors.error;
      case 'selected':
        return colors.secondary;
      default:
        return colors.cardBackground;
    }
  };

  const getTextColor = () => {
    switch (state) {
      case 'correct':
      case 'incorrect':
      case 'selected':
        return colors.textLight;
      default:
        return colors.textPrimary;
    }
  };

  const getBorderColor = () => {
    switch (state) {
      case 'correct':
        return colors.success;
      case 'incorrect':
        return colors.error;
      case 'selected':
        return colors.secondary;
      default:
        return colors.primary;
    }
  };

  const sizeStyle = size === 'large' ? styles.large : styles.medium;
  const textSizeStyle = size === 'large' ? styles.largeText : styles.mediumText;

  return (
    <TouchableOpacity
      style={[
        styles.button,
        sizeStyle,
        shadows.medium,
        {
          backgroundColor: getBackgroundColor(),
          borderColor: getBorderColor(),
        },
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <Text style={[styles.label, textSizeStyle, { color: getTextColor() }]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: borderRadius.xl,
    borderWidth: 4,
    margin: spacing.sm,
  },
  medium: {
    width: 80,
    height: 80,
  },
  large: {
    width: 100,
    height: 100,
  },
  label: {
    fontWeight: fonts.weights.bold,
  },
  mediumText: {
    fontSize: fonts.sizes.xxxl,
  },
  largeText: {
    fontSize: fonts.sizes.title,
  },
});

export default GameOptionButton;
