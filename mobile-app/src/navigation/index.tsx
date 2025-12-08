import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text, View, StyleSheet } from 'react-native';

import HomeScreen from '../screens/HomeScreen';
import CollectionScreen from '../screens/CollectionScreen';
import BooksScreen from '../screens/BooksScreen';
import NewsScreen from '../screens/NewsScreen';
import ContactScreen from '../screens/ContactScreen';
import { colors, fonts } from '../theme/colors';
import { RootTabParamList, RootStackParamList } from '../types';

const Tab = createBottomTabNavigator<RootTabParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

// Tab bar icon component
interface TabIconProps {
  focused: boolean;
  label: string;
  icon: string;
}

const TabIcon: React.FC<TabIconProps> = ({ focused, label, icon }) => (
  <View style={styles.tabIconContainer}>
    <Text style={[styles.tabIcon, focused && styles.tabIconFocused]}>{icon}</Text>
    <Text style={[styles.tabLabel, focused && styles.tabLabelFocused]}>{label}</Text>
  </View>
);

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.backgroundDark,
        },
        headerTintColor: colors.white,
        headerTitleStyle: {
          fontWeight: fonts.weights.bold,
          fontSize: fonts.sizes.lg,
        },
        tabBarStyle: {
          backgroundColor: colors.backgroundDark,
          borderTopColor: colors.gray,
          paddingTop: 8,
          height: 70,
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerTitle: 'Biblioteca',
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} label="Home" icon="🏠" />
          ),
        }}
      />
      <Tab.Screen
        name="Collection"
        component={CollectionScreen}
        options={{
          headerTitle: 'Colecție',
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} label="Colecție" icon="📚" />
          ),
        }}
      />
      <Tab.Screen
        name="Books"
        component={BooksScreen}
        options={{
          headerTitle: 'Cărți',
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} label="Cărți" icon="📖" />
          ),
        }}
      />
      <Tab.Screen
        name="News"
        component={NewsScreen}
        options={{
          headerTitle: 'Noutăți',
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} label="Noutăți" icon="📰" />
          ),
        }}
      />
      <Tab.Screen
        name="Contact"
        component={ContactScreen}
        options={{
          headerTitle: 'Contact',
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} label="Contact" icon="✉️" />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main" component={TabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabIcon: {
    fontSize: 22,
    marginBottom: 4,
  },
  tabIconFocused: {
    transform: [{ scale: 1.1 }],
  },
  tabLabel: {
    fontSize: fonts.sizes.xs,
    color: colors.textMuted,
  },
  tabLabelFocused: {
    color: colors.primary,
    fontWeight: fonts.weights.semibold,
  },
});
