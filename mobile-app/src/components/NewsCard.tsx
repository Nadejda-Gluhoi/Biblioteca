import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { colors, fonts, spacing, borderRadius } from '../theme/colors';
import { NewsItem } from '../types';

interface NewsCardProps {
  news: NewsItem;
  onPress?: () => void;
}

const NewsCard: React.FC<NewsCardProps> = ({ news, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.8}
    >
      {news.image && (
        <Image
          source={{ uri: news.image }}
          style={styles.image}
          resizeMode="cover"
        />
      )}
      <View style={styles.content}>
        <Text style={styles.date}>{news.date}</Text>
        <Text style={styles.title} numberOfLines={2}>
          {news.title}
        </Text>
        <Text style={styles.contentText} numberOfLines={3}>
          {news.content}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
    marginBottom: spacing.md,
  },
  image: {
    width: '100%',
    height: 150,
  },
  content: {
    padding: spacing.md,
  },
  date: {
    fontSize: fonts.sizes.xs,
    color: colors.textMuted,
    marginBottom: spacing.xs,
  },
  title: {
    fontSize: fonts.sizes.lg,
    fontWeight: fonts.weights.semibold,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  contentText: {
    fontSize: fonts.sizes.sm,
    color: colors.textSecondary,
    lineHeight: 20,
  },
});

export default NewsCard;
