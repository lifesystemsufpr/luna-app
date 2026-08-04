import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LunaTheme } from '../styles/theme';

interface GreetingProps {
  name: string;
  onSettingsPress?: () => void;
}

export const Greeting: React.FC<GreetingProps> = ({ name, onSettingsPress }) => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>Bom dia, {name}!</Text>
        <Text style={styles.subtitle}>Que bom ver você hoje.</Text>
      </View>
      <Pressable 
        onPress={onSettingsPress} 
        style={({ pressed }) => [
          styles.iconButton,
          pressed && { opacity: 0.7 }
        ]}
      >
        <MaterialCommunityIcons name="cog-outline" size={26} color={LunaTheme.colors.primary} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: LunaTheme.spacing.l,
    marginTop: LunaTheme.spacing.m, // Add some top margin since we removed the header
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: LunaTheme.colors.textPrimary,
    marginBottom: LunaTheme.spacing.xs,
  },
  subtitle: {
    fontSize: 16,
    color: LunaTheme.colors.textSecondary,
  },
  iconButton: {
    padding: LunaTheme.spacing.xs,
    marginLeft: LunaTheme.spacing.m,
  }
});
