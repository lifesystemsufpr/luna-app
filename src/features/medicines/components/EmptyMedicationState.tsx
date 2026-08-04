import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LunaTheme } from '../../dashboard/styles/theme';

interface EmptyMedicationStateProps {
  onAdd: () => void;
}

export const EmptyMedicationState: React.FC<EmptyMedicationStateProps> = ({ onAdd }) => {
  return (
    <View style={styles.container}>
      <View style={styles.dashedCard}>
        <MaterialCommunityIcons name="plus-circle-outline" size={32} color="#5C3B3B" style={styles.icon} />
        <Text style={styles.title}>Adicionar Medicamento</Text>
        <Text style={styles.subtitle}>Configure alarmes e horários</Text>
        <Pressable 
          style={StyleSheet.absoluteFill} 
          onPress={onAdd}
          android_ripple={{ color: 'rgba(0,0,0,0.05)' }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: LunaTheme.spacing.m,
  },
  dashedCard: {
    borderWidth: 1.5,
    borderColor: '#E0B0B0', // Tom tracejado rosa suave do mockup
    borderStyle: 'dashed',
    borderRadius: LunaTheme.radii.large,
    padding: LunaTheme.spacing.xl,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    overflow: 'hidden',
  },
  icon: {
    marginBottom: LunaTheme.spacing.s,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#5C3B3B', // Marrom avermelhado
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 12,
    color: LunaTheme.colors.textSecondary,
  }
});
