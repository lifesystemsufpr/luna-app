import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MedicinesScreen } from '../screens/MedicinesScreen';
import { NewMedicationScreen } from '../screens/NewMedicationScreen';

export type MedicinesStackParamList = {
  MedicinesHome: undefined;
  NewMedication: undefined;
};

const Stack = createNativeStackNavigator<MedicinesStackParamList>();

export const MedicinesNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MedicinesHome" component={MedicinesScreen} />
      <Stack.Screen name="NewMedication" component={NewMedicationScreen} options={{ presentation: 'modal' }} />
    </Stack.Navigator>
  );
};
