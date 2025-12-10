/**
 * Navigation Configuration
 * Sets up Stack Navigator (for screens) and Bottom Tab Navigator (for main sections)
 * Handles navigation between Onboarding, Home, Letters, Numbers, Games, and Profile
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { View, StyleSheet } from 'react-native';

import { colors, fonts, spacing } from '../data/theme';
import { ro } from '../i18n/ro';
import { RootStackParamList, BottomTabParamList } from '../types';

// Import screens
import OnboardingScreen from '../screens/OnboardingScreen';
import HomeScreen from '../screens/HomeScreen';
import LettersListScreen from '../screens/LettersListScreen';
import NumbersListScreen from '../screens/NumbersListScreen';
import VideoLessonScreen from '../screens/VideoLessonScreen';
import LetterGameScreen from '../screens/LetterGameScreen';
import NumberGameScreen from '../screens/NumberGameScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<BottomTabParamList>();

/**
 * Bottom Tab Navigator Component
 * Main navigation for Home, Letters, Numbers, and Profile tabs
 */
function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.background,
        },
        headerTitleStyle: {
          fontWeight: fonts.weights.bold,
          fontSize: fonts.sizes.xl,
          color: colors.textPrimary,
        },
        headerShadowVisible: false,
        tabBarStyle: {
          backgroundColor: colors.cardBackground,
          borderTopWidth: 0,
          height: 80,
          paddingBottom: spacing.md,
          paddingTop: spacing.sm,
          ...styles.tabBarShadow,
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarLabelStyle: {
          fontSize: fonts.sizes.xs,
          fontWeight: fonts.weights.semibold,
          marginTop: spacing.xs,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerTitle: ro.appName,
          tabBarLabel: ro.nav.home,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="LettersList"
        component={LettersListScreen}
        options={{
          headerTitle: ro.letters.title,
          tabBarLabel: ro.nav.letters,
          tabBarIcon: ({ color, size }) => (
            <View style={[styles.iconContainer, { backgroundColor: colors.lettersAccent + '30' }]}>
              <Ionicons name="text" size={size} color={color} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="NumbersList"
        component={NumbersListScreen}
        options={{
          headerTitle: ro.numbers.title,
          tabBarLabel: ro.nav.numbers,
          tabBarIcon: ({ color, size }) => (
            <View style={[styles.iconContainer, { backgroundColor: colors.numbersAccent + '30' }]}>
              <Ionicons name="calculator" size={size} color={color} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerTitle: ro.profile.title,
          tabBarLabel: ro.nav.profile,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-circle" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

/**
 * Root Stack Navigator
 * Contains Onboarding and Main Tab Navigator
 * Also includes modal screens for Video Lessons and Games
 */
export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Onboarding"
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.background },
        }}
      >
        {/* Onboarding - shown first */}
        <Stack.Screen 
          name="Onboarding" 
          component={OnboardingScreen}
          options={{ animation: 'fade' }}
        />
        
        {/* Main Tab Navigator */}
        <Stack.Screen 
          name="MainTabs" 
          component={MainTabNavigator}
          options={{ animation: 'slide_from_right' }}
        />
        
        {/* Video Lesson Screen - modal presentation */}
        <Stack.Screen
          name="VideoLesson"
          component={VideoLessonScreen}
          options={{
            headerShown: true,
            headerTitle: '',
            headerStyle: { backgroundColor: colors.backgroundDark },
            headerTintColor: colors.textLight,
            presentation: 'modal',
          }}
        />
        
        {/* Letter Game Screen */}
        <Stack.Screen
          name="LetterGame"
          component={LetterGameScreen}
          options={{
            headerShown: true,
            headerTitle: ro.letterGame.title,
            headerStyle: { backgroundColor: colors.background },
            headerTintColor: colors.textPrimary,
            animation: 'slide_from_bottom',
          }}
        />
        
        {/* Number Game Screen */}
        <Stack.Screen
          name="NumberGame"
          component={NumberGameScreen}
          options={{
            headerShown: true,
            headerTitle: ro.numberGame.title,
            headerStyle: { backgroundColor: colors.background },
            headerTintColor: colors.textPrimary,
            animation: 'slide_from_bottom',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabBarShadow: {
    shadowColor: colors.textPrimary,
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
