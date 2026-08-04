import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LunaTheme } from '../styles/theme';

interface ReminderCardProps {
  title: string;
  description: string;
  onPress?: () => void;
}

export const ReminderCard: React.FC<ReminderCardProps> = ({ title, description, onPress }) => {
  return (
    <Pressable 
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        pressed && { opacity: 0.8, transform: [{ scale: 0.98 }] }
      ]}
    >
      <View style={styles.iconContainer}>
        <MaterialCommunityIcons name="bell-outline" size={24} color={LunaTheme.colors.accent} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
      <MaterialCommunityIcons name="chevron-right" size={24} color={LunaTheme.colors.accent} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: LunaTheme.colors.secondary,
    borderRadius: LunaTheme.radii.medium,
    padding: LunaTheme.spacing.m,
    marginBottom: LunaTheme.spacing.m,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: LunaTheme.spacing.m,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: LunaTheme.colors.accent,
    marginBottom: 2,
  },
  description: {
    fontSize: 14,
    color: LunaTheme.colors.accent,
    opacity: 0.8,
  }
});
