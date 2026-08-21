import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MainTabNavigator } from './MainTabNavigator';
import { OnboardingNavigator } from '@/features/onboarding';
import { NewRegisterNavigator } from '@/features/newRegister';
import { SplashScreen } from '@/features/splash/screens/SplashScreen';

import { useSessionStore } from '@/shared/store/sessionStore';

export type RootStackParamList = {
  Main: undefined;
  Onboarding: undefined;
  NewRegister: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  const hasOnboarded = useSessionStore((state) => state.hasOnboarded);
  const [isSplashVisible, setIsSplashVisible] = useState(true);

  useEffect(() => {
    // Simula o tempo de carregamento da Splash Screen (ex: 2 segundos)
    const timer = setTimeout(() => {
      setIsSplashVisible(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  if (isSplashVisible) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={hasOnboarded ? 'Main' : 'Onboarding'}>
        <Stack.Screen name="Onboarding" component={OnboardingNavigator} />
        <Stack.Screen name="Main" component={MainTabNavigator} />
        {/* Modals acessíveis por toda a aplicação */}
        <Stack.Screen name="NewRegister" component={NewRegisterNavigator} options={{ presentation: 'modal' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
