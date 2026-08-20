import { RootStackParamList } from '@/navigation/RootNavigator';
import { FabButton } from '@/shared/components/FabButton';
import { ScreenWrapper } from '@/shared/components/ScreenWrapper';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ActivityIndicator, ScrollView, StyleSheet, View } from 'react-native';

import { CycleCard } from '../components/CycleCard';
import { Greeting } from '../components/Greeting';
import { HydrationCard } from '../components/HydrationCard';
import { ReminderCard } from '../components/ReminderCard';
import { SummaryCards } from '../components/SummaryCards';
import { useDashboardData } from '../hooks/useDashboardData';
import { LunaTheme } from '../styles/theme';

export const DashboardScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { data, loading } = useDashboardData();

  const handleNewRegister = () => {
    navigation.navigate('NewRegister');
  };

  if (loading || !data) {
    return (
      <ScreenWrapper style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={LunaTheme.colors.primary} />
      </ScreenWrapper>
    );
  }

  return (
    <ScreenWrapper style={styles.wrapper}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Greeting name={data.user.name} />

        <CycleCard
          phase={data.cycle.phase}
          dayOfCycle={data.cycle.dayOfCycle}
          daysUntilNextPeriod={data.cycle.daysUntilNextPeriod}
        />

        <ReminderCard
          title="Próximo lembrete"
          description="Registrar sintomas"
          onPress={handleNewRegister}
        />

        <SummaryCards
          mood={data.mood}
          energy={data.energy}
        />

        <HydrationCard
          current={data.hydration.current}
          goal={data.hydration.goal}
        />


      </ScrollView>

      {/* FAB posicionado absolutamente no canto inferior direito pelo próprio componente */}
      <View style={styles.fabContainer}>
        <FabButton onPress={handleNewRegister} />
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 0, // Remover padding horizontal do wrapper para controlá-lo no conteúdo
    backgroundColor: LunaTheme.colors.background,
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: LunaTheme.colors.background,
  },
  scrollContent: {
    paddingHorizontal: LunaTheme.spacing.m,
    paddingBottom: 20,
  },
  fabContainer: {
    position: 'absolute',
    bottom: LunaTheme.spacing.m,
    right: LunaTheme.spacing.m,
  }
});
