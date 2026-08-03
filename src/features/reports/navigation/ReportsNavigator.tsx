import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ReportsScreen } from '../screens/ReportsScreen';

export type ReportsStackParamList = {
  ReportsHome: undefined;
};

const Stack = createNativeStackNavigator<ReportsStackParamList>();

export const ReportsNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ReportsHome" component={ReportsScreen} />
    </Stack.Navigator>
  );
};
