/**
 * Character Component
 * Displays Simona or Elisei character with speech bubble
 * Used in games and throughout the app for friendly guidance
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, fonts, spacing, borderRadius, shadows } from '../data/theme';

interface CharacterProps {
  name: 'simona' | 'elisei';
  message: string;
  size?: 'small' | 'medium' | 'large';
}

const Character: React.FC<CharacterProps> = ({ name, message, size = 'medium' }) => {
  const isSimona = name === 'simona';
  const characterColor = isSimona ? colors.simonaColor : colors.eliseiColor;
  
  const sizeStyles = {
    small: { avatar: 60, emoji: 28, bubble: fonts.sizes.md },
    medium: { avatar: 80, emoji: 36, bubble: fonts.sizes.lg },
    large: { avatar: 100, emoji: 44, bubble: fonts.sizes.xl },
  };
  
  const currentSize = sizeStyles[size];

  return (
    <View style={styles.container}>
      {/* Character avatar */}
      <View
        style={[
          styles.avatar,
          {
            width: currentSize.avatar,
            height: currentSize.avatar,
            backgroundColor: characterColor,
          },
          shadows.medium,
        ]}
      >
        <Text style={[styles.avatarEmoji, { fontSize: currentSize.emoji }]}>
          {isSimona ? '👧' : '👦'}
        </Text>
      </View>

      {/* Speech bubble */}
      <View style={[styles.speechBubble, shadows.small]}>
        <View style={[styles.bubbleArrow, { borderRightColor: colors.cardBackground }]} />
        <Text style={[styles.characterName, { color: characterColor }]}>
          {isSimona ? 'Simona' : 'Elisei'}:
        </Text>
        <Text style={[styles.message, { fontSize: currentSize.bubble }]}>
          {message}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: spacing.md,
  },
  avatar: {
    borderRadius: borderRadius.round,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  avatarEmoji: {
    textAlign: 'center',
  },
  speechBubble: {
    flex: 1,
    backgroundColor: colors.cardBackground,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    position: 'relative',
  },
  bubbleArrow: {
    position: 'absolute',
    left: -10,
    top: 20,
    width: 0,
    height: 0,
    borderTopWidth: 10,
    borderBottomWidth: 10,
    borderRightWidth: 12,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
  },
  characterName: {
    fontSize: fonts.sizes.md,
    fontWeight: fonts.weights.bold,
    marginBottom: spacing.xs,
  },
  message: {
    color: colors.textPrimary,
    fontWeight: fonts.weights.medium,
    lineHeight: 28,
  },
});

export default Character;
