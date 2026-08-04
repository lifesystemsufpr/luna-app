import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NextReminder } from '../types';
import { LunaTheme } from '../../dashboard/styles/theme';

interface ReminderBannerProps {
  reminder: NextReminder | null;
}

export const ReminderBanner: React.FC<ReminderBannerProps> = ({ reminder }) => {
  if (!reminder) return null;

  return (
    <View style={styles.banner}>
      <View style={styles.iconCircle}>
        <MaterialCommunityIcons name="bell-ring-outline" size={24} color="#FFF" />
      </View>
      <View style={styles.content}>
        <Text style={styles.label}>PRÓXIMA DOSE</Text>
        <Text style={styles.title}>
          {reminder.medication.name} às {reminder.medication.time}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D81B60', // Primary
    padding: LunaTheme.spacing.m,
    borderRadius: LunaTheme.radii.large,
    marginBottom: LunaTheme.spacing.l,
    shadowColor: '#D81B60',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: LunaTheme.spacing.m,
  },
  content: {
    flex: 1,
  },
  label: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 1,
    marginBottom: 4,
  },
  title: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  }
});
