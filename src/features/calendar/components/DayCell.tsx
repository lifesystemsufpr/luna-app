import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { LunaTheme } from '../../dashboard/styles/theme';

interface DayCellProps {
  dayNumber: number;
  type: string;
  isCurrentMonth: boolean;
  onPress: () => void;
}

export const DayCell: React.FC<DayCellProps> = ({ dayNumber, type, isCurrentMonth, onPress }) => {
  const getContainerStyle = () => {
    if (!isCurrentMonth) return [styles.cell, styles.notCurrentMonth];
    
    switch (type) {
      case 'selected':
        return [styles.cell, styles.selected];
      case 'menstruation':
        return [styles.cell, styles.menstruation];
      case 'menstruation-selected':
        return [styles.cell, styles.menstruationSelected];
      case 'fertile':
        return [styles.cell, styles.fertile];
      case 'predicted':
        return [styles.cell, styles.predicted];
      case 'today':
        return [styles.cell, styles.today];
      default:
        return styles.cell;
    }
  };

  const getTextStyle = () => {
    if (!isCurrentMonth) return [styles.text, styles.textNotCurrent];
    if (type === 'selected' || type === 'menstruation-selected') return [styles.text, styles.textWhite];
    if (type === 'today') return [styles.text, styles.textPrimary];
    return styles.text;
  };

  return (
    <TouchableOpacity 
      style={styles.wrapper} 
      onPress={onPress}
      disabled={!isCurrentMonth}
      activeOpacity={0.7}
    >
      <View style={getContainerStyle()}>
        <Text style={getTextStyle()}>{dayNumber}</Text>
      </View>
    </TouchableOpacity>
  );
};

const CELL_SIZE = 36;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cell: {
    width: CELL_SIZE,
    height: CELL_SIZE,
    borderRadius: CELL_SIZE / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    color: LunaTheme.colors.textPrimary,
  },
  textNotCurrent: {
    color: '#D0D0D0',
  },
  textWhite: {
    color: LunaTheme.colors.surface,
    fontWeight: 'bold',
  },
  textPrimary: {
    color: LunaTheme.colors.primary,
    fontWeight: 'bold',
  },
  notCurrentMonth: {
    backgroundColor: 'transparent',
  },
  selected: {
    backgroundColor: LunaTheme.colors.primary,
  },
  menstruation: {
    backgroundColor: LunaTheme.colors.secondary, // rosa claro
  },
  menstruationSelected: {
    backgroundColor: '#AD1457', // Accent mais forte
  },
  fertile: {
    backgroundColor: '#E1BEE7', // lilás
  },
  predicted: {
    borderWidth: 1.5,
    borderColor: LunaTheme.colors.secondary,
    borderStyle: 'dashed',
  },
  today: {
    borderWidth: 1.5,
    borderColor: LunaTheme.colors.primary,
  }
});
