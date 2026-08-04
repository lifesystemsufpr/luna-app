import React from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LunaTheme } from '../styles/theme';

interface RegisterButtonProps {
  onPress: () => void;
}

export const RegisterButton: React.FC<RegisterButtonProps> = ({ onPress }) => {
  return (
    <Pressable 
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        pressed && styles.buttonPressed
      ]}
    >
      <MaterialCommunityIcons name="pencil-outline" size={24} color={LunaTheme.colors.surface} style={styles.icon} />
      <Text style={styles.text}>Registrar Hoje</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#1A1A1A',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 18,
    borderRadius: LunaTheme.radii.round,
    marginBottom: 80, // espaço para não colar na base / bottom bar mock
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }]
  },
  icon: {
    marginRight: LunaTheme.spacing.s,
  },
  text: {
    color: LunaTheme.colors.surface,
    fontSize: 16,
    fontWeight: 'bold',
  }
});
