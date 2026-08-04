import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { LunaTheme } from '../../dashboard/styles/theme';

export const WellnessTipCard: React.FC = () => {
  return (
    <View style={styles.card}>
      <View style={styles.badge}>
        <Text style={styles.badgeText}>Dica do Dia</Text>
      </View>
      <Text style={styles.title}>Consistência é a chave</Text>
      <Text style={styles.content}>
        Tome seu suplemento sempre no mesmo horário para otimizar a absorção e manter seus níveis de energia estáveis durante o ciclo.
      </Text>
      
      {/* Imagem/Ilustração mockada no lugar */}
      <View style={styles.imagePlaceholder}>
         {/* Simulando a imagem arredondada com círculo de fundo */}
        <View style={styles.circleBg} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFF2F6', // Fundo bem claro
    borderRadius: LunaTheme.radii.large,
    padding: LunaTheme.spacing.m,
    marginTop: LunaTheme.spacing.m,
    marginBottom: 100, // Espaço extra pra scroll
  },
  badge: {
    backgroundColor: '#F8BBD0',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
    marginBottom: LunaTheme.spacing.s,
  },
  badgeText: {
    color: '#AD1457',
    fontSize: 12,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3E2723', // Marrom escuro
    marginBottom: 2,
  },
  content: {
    fontSize: 13,
    color: '#5D4037',
    lineHeight: 18,
    marginBottom: LunaTheme.spacing.m,
  },
  imagePlaceholder: {
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleBg: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FCE4EC',
  }
});
