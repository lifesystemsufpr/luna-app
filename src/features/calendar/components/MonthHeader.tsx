import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LunaTheme } from '../../dashboard/styles/theme'; // Reutilizando o tema

interface MonthHeaderProps {
  currentMonth: Date;
  onNext: () => void;
  onPrev: () => void;
}

export const MonthHeader: React.FC<MonthHeaderProps> = ({ currentMonth, onNext, onPrev }) => {
  const monthName = currentMonth.toLocaleString('pt-BR', { month: 'long' });
  const year = currentMonth.getFullYear();
  
  const formattedTitle = `${monthName.charAt(0).toUpperCase() + monthName.slice(1)} ${year}`;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{formattedTitle}</Text>
      <View style={styles.controls}>
        <Pressable onPress={onPrev} style={({pressed}) => [styles.btn, pressed && styles.pressed]}>
          <MaterialCommunityIcons name="chevron-left" size={28} color={LunaTheme.colors.textPrimary} />
        </Pressable>
        <Pressable onPress={onNext} style={({pressed}) => [styles.btn, pressed && styles.pressed]}>
          <MaterialCommunityIcons name="chevron-right" size={28} color={LunaTheme.colors.textPrimary} />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: LunaTheme.spacing.m,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: LunaTheme.colors.textPrimary,
  },
  controls: {
    flexDirection: 'row',
  },
  btn: {
    padding: LunaTheme.spacing.xs,
    marginLeft: LunaTheme.spacing.s,
  },
  pressed: {
    opacity: 0.6,
  }
});
