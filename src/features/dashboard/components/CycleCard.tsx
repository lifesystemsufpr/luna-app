import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LunaTheme } from '../styles/theme';

interface CycleCardProps {
  phase: string;
  dayOfCycle: number;
  daysUntilNextPeriod: number;
}

export const CycleCard: React.FC<CycleCardProps> = ({ phase, dayOfCycle, daysUntilNextPeriod }) => {
  return (
    <View style={styles.card}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.overline}>HOJE</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>Dia {dayOfCycle}</Text>
          </View>
        </View>
        
        <View style={styles.titleRow}>
          <Text style={styles.title}>{phase}</Text>
          <MaterialCommunityIcons name="flower" size={24} color={LunaTheme.colors.secondary} style={styles.icon} />
        </View>

        <View style={styles.footer}>
          <View>
            <Text style={styles.subtitle}>
              {daysUntilNextPeriod < 0 ? 'Atrasada há' : 'Próxima menstruação em'}
            </Text>
            <Text style={styles.daysText}>{Math.abs(daysUntilNextPeriod)} dias</Text>
          </View>
          
          <View style={styles.progressCircle}>
            {/* Representação visual simplificada do progresso do ciclo */}
            <View style={styles.progressInner} />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: LunaTheme.colors.primary,
    borderRadius: LunaTheme.radii.large,
    padding: LunaTheme.spacing.l,
    marginBottom: LunaTheme.spacing.m,
    elevation: 4,
    shadowColor: LunaTheme.colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  content: {
    flexDirection: 'column',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: LunaTheme.spacing.xs,
  },
  overline: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 1,
  },
  badge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: LunaTheme.radii.round,
  },
  badgeText: {
    color: LunaTheme.colors.surface,
    fontSize: 12,
    fontWeight: 'bold',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: LunaTheme.spacing.l,
  },
  title: {
    color: LunaTheme.colors.surface,
    fontSize: 26,
    fontWeight: 'bold',
  },
  icon: {
    marginLeft: LunaTheme.spacing.s,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  subtitle: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 14,
    marginBottom: 2,
  },
  daysText: {
    color: LunaTheme.colors.surface,
    fontSize: 32,
    fontWeight: 'bold',
  },
  progressCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 4,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressInner: {
    width: 52,
    height: 52,
    borderRadius: 26,
    borderWidth: 4,
    borderColor: LunaTheme.colors.surface,
    borderLeftColor: 'transparent',
    borderBottomColor: 'transparent',
    transform: [{ rotate: '45deg' }]
  }
});
