/**
 * Category Card Component
 * Large card for Home screen navigation to Letters or Numbers sections
 * Features an icon, title, and gradient-like background
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, fonts, spacing, borderRadius, shadows } from '../data/theme';

interface CategoryCardProps {
  title: string;
  subtitle?: string;
  icon: keyof typeof Ionicons.glyphMap;
  backgroundColor: string;
  iconBackgroundColor: string;
  onPress: () => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  title,
  subtitle,
  icon,
  backgroundColor,
  iconBackgroundColor,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor }, shadows.large]}
      onPress={onPress}
      activeOpacity={0.9}
    >
      <View style={[styles.iconContainer, { backgroundColor: iconBackgroundColor }]}>
        <Ionicons name={icon} size={48} color={colors.textLight} />
      </View>
      <Text style={styles.title}>{title}</Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      
      {/* Arrow indicator */}
      <View style={styles.arrowContainer}>
        <Ionicons name="arrow-forward-circle" size={32} color={colors.textLight + '80'} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: borderRadius.xxl,
    padding: spacing.xl,
    minHeight: 180,
    justifyContent: 'flex-start',
    position: 'relative',
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: borderRadius.xl,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  title: {
    fontSize: fonts.sizes.xxl,
    fontWeight: fonts.weights.bold,
    color: colors.textLight,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: fonts.sizes.md,
    color: colors.textLight + 'CC',
  },
  arrowContainer: {
    position: 'absolute',
    bottom: spacing.lg,
    right: spacing.lg,
  },
});

export default CategoryCard;
