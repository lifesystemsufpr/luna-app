import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { OnboardingScreen } from '../screens/OnboardingScreen';
import { RegistrationScreen } from '../screens/RegistrationScreen';

export type OnboardingStackParamList = {
  OnboardingHome: undefined;
  Registration: undefined;
};

const Stack = createNativeStackNavigator<OnboardingStackParamList>();

export const OnboardingNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="OnboardingHome">
      <Stack.Screen name="OnboardingHome" component={OnboardingScreen} />
      <Stack.Screen name="Registration" component={RegistrationScreen} />
    </Stack.Navigator>
  );
};
