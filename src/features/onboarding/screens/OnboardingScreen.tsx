import { ScreenWrapper } from '@/shared/components/ScreenWrapper';
import { useSessionStore } from '@/shared/store/sessionStore';
import { Button, StyleSheet, Text } from 'react-native';

export const OnboardingScreen = () => {
  const setHasOnboarded = useSessionStore((state) => state.setHasOnboarded);

  return (
    <ScreenWrapper style={styles.container}>
      <Text style={styles.title}>Boas-vindas ao Luna!</Text>
      <Text style={styles.subtitle}>Siga o tutorial para configurar sua conta.</Text>
      <Button
        title="Começar a usar o aplicativo"
        onPress={() => setHasOnboarded(true)}
      />
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
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 24,
    color: '#666666',
    textAlign: 'center',
  }
});
