import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { ScreenWrapper } from '../../../shared/components/ScreenWrapper';

export const NewRegisterScreen = () => {
  return (
    <ScreenWrapper style={styles.container}>
      <Text style={styles.title}>Novo Registro</Text>
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
