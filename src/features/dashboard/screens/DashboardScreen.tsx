import React from 'react';
import { Text, StyleSheet, Button } from 'react-native';
import { ScreenWrapper } from '@/shared/components/ScreenWrapper';
import { FabButton } from '@/shared/components/FabButton';
import { useDashboardStore } from '../store/dashboardStore';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/RootNavigator';

export const DashboardScreen = () => {
  const { hasSeenWelcome, setHasSeenWelcome } = useDashboardStore();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <ScreenWrapper style={styles.container}>
      <Text style={styles.title}>Painel de Controle</Text>
      <Text style={styles.subtitle}>
        Bem-vindo! {hasSeenWelcome ? '(Você já viu as boas-vindas)' : '(Primeiro acesso)'}
      </Text>
      
      {!hasSeenWelcome && (
        <Button 
          title="Marcar boas-vindas como vistas" 
          onPress={() => setHasSeenWelcome(true)} 
        />
      )}
      
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
    marginBottom: 16,
    color: '#333333',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 24,
    color: '#666666',
  }
});
