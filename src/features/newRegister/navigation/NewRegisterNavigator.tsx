import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NewRegisterScreen } from '../screens/NewRegisterScreen';

export type NewRegisterStackParamList = {
  NewRegisterHome: undefined;
};

const Stack = createNativeStackNavigator<NewRegisterStackParamList>();

export const NewRegisterNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="NewRegisterHome" component={NewRegisterScreen} />
    </Stack.Navigator>
  );
};
