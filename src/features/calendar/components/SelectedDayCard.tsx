import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LunaTheme } from '../../dashboard/styles/theme';

interface SelectedDayCardProps {
  dateTitle: string;
  cycleDayBadge: string;
  onAddLog: () => void;
}

export const SelectedDayCard: React.FC<SelectedDayCardProps> = ({ dateTitle, cycleDayBadge, onAddLog }) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>{dateTitle}</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{cycleDayBadge}</Text>
        </View>
      </View>

      <View style={styles.infoRow}>
        <View style={styles.infoBox}>
          <View style={styles.infoIconRow}>
            <MaterialCommunityIcons name="water-outline" size={24} color="#D81B60" style={styles.icon} />
            <View>
              <Text style={styles.infoLabel}>Fluxo</Text>
              <Text style={styles.infoValue}>Leve</Text>
            </View>
          </View>
        </View>

        <View style={styles.infoBox}>
          <View style={styles.infoIconRow}>
            <MaterialCommunityIcons name="emoticon-happy-outline" size={24} color="#5E35B1" style={styles.icon} />
            <View>
              <Text style={styles.infoLabel}>Humor</Text>
              <Text style={styles.infoValue}>Feliz</Text>
            </View>
          </View>
        </View>
      </View>

      <Pressable 
        style={({pressed}) => [styles.addButton, pressed && styles.pressed]}
        onPress={onAddLog}
      >
        <MaterialCommunityIcons name="plus" size={24} color="#FFF" style={styles.addIcon} />
        <Text style={styles.addText}>Adicionar Registro</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: LunaTheme.colors.surface,
    borderRadius: LunaTheme.radii.large,
    padding: LunaTheme.spacing.l,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    marginBottom: 80, // espaço extra pra navbar/scroll
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: LunaTheme.spacing.m,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: LunaTheme.colors.textPrimary,
  },
  badge: {
    backgroundColor: LunaTheme.colors.secondary,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: LunaTheme.radii.round,
  },
  badgeText: {
    color: '#AD1457', // Accent
    fontSize: 12,
    fontWeight: '600',
  },
  infoRow: {
    flexDirection: 'row',
    gap: LunaTheme.spacing.m,
    marginBottom: LunaTheme.spacing.l,
  },
  infoBox: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    borderRadius: LunaTheme.radii.medium,
    padding: LunaTheme.spacing.m,
  },
  infoIconRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: LunaTheme.spacing.s,
  },
  infoLabel: {
    fontSize: 12,
    color: LunaTheme.colors.textSecondary,
    fontWeight: '600',
  },
  infoValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: LunaTheme.colors.textPrimary,
  },
  addButton: {
    backgroundColor: '#BC004F', // tom de botão na imagem
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    borderRadius: LunaTheme.radii.round,
  },
  addIcon: {
    marginRight: 8,
  },
  addText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  pressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }]
  }
});
