import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LunaTheme } from '../../dashboard/styles/theme';

export const Legend: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <View style={[styles.circle, styles.menstruation]} />
        <Text style={styles.text}>Menstruação</Text>
      </View>
      <View style={styles.item}>
        <View style={[styles.circle, styles.predicted]} />
        <Text style={styles.text}>Previsto</Text>
      </View>
      <View style={styles.item}>
        <View style={[styles.circle, styles.fertile]} />
        <Text style={styles.text}>Período Fértil</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: LunaTheme.spacing.l,
    gap: LunaTheme.spacing.m,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  circle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 6,
  },
  menstruation: {
    backgroundColor: LunaTheme.colors.secondary,
  },
  predicted: {
    borderWidth: 1,
    borderColor: LunaTheme.colors.secondary,
    borderStyle: 'dashed',
    backgroundColor: 'transparent',
  },
  fertile: {
    backgroundColor: '#E1BEE7', // lilás
  },
  text: {
    fontSize: 12,
    color: LunaTheme.colors.textSecondary,
    fontWeight: '600',
  }
});
