import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MainTabNavigator } from './MainTabNavigator';
import { OnboardingNavigator } from '@/features/onboarding';
import { NewRegisterNavigator } from '@/features/newRegister';

import { useSessionStore } from '@/shared/store/sessionStore';

export type RootStackParamList = {
  Main: undefined;
  Onboarding: undefined;
  NewRegister: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  const hasOnboarded = useSessionStore((state) => state.hasOnboarded);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!hasOnboarded ? (
          <Stack.Screen name="Onboarding" component={OnboardingNavigator} />
        ) : (
          <Stack.Screen name="Main" component={MainTabNavigator} />
        )}
        {/* Modals acessíveis por toda a aplicação */}
        <Stack.Screen name="NewRegister" component={NewRegisterNavigator} options={{ presentation: 'modal' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
