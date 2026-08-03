import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DashboardNavigator } from '@/features/dashboard';
import { CalendarNavigator } from '@/features/calendar';
import { ReportsNavigator } from '@/features/reports';
import { InsightsNavigator } from '@/features/insights';
import { ProfileNavigator } from '@/features/profile';

export type MainTabParamList = {
  DashboardStack: undefined;
  CalendarStack: undefined;
  ReportsStack: undefined;
  InsightsStack: undefined;
  ProfileStack: undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();

export const MainTabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen 
        name="DashboardStack" 
        component={DashboardNavigator} 
        options={{ title: 'Início' }}
      />
      <Tab.Screen 
        name="CalendarStack" 
        component={CalendarNavigator} 
        options={{ title: 'Calendário' }}
      />
      <Tab.Screen 
        name="ReportsStack" 
        component={ReportsNavigator} 
        options={{ title: 'Relatórios' }}
      />
      <Tab.Screen 
        name="InsightsStack" 
        component={InsightsNavigator} 
        options={{ title: 'Insights' }}
      />
      <Tab.Screen 
        name="ProfileStack" 
        component={ProfileNavigator} 
        options={{ title: 'Perfil' }}
      />
    </Tab.Navigator>
  );
};
