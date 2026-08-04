import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { OnboardingStackParamList } from '../navigation/OnboardingNavigator';
import { ScreenWrapper } from '../../../shared/components/ScreenWrapper';
import { LunaTheme } from '../../dashboard/styles/theme';

export const OnboardingScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<OnboardingStackParamList>>();

  const handleNext = () => {
    navigation.navigate('Registration');
  };

  return (
    <ScreenWrapper style={styles.container}>
      
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.logoText}>Luna</Text>
      </View>

      {/* CONTENT */}
      <View style={styles.content}>
        
        {/* IMAGE PLACEHOLDER */}
        <View style={styles.imagePlaceholder}>
          <MaterialCommunityIcons name="calendar-heart" size={64} color="#FFF" />
        </View>

        {/* TEXTS */}
        <Text style={styles.title}>Acompanhe seu ciclo menstrual.</Text>
        <Text style={styles.subtitle}>
          Entenda cada fase do seu corpo com previsões precisas e personalizadas para sua rotina.
        </Text>

      </View>

      {/* FOOTER */}
      <View style={styles.footer}>

        {/* BUTTON */}
        <Pressable style={styles.button} onPress={handleNext}>
          <Text style={styles.buttonText}>Continuar</Text>
          <MaterialCommunityIcons name="arrow-right" size={20} color="#FFF" style={styles.buttonIcon} />
        </Pressable>
        
      </View>

    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: LunaTheme.spacing.m,
    backgroundColor: '#FFFBFD', // Fundo bem claro
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: LunaTheme.spacing.m,
    marginBottom: LunaTheme.spacing.xl,
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: LunaTheme.colors.primary,
  },
  skipText: {
    fontSize: 14,
    color: LunaTheme.colors.textSecondary,
    fontWeight: '500',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagePlaceholder: {
    width: '100%',
    height: 220,
    backgroundColor: '#E1BEE7', // Placeholder roxo/rosado para simular a imagem
    borderRadius: LunaTheme.radii.large,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 5,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1C1B1F', // Preto bem escuro
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 32,
    paddingHorizontal: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#49454F', // Cinza escuro
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 16,
  },
  footer: {
    paddingBottom: LunaTheme.spacing.l,
    alignItems: 'center',
  },
  paginationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E0E0E0',
  },
  dotActive: {
    width: 24,
    backgroundColor: '#D0D0D0', // Cinza um pouco mais escuro
  },
  button: {
    backgroundColor: LunaTheme.colors.primary,
    width: '100%',
    paddingVertical: 16,
    borderRadius: 30, // Bordas bem arredondadas
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonIcon: {
    marginLeft: 8,
  }
});
