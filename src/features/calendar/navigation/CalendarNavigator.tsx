import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CalendarScreen } from '../screens/CalendarScreen';

export type CalendarStackParamList = {
  CalendarHome: undefined;
};

const Stack = createNativeStackNavigator<CalendarStackParamList>();

export const CalendarNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="CalendarHome" component={CalendarScreen} />
    </Stack.Navigator>
  );
};
