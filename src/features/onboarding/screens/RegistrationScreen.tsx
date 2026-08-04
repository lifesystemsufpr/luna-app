import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { RootStackParamList } from '../../../navigation/RootNavigator';
import { ScreenWrapper } from '../../../shared/components/ScreenWrapper';
import { useSessionStore } from '../../../shared/store/sessionStore';
import { LunaTheme } from '../../dashboard/styles/theme';

export const RegistrationScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const setHasOnboarded = useSessionStore((state) => state.setHasOnboarded);
  const [currentStep, setCurrentStep] = useState(1);

  // Form State
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [lastPeriod, setLastPeriod] = useState('');

  const handleNext = () => {
    if (currentStep < 2) {
      setCurrentStep(currentStep + 1);
    } else {
      // Finalizar cadastro
      setHasOnboarded(true);
      navigation.reset({
        index: 0,
        routes: [{ name: 'Main' }],
      });
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      navigation.goBack();
    }
  };

  const renderProgressBar = () => {
    return (
      <View style={styles.progressContainer}>
        <View style={[styles.progressSegment, currentStep >= 1 && styles.progressSegmentActive]} />
        <View style={[styles.progressSegment, currentStep >= 2 && styles.progressSegmentActive]} />
      </View>
    );
  };

  return (
    <ScreenWrapper style={styles.container}>

      <View style={styles.header}>
        <Pressable onPress={handleBack} style={styles.backButton}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#333" />
        </Pressable>
        <Text style={styles.logoText}>Luna</Text>
        <View style={{ width: 24 }} />
      </View>

      {renderProgressBar()}

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

          {currentStep === 1 && (
            <View style={styles.stepContainer}>
              <Text style={styles.titlePink}>Sobre você</Text>
              <Text style={styles.subtitle}>Conta pra gente um pouco mais sobre você.</Text>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Como podemos te chamar?</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Seu nome ou apelido"
                  placeholderTextColor="#9E9E9E"
                  value={name}
                  onChangeText={setName}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Qual sua data de nascimento?</Text>
                <View style={styles.inputWithIcon}>
                  <TextInput
                    style={styles.inputFlex}
                    placeholder="dd/mm/aaaa"
                    placeholderTextColor="#9E9E9E"
                    value={birthDate}
                    onChangeText={setBirthDate}
                    keyboardType="numeric"
                  />
                  <MaterialCommunityIcons name="calendar-month-outline" size={20} color="#333" />
                </View>
              </View>
            </View>
          )}

          {currentStep === 2 && (
            <View style={styles.stepContainer}>
              <Text style={styles.titlePink}>Seu Ciclo</Text>
              <Text style={styles.subtitle}>
                Isso nos ajuda a calcular seu período fértil e próxima menstruação com precisão.
              </Text>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Quando foi o primeiro dia da sua última menstruação?</Text>
                <View style={styles.inputWithIconPink}>
                  <TextInput
                    style={styles.inputFlex}
                    placeholder="dd/mm/aaaa"
                    placeholderTextColor="#9E9E9E"
                    value={lastPeriod}
                    onChangeText={setLastPeriod}
                    keyboardType="numeric"
                  />
                  <MaterialCommunityIcons name="calendar-month-outline" size={20} color={LunaTheme.colors.primary} />
                </View>
              </View>

              <View style={styles.infoBox}>
                <MaterialCommunityIcons name="information-outline" size={16} color="#757575" style={styles.infoIcon} />
                <Text style={styles.infoText}>
                  Se não tiver certeza, pode estimar uma data aproximada.
                </Text>
              </View>
            </View>
          )}

        </ScrollView>
      </KeyboardAvoidingView>

      <View style={styles.footer}>
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
    backgroundColor: '#FFFBFD',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: LunaTheme.spacing.m,
  },
  backButton: {
    padding: LunaTheme.spacing.xs,
  },
  logoText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: LunaTheme.colors.primary,
  },
  progressContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: LunaTheme.spacing.xl,
  },
  progressSegment: {
    flex: 1,
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
  },
  progressSegmentActive: {
    backgroundColor: LunaTheme.colors.primary,
  },
  scrollContent: {
    flexGrow: 1,
  },
  stepContainer: {
    flex: 1,
  },
  stepLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: LunaTheme.colors.primary,
    letterSpacing: 1,
    textAlign: 'center',
    marginBottom: 4,
  },
  titlePink: {
    fontSize: 28,
    fontWeight: 'bold',
    color: LunaTheme.colors.primary,
    textAlign: 'center',
    marginBottom: 8,
  },
  titleBlack: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1C1B1F',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#49454F',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 20,
  },
  inputGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#3E2723',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: LunaTheme.radii.medium,
    padding: LunaTheme.spacing.m,
    fontSize: 16,
    color: LunaTheme.colors.textPrimary,
    backgroundColor: '#FFF',
  },
  inputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: LunaTheme.radii.medium,
    paddingHorizontal: LunaTheme.spacing.m,
    backgroundColor: '#FFF',
  },
  inputWithIconPink: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F8BBD0', // Borda rosa claro da imagem 2
    borderRadius: LunaTheme.radii.medium,
    paddingHorizontal: LunaTheme.spacing.m,
    backgroundColor: '#FFF',
  },
  inputFlex: {
    flex: 1,
    paddingVertical: LunaTheme.spacing.m,
    fontSize: 16,
    color: LunaTheme.colors.textPrimary,
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: -8, // Aproximar do input
  },
  infoIcon: {
    marginTop: 2,
    marginRight: 6,
  },
  infoText: {
    flex: 1,
    fontSize: 12,
    color: '#757575',
    lineHeight: 18,
  },
  footer: {
    paddingBottom: LunaTheme.spacing.l,
    paddingTop: LunaTheme.spacing.m,
  },
  button: {
    backgroundColor: LunaTheme.colors.primary,
    width: '100%',
    paddingVertical: 16,
    borderRadius: 30,
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
