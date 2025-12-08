import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, fonts, spacing } from '../theme/colors';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  showSeeAll?: boolean;
  onSeeAllPress?: () => void;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  showSeeAll = false,
  onSeeAllPress,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </View>
      {showSeeAll && (
        <TouchableOpacity onPress={onSeeAllPress}>
          <Text style={styles.seeAll}>Vezi tot →</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.lg,
    paddingHorizontal: spacing.md,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: fonts.sizes.xxl,
    fontWeight: fonts.weights.bold,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: fonts.sizes.md,
    color: colors.textSecondary,
    lineHeight: 22,
  },
  seeAll: {
    fontSize: fonts.sizes.md,
    color: colors.primary,
    fontWeight: fonts.weights.semibold,
  },
});

export default SectionHeader;
