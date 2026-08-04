import { CalendarNavigator } from '@/features/calendar';
import { DashboardNavigator } from '@/features/dashboard';
import { InsightsNavigator } from '@/features/insights';
import { MedicinesNavigator } from '@/features/medicines';
import { ProfileNavigator } from '@/features/profile';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Platform, StyleSheet, View } from 'react-native';

export type MainTabParamList = {
  DashboardStack: undefined;
  CalendarStack: undefined;
  MedicinesStack: undefined;
  InsightsStack: undefined;
  ProfileStack: undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();

export const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
        tabBarIcon: ({ focused }) => {
          let iconName = 'home-outline';
          if (route.name === 'DashboardStack') {
            iconName = 'home-outline';
          } else if (route.name === 'CalendarStack') {
            iconName = 'calendar-blank-outline';
          } else if (route.name === 'MedicinesStack') {
            iconName = 'pill';
          } else if (route.name === 'InsightsStack') {
            iconName = 'chart-box-outline';
          } else if (route.name === 'ProfileStack') {
            iconName = 'account-outline';
          }

          const color = focused ? '#8E4A59' : '#5D4037'; // Tom escuro/marrom da imagem
          const bgColor = focused ? '#FFD8E4' : 'transparent'; // Rosa claro no ativo

          return (
            <View style={[styles.tabItem, { backgroundColor: bgColor }]}>
              <MaterialCommunityIcons name={iconName as any} size={28} color={color} />
            </View>
          );
        },
      })}
    >
      <Tab.Screen name="DashboardStack" component={DashboardNavigator} />
      <Tab.Screen name="CalendarStack" component={CalendarNavigator} />
      <Tab.Screen name="MedicinesStack" component={MedicinesNavigator} />
      <Tab.Screen name="InsightsStack" component={InsightsNavigator} />
      <Tab.Screen name="ProfileStack" component={ProfileNavigator} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#F3EDF7',
    borderTopWidth: 0,
    elevation: 0,
    height: Platform.OS === 'ios' ? 90 : 80,
    paddingHorizontal: 8,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 64,
    height: 40,
    borderRadius: 20,
    marginTop: 12,
  },
});
