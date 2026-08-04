import React from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, ScrollView, Switch } from 'react-native';
import { ScreenWrapper } from '../../../shared/components/ScreenWrapper';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LunaTheme } from '../../dashboard/styles/theme';
import { useMedications } from '../hooks/useMedications';

export const NewMedicationScreen = () => {
  const navigation = useNavigation();
  const { addMedication } = useMedications();
  
  const [name, setName] = React.useState('');
  const [remindersEnabled, setRemindersEnabled] = React.useState(true);

  const handleSave = () => {
    // Validação básica
    if (name.trim()) {
      addMedication({
        id: Date.now().toString(),
        name,
        category: 'Medicamento',
        dosage: '1 comprimido',
        frequency: 'Diário',
        time: '08:00',
        isActive: remindersEnabled,
        startDate: new Date().toISOString()
      });
      navigation.goBack();
    }
  };

  return (
    <ScreenWrapper>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
          <MaterialCommunityIcons name="arrow-left" size={24} color={LunaTheme.colors.textPrimary} />
        </Pressable>
        <Text style={styles.headerTitle}>Novo Medicamento</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Nome do medicamento</Text>
          <TextInput 
            style={styles.input} 
            placeholder="Ex: Anticoncepcional"
            value={name}
            onChangeText={setName}
            placeholderTextColor="#9E9E9E"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Categoria</Text>
          <View style={styles.fakeSelect}>
            <Text style={styles.fakeSelectText}>Medicamento</Text>
            <MaterialCommunityIcons name="chevron-down" size={20} color={LunaTheme.colors.textSecondary} />
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Dosagem</Text>
          <TextInput 
            style={styles.input} 
            placeholder="Ex: 1 comprimido"
            placeholderTextColor="#9E9E9E"
          />
        </View>
        
        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>Receber lembretes</Text>
          <Switch 
            value={remindersEnabled} 
            onValueChange={setRemindersEnabled}
            trackColor={{ false: '#E0E0E0', true: '#AD1457' }}
            thumbColor={remindersEnabled ? '#FFFFFF' : '#F5F5F5'}
          />
        </View>

      </ScrollView>

      <View style={styles.footer}>
        <Pressable style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Salvar</Text>
        </Pressable>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: LunaTheme.spacing.m,
  },
  backButton: {
    padding: LunaTheme.spacing.xs,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: LunaTheme.colors.textPrimary,
  },
  content: {
    paddingVertical: LunaTheme.spacing.m,
  },
  inputGroup: {
    marginBottom: LunaTheme.spacing.l,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: LunaTheme.colors.textSecondary,
    marginBottom: LunaTheme.spacing.s,
  },
  input: {
    backgroundColor: LunaTheme.colors.surface,
    borderWidth: 1,
    borderColor: LunaTheme.colors.border,
    borderRadius: LunaTheme.radii.medium,
    padding: LunaTheme.spacing.m,
    fontSize: 16,
    color: LunaTheme.colors.textPrimary,
  },
  fakeSelect: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: LunaTheme.colors.surface,
    borderWidth: 1,
    borderColor: LunaTheme.colors.border,
    borderRadius: LunaTheme.radii.medium,
    padding: LunaTheme.spacing.m,
  },
  fakeSelectText: {
    fontSize: 16,
    color: LunaTheme.colors.textPrimary,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: LunaTheme.spacing.m,
  },
  switchLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: LunaTheme.colors.textPrimary,
  },
  footer: {
    paddingTop: LunaTheme.spacing.m,
  },
  saveButton: {
    backgroundColor: LunaTheme.colors.primary,
    padding: 16,
    borderRadius: LunaTheme.radii.round,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  }
});
