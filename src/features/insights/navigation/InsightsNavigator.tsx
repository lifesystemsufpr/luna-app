import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { InsightsScreen } from '../screens/InsightsScreen';

export type InsightsStackParamList = {
  InsightsHome: undefined;
};

const Stack = createNativeStackNavigator<InsightsStackParamList>();

export const InsightsNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="InsightsHome" component={InsightsScreen} />
    </Stack.Navigator>
  );
};
