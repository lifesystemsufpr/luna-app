import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DayCell } from './DayCell';
import { LunaTheme } from '../../dashboard/styles/theme';

interface CalendarGridProps {
  grid: any[][];
  onDayPress: (dateString: string) => void;
}

export const CalendarGrid: React.FC<CalendarGridProps> = ({ grid, onDayPress }) => {
  const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

  return (
    <View style={styles.card}>
      <View style={styles.weekHeader}>
        {weekDays.map((day, index) => (
          <Text key={index} style={styles.weekDayText}>{day}</Text>
        ))}
      </View>
      
      <View style={styles.grid}>
        {grid.map((week, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {week.map((day, colIndex) => (
              <DayCell 
                key={day.id}
                dayNumber={day.dayNumber}
                type={day.type}
                isCurrentMonth={day.isCurrentMonth}
                onPress={() => day.isCurrentMonth && onDayPress(day.id)}
              />
            ))}
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: LunaTheme.colors.surface,
    borderRadius: LunaTheme.radii.large,
    padding: LunaTheme.spacing.m,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    marginBottom: LunaTheme.spacing.m,
  },
  weekHeader: {
    flexDirection: 'row',
    marginBottom: LunaTheme.spacing.m,
  },
  weekDayText: {
    flex: 1,
    textAlign: 'center',
    color: '#8D6E63', // Tom marrom claro do mockup para os dias da semana
    fontWeight: 'bold',
    fontSize: 12,
  },
  grid: {
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 8,
  }
});
