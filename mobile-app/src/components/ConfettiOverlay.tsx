/**
 * Confetti Overlay Component
 * Displays celebratory confetti animation when child answers correctly
 * Simple emoji-based confetti for MVP
 */

import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';
import { colors, fonts } from '../data/theme';

const { width, height } = Dimensions.get('window');

interface ConfettiOverlayProps {
  visible: boolean;
  message?: string;
  onAnimationEnd?: () => void;
}

// Confetti emojis for celebration
const confettiEmojis = ['🎉', '⭐', '🌟', '✨', '🎊', '💫', '🎈', '🏆'];

interface ConfettiPieceProps {
  emoji: string;
  delay: number;
  startX: number;
}

const ConfettiPiece: React.FC<ConfettiPieceProps> = ({ emoji, delay, startX }) => {
  const translateY = useRef(new Animated.Value(-50)).current;
  const translateX = useRef(new Animated.Value(0)).current;
  const rotate = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const randomEndX = (Math.random() - 0.5) * 100;
    
    Animated.sequence([
      Animated.delay(delay),
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: height + 50,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(translateX, {
          toValue: randomEndX,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(rotate, {
          toValue: 360,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, [delay, translateY, translateX, rotate, opacity]);

  const rotateInterpolate = rotate.interpolate({
    inputRange: [0, 360],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Animated.Text
      style={[
        styles.confettiPiece,
        {
          left: startX,
          transform: [
            { translateY },
            { translateX },
            { rotate: rotateInterpolate },
          ],
          opacity,
        },
      ]}
    >
      {emoji}
    </Animated.Text>
  );
};

const ConfettiOverlay: React.FC<ConfettiOverlayProps> = ({
  visible,
  message = 'Bravo! 🎉',
  onAnimationEnd,
}) => {
  const messageScale = useRef(new Animated.Value(0)).current;
  const messageOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      // Animate message
      Animated.sequence([
        Animated.parallel([
          Animated.spring(messageScale, {
            toValue: 1,
            friction: 4,
            useNativeDriver: true,
          }),
          Animated.timing(messageOpacity, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
        ]),
        Animated.delay(1500),
        Animated.parallel([
          Animated.timing(messageScale, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(messageOpacity, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
        ]),
      ]).start(() => {
        onAnimationEnd?.();
      });
    } else {
      messageScale.setValue(0);
      messageOpacity.setValue(0);
    }
  }, [visible, messageScale, messageOpacity, onAnimationEnd]);

  if (!visible) return null;

  // Generate confetti pieces
  const confettiPieces = Array.from({ length: 20 }, (_, index) => ({
    id: index,
    emoji: confettiEmojis[index % confettiEmojis.length],
    delay: Math.random() * 500,
    startX: Math.random() * width,
  }));

  return (
    <View style={styles.overlay} pointerEvents="none">
      {/* Confetti pieces */}
      {confettiPieces.map((piece) => (
        <ConfettiPiece
          key={piece.id}
          emoji={piece.emoji}
          delay={piece.delay}
          startX={piece.startX}
        />
      ))}

      {/* Success message */}
      <Animated.View
        style={[
          styles.messageContainer,
          {
            transform: [{ scale: messageScale }],
            opacity: messageOpacity,
          },
        ]}
      >
        <Text style={styles.message}>{message}</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1000,
    alignItems: 'center',
    justifyContent: 'center',
  },
  confettiPiece: {
    position: 'absolute',
    top: 0,
    fontSize: 30,
  },
  messageContainer: {
    backgroundColor: colors.success,
    paddingHorizontal: 40,
    paddingVertical: 20,
    borderRadius: 20,
  },
  message: {
    fontSize: fonts.sizes.xxxl,
    fontWeight: fonts.weights.bold,
    color: colors.textLight,
    textAlign: 'center',
  },
});

export default ConfettiOverlay;
