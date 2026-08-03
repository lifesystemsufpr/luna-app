import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { ScreenWrapper } from '../../../shared/components/ScreenWrapper';

export const ReportsScreen = () => {
  return (
    <ScreenWrapper style={styles.container}>
      <Text style={styles.title}>Relatórios</Text>
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
