import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LunaTheme } from '../styles/theme';

interface SummaryCardsProps {
  mood: string;
  energy: string;
}

export const SummaryCards: React.FC<SummaryCardsProps> = ({ mood, energy }) => {
  return (
    <View style={styles.container}>
      {/* Card de Humor */}
      <View style={styles.card}>
        <View style={styles.header}>
          <View style={[styles.iconContainer, { backgroundColor: '#FFEBEE' }]}>
            <MaterialCommunityIcons name="emoticon-happy-outline" size={24} color="#E53935" />
          </View>
          <Text style={styles.headerTitle}>Humor</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.value}>{mood} 😊</Text>
          <Text style={styles.subtext}>Estável</Text>
        </View>
      </View>

      <View style={styles.spacing} />

      {/* Card de Energia */}
      <View style={styles.card}>
        <View style={styles.header}>
          <View style={[styles.iconContainer, { backgroundColor: '#EDE7F6' }]}>
            <MaterialCommunityIcons name="lightning-bolt-outline" size={24} color="#5E35B1" />
          </View>
          <Text style={styles.headerTitle}>Energia</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.value}>{energy}</Text>
          <View style={styles.progressBarContainer}>
            <View style={[styles.progressBar, { width: '80%', backgroundColor: '#5E35B1' }]} />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: LunaTheme.spacing.m,
  },
  card: {
    flex: 1,
    backgroundColor: LunaTheme.colors.surface,
    borderRadius: LunaTheme.radii.medium,
    padding: LunaTheme.spacing.m,
    borderColor: LunaTheme.colors.border,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  spacing: {
    width: LunaTheme.spacing.m,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: LunaTheme.spacing.m,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 12,
    color: LunaTheme.colors.textSecondary,
    fontWeight: '600',
  },
  content: {
    marginTop: 'auto',
  },
  value: {
    fontSize: 20,
    fontWeight: 'bold',
    color: LunaTheme.colors.textPrimary,
    marginBottom: 4,
  },
  subtext: {
    fontSize: 12,
    color: LunaTheme.colors.textSecondary,
  },
  progressBarContainer: {
    height: 4,
    backgroundColor: '#F5F5F5',
    borderRadius: 2,
    marginTop: 8,
  },
  progressBar: {
    height: '100%',
    borderRadius: 2,
  }
});
