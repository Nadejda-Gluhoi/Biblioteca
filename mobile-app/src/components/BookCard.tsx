import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ImageSourcePropType,
} from 'react-native';
import { colors, fonts, spacing, borderRadius } from '../theme/colors';
import { Book } from '../types';

interface BookCardProps {
  book: Book;
  onPress?: () => void;
}

const BookCard: React.FC<BookCardProps> = ({ book, onPress }) => {
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Text key={i} style={styles.star}>
          {i < rating ? '★' : '☆'}
        </Text>
      );
    }
    return stars;
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.8}
    >
      {book.isNew && (
        <View style={styles.newBadge}>
          <Text style={styles.newBadgeText}>New</Text>
        </View>
      )}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: book.image }}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {book.title}
        </Text>
        <Text style={styles.author} numberOfLines={1}>
          {book.author}
        </Text>
        <View style={styles.ratingContainer}>{renderStars(book.rating)}</View>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>{book.price}</Text>
          <Text style={styles.currency}>lei</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    overflow: 'hidden',
    marginBottom: spacing.md,
  },
  newBadge: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: colors.black,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    zIndex: 1,
  },
  newBadgeText: {
    color: colors.white,
    fontSize: fonts.sizes.sm,
    fontWeight: fonts.weights.semibold,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.lg,
    backgroundColor: colors.backgroundGray,
  },
  image: {
    width: 120,
    height: 160,
  },
  content: {
    padding: spacing.md,
    alignItems: 'center',
  },
  title: {
    fontSize: fonts.sizes.md,
    fontWeight: fonts.weights.semibold,
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  author: {
    fontSize: fonts.sizes.sm,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  ratingContainer: {
    flexDirection: 'row',
    marginBottom: spacing.sm,
  },
  star: {
    fontSize: fonts.sizes.md,
    color: '#FFD700',
    marginHorizontal: 2,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  price: {
    fontSize: fonts.sizes.xl,
    fontWeight: fonts.weights.bold,
    color: colors.textPrimary,
  },
  currency: {
    fontSize: fonts.sizes.md,
    fontWeight: fonts.weights.bold,
    color: colors.primary,
    marginLeft: spacing.xs,
  },
});

export default BookCard;
