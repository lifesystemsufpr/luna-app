import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { RootStackParamList } from '../../../navigation/RootNavigator';
import { ScreenWrapper } from '../../../shared/components/ScreenWrapper';
import { useSessionStore } from '../../../shared/store/sessionStore';
import { useCycleStore } from '../../cycle/store/cycleStore';
import { LunaTheme } from '../../dashboard/styles/theme';
import { generateId } from '../../../shared/utils/dateUtils';

// Validação com Zod
const registrationSchema = z.object({
  name: z.string().min(2, 'O nome deve ter pelo menos 2 caracteres.'),
  birthDate: z.string().regex(/^\d{2}\/\d{2}\/\d{4}$/, 'Data inválida (Use: dd/mm/aaaa)'),
  lastPeriod: z.string().regex(/^\d{2}\/\d{2}\/\d{4}$/, 'Data inválida (Use: dd/mm/aaaa)'),
});

type RegistrationFormData = z.infer<typeof registrationSchema>;

const applyDateMask = (value: string) => {
  let v = value.replace(/\D/g, '');
  if (v.length > 2) v = v.replace(/^(\d{2})(\d)/, '$1/$2');
  if (v.length > 5) v = v.replace(/^(\d{2})\/(\d{2})(\d)/, '$1/$2/$3');
  return v.slice(0, 10);
};

export const RegistrationScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { setHasOnboarded, setUserData } = useSessionStore();
  const addPeriod = useCycleStore(state => state.addPeriod);
  
  const [currentStep, setCurrentStep] = useState(1);

  const { control, trigger, getValues, formState: { errors } } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: { name: '', birthDate: '', lastPeriod: '' },
    mode: 'onChange'
  });

  const handleNext = async () => {
    if (currentStep === 1) {
      const isValid = await trigger(['name', 'birthDate']);
      if (isValid) {
        setCurrentStep(2);
      }
    } else {
      const isValid = await trigger(['lastPeriod']);
      if (isValid) {
        const { name, birthDate, lastPeriod } = getValues();
        
        // Salvar nome e data de nascimento na sessão
        setUserData(name, birthDate);
        
        // Cadastrar a menstruação relatada
        const [day, month, year] = lastPeriod.split('/');
        const startDate = `${year}-${month}-${day}`; // ISO format (YYYY-MM-DD)
        
        // Vamos estimar o fim como 5 dias depois
        const start = new Date(Number(year), Number(month) - 1, Number(day));
        start.setDate(start.getDate() + 5);
        const endDate = start.toISOString().split('T')[0];

        addPeriod({
          id: generateId(),
          startDate,
          endDate,
          flow: 'medium',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        });

        // Finalizar cadastro
        setHasOnboarded(true);
        navigation.reset({
          index: 0,
          routes: [{ name: 'Main' }],
        });
      }
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
                <Controller
                  control={control}
                  name="name"
                  render={({ field: { onChange, value } }) => (
                    <TextInput
                      style={[styles.input, errors.name && styles.inputError]}
                      placeholder="Seu nome ou apelido"
                      placeholderTextColor="#9E9E9E"
                      value={value}
                      onChangeText={onChange}
                    />
                  )}
                />
                {errors.name && <Text style={styles.errorText}>{errors.name.message}</Text>}
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Qual sua data de nascimento?</Text>
                <Controller
                  control={control}
                  name="birthDate"
                  render={({ field: { onChange, value } }) => (
                    <View style={[styles.inputWithIcon, errors.birthDate && styles.inputError]}>
                      <TextInput
                        style={styles.inputFlex}
                        placeholder="dd/mm/aaaa"
                        placeholderTextColor="#9E9E9E"
                        value={value}
                        onChangeText={(text) => onChange(applyDateMask(text))}
                        keyboardType="numeric"
                      />
                      <MaterialCommunityIcons name="calendar-month-outline" size={20} color="#333" />
                    </View>
                  )}
                />
                {errors.birthDate && <Text style={styles.errorText}>{errors.birthDate.message}</Text>}
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
                <Controller
                  control={control}
                  name="lastPeriod"
                  render={({ field: { onChange, value } }) => (
                    <View style={[styles.inputWithIconPink, errors.lastPeriod && styles.inputError]}>
                      <TextInput
                        style={styles.inputFlex}
                        placeholder="dd/mm/aaaa"
                        placeholderTextColor="#9E9E9E"
                        value={value}
                        onChangeText={(text) => onChange(applyDateMask(text))}
                        keyboardType="numeric"
                      />
                      <MaterialCommunityIcons name="calendar-month-outline" size={20} color={LunaTheme.colors.primary} />
                    </View>
                  )}
                />
                {errors.lastPeriod && <Text style={styles.errorText}>{errors.lastPeriod.message}</Text>}
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
  },
  inputError: {
    borderColor: '#D32F2F',
  },
  errorText: {
    color: '#D32F2F',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  }
});
