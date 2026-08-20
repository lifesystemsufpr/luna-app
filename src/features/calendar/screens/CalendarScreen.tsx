import React from 'react';
import { StyleSheet, ScrollView, View, Text, Pressable } from 'react-native';
import { ScreenWrapper } from '@/shared/components/ScreenWrapper';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/RootNavigator';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { MonthHeader } from '../components/MonthHeader';
import { CalendarGrid } from '../components/CalendarGrid';
import { Legend } from '../components/Legend';
import { SelectedDayCard } from '../components/SelectedDayCard';
import { useCalendar } from '../hooks/useCalendar';
import { LunaTheme } from '../../dashboard/styles/theme'; // Reutilizando a paleta base
import { useCycleStore } from '../../cycle/store/cycleStore';
import { differenceInDays, parseISOLocal } from '../../../shared/utils/dateUtils';

export const CalendarScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { currentMonth, nextMonth, prevMonth, calendarGrid, onDayPress, selectedDate } = useCalendar();
  const periods = useCycleStore(state => state.periods);

  const handleAddLog = () => {
    navigation.navigate('NewRegister');
  };
  
  // Format the title for SelectedDayCard
  let formattedSelectedTitle = '';
  let cycleDayBadge = '';

  if (selectedDate) {
    const [year, month, day] = selectedDate.split('-');
    const dateObj = new Date(Number(year), Number(month) - 1, Number(day));
    const dayNum = Number(day);
    
    const monthStr = dateObj.toLocaleString('pt-BR', { month: 'long' });
    formattedSelectedTitle = `${dayNum} de ${monthStr.charAt(0).toUpperCase() + monthStr.slice(1)}`;
    
    cycleDayBadge = 'Sem dados';
    const targetDate = parseISOLocal(selectedDate);
    const pastPeriods = periods.filter(p => parseISOLocal(p.startDate) <= targetDate);
    
    if (pastPeriods.length > 0) {
      // periods já vem ordenado descrescente do store
      const mostRecent = pastPeriods[0];
      const diff = differenceInDays(selectedDate, mostRecent.startDate) + 1;
      cycleDayBadge = `Dia ${diff} do Ciclo`;
    }
  }

  return (
    <ScreenWrapper style={styles.wrapper}>
      {/* Top Header */}
      <View style={styles.topHeader}>
        <Text style={styles.screenTitle}>Calendário</Text>

      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <MonthHeader 
          currentMonth={currentMonth}
          onNext={nextMonth}
          onPrev={prevMonth}
        />
        
        <CalendarGrid 
          grid={calendarGrid} 
          onDayPress={onDayPress || (() => {})} 
        />
        
        <Legend />
        
        <SelectedDayCard 
          dateTitle={formattedSelectedTitle}
          cycleDayBadge={cycleDayBadge}
          onAddLog={handleAddLog}
        />
      </ScrollView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 0,
    backgroundColor: LunaTheme.colors.background,
  },
  topHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: LunaTheme.spacing.m,
    paddingTop: LunaTheme.spacing.m,
    paddingBottom: LunaTheme.spacing.s,
  },
  screenTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: LunaTheme.colors.textPrimary,
  },
  iconButton: {
    padding: LunaTheme.spacing.xs,
  },
  scrollContent: {
    paddingHorizontal: LunaTheme.spacing.m,
    paddingTop: LunaTheme.spacing.m, // Reduzido um pouco pois o topHeader já dá espaçamento
    paddingBottom: 20,
  }
});
