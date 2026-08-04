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

export const CalendarScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { currentMonth, nextMonth, prevMonth, calendarGrid, onDayPress, selectedDate } = useCalendar();

  const handleAddLog = () => {
    try {
      navigation.navigate('NewRegister');
    } catch (e) {
      console.log('Rota não encontrada');
    }
  };
  
  // Format the title for SelectedDayCard
  // Just a simple split to grab the day. Real app would format nicely with date-fns or similar.
  const selectedDayNum = selectedDate ? selectedDate.split('-')[2] : '8';
  const selectedMonthStr = currentMonth.toLocaleString('pt-BR', { month: 'long' });
  const formattedSelectedTitle = `${Number(selectedDayNum)} de ${selectedMonthStr.charAt(0).toUpperCase() + selectedMonthStr.slice(1)}`;

  return (
    <ScreenWrapper style={styles.wrapper}>
      {/* Top Header */}
      <View style={styles.topHeader}>
        <Text style={styles.screenTitle}>Calendário</Text>
        <Pressable 
          onPress={() => {}} 
          style={({ pressed }) => [
            styles.iconButton,
            pressed && { opacity: 0.7 }
          ]}
        >
          <MaterialCommunityIcons name="cog-outline" size={26} color={LunaTheme.colors.primary} />
        </Pressable>
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
          cycleDayBadge={`Dia ${selectedDayNum} do Ciclo`}
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
