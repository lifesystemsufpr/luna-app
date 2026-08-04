import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

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
    borderRadius: 20, // Cantos arredondados (squircle), ao invés de totalmente circular
    backgroundColor: '#BC004F', // Cor primária do app Luna
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
    fontSize: 34,
    fontWeight: '300', // Fonte mais fina para o ícone de + ficar elegante
    lineHeight: 38, // Ajuste para centralizar visualmente
  },
});
