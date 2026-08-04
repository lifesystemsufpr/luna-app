import React from 'react';
import { View, Text, StyleSheet, Switch, Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LunaTheme } from '../../dashboard/styles/theme';
import { Medication } from '../types';

interface MedicationCardProps {
  medication: Medication;
  onToggleActive: (id: string) => void;
  onMenuPress: (medication: Medication) => void;
}

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'Anticoncepcional': return 'pill';
    case 'Medicamento': return 'medical-bag';
    case 'Suplemento': return 'lightning-bolt-outline'; // ícone da imagem
    case 'Hormonal': return 'needle';
    case 'Vitamina': return 'leaf';
    default: return 'pill';
  }
};

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'Anticoncepcional': return '#F8BBD0';
    case 'Suplemento': return '#E1BEE7';
    default: return '#E0E0E0';
  }
};

export const MedicationCard: React.FC<MedicationCardProps> = ({ medication, onToggleActive, onMenuPress }) => {
  return (
    <View style={[styles.card, !medication.isActive && styles.cardInactive]}>
      <View style={styles.leftContent}>
        <View style={[styles.iconContainer, { backgroundColor: getCategoryColor(medication.category) }]}>
          <MaterialCommunityIcons name={getCategoryIcon(medication.category) as any} size={24} color={LunaTheme.colors.textPrimary} />
        </View>
        <View style={styles.info}>
          <Text style={styles.name}>{medication.name}</Text>
          <View style={styles.detailsRow}>
            {medication.frequency === 'Diário' ? (
              <MaterialCommunityIcons name="clock-outline" size={14} color={LunaTheme.colors.textSecondary} />
            ) : (
              <MaterialCommunityIcons name="calendar-blank-outline" size={14} color={LunaTheme.colors.textSecondary} />
            )}
            <Text style={styles.detailsText}>
              {medication.frequency === 'Diário' 
                ? `${medication.time} (Diário)` 
                : `${medication.frequency} • ${medication.time}`}
            </Text>
          </View>
        </View>
      </View>
      
      <View style={styles.rightContent}>
        <Switch 
          value={medication.isActive}
          onValueChange={() => onToggleActive(medication.id)}
          trackColor={{ false: '#E0E0E0', true: '#AD1457' }}
          thumbColor={medication.isActive ? '#FFFFFF' : '#F5F5F5'}
        />
        {/* Menu button hidden but can be added here if needed */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: LunaTheme.colors.surface,
    padding: LunaTheme.spacing.m,
    borderRadius: LunaTheme.radii.large,
    marginBottom: LunaTheme.spacing.m,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  cardInactive: {
    opacity: 0.6,
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: LunaTheme.radii.medium,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: LunaTheme.spacing.m,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: LunaTheme.colors.textPrimary,
    marginBottom: 4,
  },
  detailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailsText: {
    fontSize: 14,
    color: LunaTheme.colors.textSecondary,
    marginLeft: 4,
  },
  rightContent: {
    flexDirection: 'row',
    alignItems: 'center',
  }
});
