import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Pressable, 
  TextInput,
  KeyboardAvoidingView,
  Platform,
  PanResponder
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { ScreenWrapper } from '../../../shared/components/ScreenWrapper';
import { LunaTheme } from '../../dashboard/styles/theme';

export const NewRegisterScreen = () => {
  const navigation = useNavigation();

  const [flow, setFlow] = useState<string | null>(null);
  const [mood, setMood] = useState<number | null>(null);
  const [energy, setEnergy] = useState<string | null>(null);
  const [pain, setPain] = useState<number>(5);
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [observations, setObservations] = useState('');

  const flowOptions = ['Leve', 'Moderado', 'Intenso'];
  const moodIcons = [
    'emoticon-happy-outline',
    'emoticon-outline',
    'emoticon-neutral-outline',
    'emoticon-sad-outline',
    'emoticon-dead-outline',
  ];
  const energyOptions = ['Baixa', 'Média', 'Alta'];
  const symptomOptions = ['Cólica', 'Dor de cabeça', 'Acne', 'Sensibilidade', 'Inchaço'];

  const toggleSymptom = (sym: string) => {
    if (symptoms.includes(sym)) {
      setSymptoms(symptoms.filter(s => s !== sym));
    } else {
      setSymptoms([...symptoms, sym]);
    }
  };

  return (
    <ScreenWrapper style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.closeButton}>
          <MaterialCommunityIcons name="close" size={24} color={LunaTheme.colors.textPrimary} />
        </Pressable>
        <Text style={styles.headerTitle}>Novo Registro</Text>
        <View style={{ width: 24 }} />
      </View>

      <KeyboardAvoidingView 
        style={{ flex: 1 }} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          
          <Text style={styles.dateSubtitle}>HOJE, 24 DE OUTUBRO</Text>
          <Text style={styles.mainTitle}>Como você está se sentindo?</Text>

          {/* FLUXO */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <MaterialCommunityIcons name="water-outline" size={20} color={LunaTheme.colors.primary} />
              <Text style={styles.sectionTitle}>Fluxo</Text>
            </View>
            <View style={styles.row}>
              {flowOptions.map(opt => (
                <Pressable 
                  key={opt}
                  style={[styles.pill, flow === opt && styles.pillSelected]}
                  onPress={() => setFlow(opt)}
                >
                  <Text style={[styles.pillText, flow === opt && styles.pillTextSelected]}>{opt}</Text>
                </Pressable>
              ))}
            </View>
          </View>

          {/* HUMOR */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <MaterialCommunityIcons name="emoticon-happy-outline" size={20} color={LunaTheme.colors.primary} />
              <Text style={styles.sectionTitle}>Humor</Text>
            </View>
            <View style={styles.moodBox}>
              {moodIcons.map((icon, idx) => (
                <Pressable key={idx} onPress={() => setMood(idx)}>
                  <MaterialCommunityIcons 
                    name={icon as any} 
                    size={36} 
                    color={mood === idx ? LunaTheme.colors.primary : '#9E9E9E'} 
                  />
                </Pressable>
              ))}
            </View>
          </View>

          {/* ENERGIA */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <MaterialCommunityIcons name="lightning-bolt-outline" size={20} color={LunaTheme.colors.primary} />
              <Text style={styles.sectionTitle}>Energia</Text>
            </View>
            <View style={styles.row}>
              {energyOptions.map(opt => {
                const isSelected = energy === opt;
                let batteryIcon = 'battery-outline';
                if (opt === 'Média') batteryIcon = 'battery-50';
                if (opt === 'Alta') batteryIcon = 'battery';
                if (opt === 'Baixa') batteryIcon = 'battery-10';

                return (
                  <Pressable 
                    key={opt}
                    style={[styles.cardSquare, isSelected && styles.cardSquareSelected]}
                    onPress={() => setEnergy(opt)}
                  >
                    <MaterialCommunityIcons 
                      name={batteryIcon as any} 
                      size={24} 
                      color={isSelected ? LunaTheme.colors.primary : LunaTheme.colors.textSecondary} 
                      style={{ marginBottom: 8 }}
                    />
                    <Text style={[styles.cardSquareText, isSelected && styles.cardSquareTextSelected]}>{opt}</Text>
                  </Pressable>
                );
              })}
            </View>
          </View>

          {/* INTENSIDADE DA DOR */}
          <View style={styles.section}>
            <View style={styles.painHeaderBox}>
              <View style={styles.sectionHeader}>
                <MaterialCommunityIcons name="human-wheelchair" size={20} color={LunaTheme.colors.primary} />
                <Text style={styles.sectionTitle}>Intensidade da Dor</Text>
              </View>
              <Text style={styles.painValue}>{pain}</Text>
            </View>
            
            <View style={styles.sliderContainer}>
              <View style={styles.sliderTrack} />
              {/* Pontos clicáveis para simular slider */}
              <View style={styles.sliderTouchAreas}>
                {[0, 1, 2, 3, 4, 5].map(val => (
                  <Pressable 
                    key={val} 
                    style={styles.sliderTouchZone} 
                    onPress={() => setPain(val)}
                  />
                ))}
              </View>
              {/* Indicador Thumb */}
              <View style={[styles.sliderThumb, { left: `${(pain / 5) * 100}%`, transform: [{ translateX: -10 }] }]} />
            </View>

            <View style={styles.sliderLabels}>
              <Text style={styles.sliderLabelText}>Nenhuma</Text>
              <Text style={styles.sliderLabelText}>Insuportável</Text>
            </View>
          </View>

          {/* SINTOMAS */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <MaterialCommunityIcons name="medical-bag" size={20} color={LunaTheme.colors.primary} />
              <Text style={styles.sectionTitle}>Sintomas</Text>
            </View>
            <View style={styles.chipsContainer}>
              {symptomOptions.map(sym => {
                const isSelected = symptoms.includes(sym);
                return (
                  <Pressable 
                    key={sym} 
                    style={[styles.chip, isSelected && styles.chipSelected]}
                    onPress={() => toggleSymptom(sym)}
                  >
                    {isSelected && <MaterialCommunityIcons name="check" size={14} color={LunaTheme.colors.primary} style={{ marginRight: 4 }} />}
                    <Text style={[styles.chipText, isSelected && styles.chipTextSelected]}>{sym}</Text>
                  </Pressable>
                );
              })}
            </View>
          </View>

          {/* OBSERVAÇÕES */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <MaterialCommunityIcons name="format-align-left" size={20} color={LunaTheme.colors.primary} />
              <Text style={styles.sectionTitle}>Observações</Text>
            </View>
            <TextInput 
              style={styles.textArea}
              placeholder="Como foi seu dia hoje?"
              placeholderTextColor="#9E9E9E"
              multiline
              numberOfLines={4}
              value={observations}
              onChangeText={setObservations}
              textAlignVertical="top"
            />
          </View>

          <Pressable style={styles.saveButton} onPress={() => navigation.goBack()}>
            <Text style={styles.saveButtonText}>Salvar Registro</Text>
          </Pressable>

        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 0,
    backgroundColor: '#FFFBFD',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: LunaTheme.spacing.m,
    paddingTop: LunaTheme.spacing.m,
    paddingBottom: LunaTheme.spacing.s,
  },
  closeButton: {
    padding: LunaTheme.spacing.xs,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: LunaTheme.colors.primary,
  },
  scrollContent: {
    paddingHorizontal: LunaTheme.spacing.m,
    paddingBottom: 40,
  },
  dateSubtitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: LunaTheme.colors.primary,
    letterSpacing: 1,
    marginTop: LunaTheme.spacing.m,
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: LunaTheme.colors.textPrimary,
    marginBottom: LunaTheme.spacing.l,
    marginTop: 4,
  },
  section: {
    marginBottom: LunaTheme.spacing.l,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: LunaTheme.spacing.m,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: LunaTheme.colors.textPrimary,
    marginLeft: 8,
  },
  row: {
    flexDirection: 'row',
    gap: 8,
  },
  pill: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 24,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: LunaTheme.colors.surface,
  },
  pillSelected: {
    borderColor: LunaTheme.colors.primary,
    backgroundColor: '#FFF0F5',
  },
  pillText: {
    fontSize: 14,
    color: LunaTheme.colors.textSecondary,
    fontWeight: '500',
  },
  pillTextSelected: {
    color: LunaTheme.colors.primary,
    fontWeight: 'bold',
  },
  moodBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#F5F5F5',
    borderRadius: LunaTheme.radii.medium,
    padding: LunaTheme.spacing.m,
  },
  cardSquare: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: LunaTheme.radii.medium,
    paddingVertical: LunaTheme.spacing.m,
    alignItems: 'center',
    backgroundColor: LunaTheme.colors.surface,
  },
  cardSquareSelected: {
    borderColor: LunaTheme.colors.secondary,
    backgroundColor: LunaTheme.colors.secondary,
  },
  cardSquareText: {
    fontSize: 12,
    color: LunaTheme.colors.textSecondary,
    fontWeight: '500',
  },
  cardSquareTextSelected: {
    color: LunaTheme.colors.textPrimary,
    fontWeight: 'bold',
  },
  painHeaderBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    paddingHorizontal: LunaTheme.spacing.m,
    paddingTop: LunaTheme.spacing.m,
    borderTopLeftRadius: LunaTheme.radii.medium,
    borderTopRightRadius: LunaTheme.radii.medium,
  },
  painValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: LunaTheme.colors.primary,
    marginBottom: LunaTheme.spacing.m,
  },
  sliderContainer: {
    height: 40,
    justifyContent: 'center',
    backgroundColor: '#F5F5F5',
    paddingHorizontal: LunaTheme.spacing.m,
  },
  sliderTrack: {
    height: 6,
    backgroundColor: '#E0E0E0',
    borderRadius: 3,
    width: '100%',
  },
  sliderTouchAreas: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    paddingHorizontal: LunaTheme.spacing.m,
  },
  sliderTouchZone: {
    flex: 1,
    height: '100%',
  },
  sliderThumb: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: LunaTheme.colors.primary,
    top: 10, // centralizar no track de 40 de altura (10 + 20 + 10)
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#F5F5F5',
    paddingHorizontal: LunaTheme.spacing.m,
    paddingBottom: LunaTheme.spacing.m,
    borderBottomLeftRadius: LunaTheme.radii.medium,
    borderBottomRightRadius: LunaTheme.radii.medium,
  },
  sliderLabelText: {
    fontSize: 12,
    color: LunaTheme.colors.textSecondary,
  },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 24,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: LunaTheme.colors.surface,
  },
  chipSelected: {
    borderColor: LunaTheme.colors.primary,
    backgroundColor: '#FFF0F5',
  },
  chipText: {
    fontSize: 12,
    color: LunaTheme.colors.textSecondary,
    fontWeight: '500',
  },
  chipTextSelected: {
    color: LunaTheme.colors.primary,
    fontWeight: 'bold',
  },
  textArea: {
    backgroundColor: LunaTheme.colors.surface,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: LunaTheme.radii.medium,
    padding: LunaTheme.spacing.m,
    fontSize: 14,
    color: LunaTheme.colors.textPrimary,
    minHeight: 100,
  },
  saveButton: {
    backgroundColor: LunaTheme.colors.primary,
    padding: 16,
    borderRadius: 24,
    alignItems: 'center',
    marginTop: LunaTheme.spacing.m,
  },
  saveButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  }
});
