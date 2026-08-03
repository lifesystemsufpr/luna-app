import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';

interface FabButtonProps {
  onPress: () => void;
  title?: string;
}

export const FabButton: React.FC<FabButtonProps> = ({ onPress, title = '+' }) => {
  return (
    <TouchableOpacity style={styles.fab} onPress={onPress} activeOpacity={0.8}>
      <Text style={styles.fabText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#208AEF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4, // Para Android
    shadowColor: '#000', // Para iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    zIndex: 999,
  },
  fabText: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 36, // Ajuste para centralizar visualmente
  },
});
