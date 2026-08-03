import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { ScreenWrapper } from '@/shared/components/ScreenWrapper';
import { FabButton } from '@/shared/components/FabButton';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/RootNavigator';

export const CalendarScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <ScreenWrapper style={styles.container}>
      <Text style={styles.title}>Calendário</Text>
      <FabButton onPress={() => navigation.navigate('NewRegister')} />
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333333',
  },
});
