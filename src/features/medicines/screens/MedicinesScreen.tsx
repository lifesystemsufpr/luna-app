import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { ScreenWrapper } from '../../../shared/components/ScreenWrapper';
import { MedicinesStackParamList } from '../navigation/MedicinesNavigator';

import { LunaTheme } from '../../dashboard/styles/theme';
import { EmptyMedicationState } from '../components/EmptyMedicationState';
import { MedicationCard } from '../components/MedicationCard';
import { ReminderBanner } from '../components/ReminderBanner';
import { WellnessTipCard } from '../components/WellnessTipCard';
import { useMedications } from '../hooks/useMedications';

export const MedicinesScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<MedicinesStackParamList>>();
  const { medications, nextReminder, toggleActive } = useMedications();

  const handleAddMedication = () => {
    navigation.navigate('NewMedication');
  };

  return (
    <ScreenWrapper style={styles.wrapper}>
      {/* Top Header */}
      <View style={styles.topHeader}>
        <View style={styles.titleContainer}>
          <Text style={styles.screenTitle}>Meus Remédios</Text>
          <Text style={styles.screenSubtitle}>Gerencie sua rotina de cuidados diários.</Text>
        </View>

      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <ReminderBanner reminder={nextReminder} />

        {medications.map(med => (
          <MedicationCard
            key={med.id}
            medication={med}
            onToggleActive={toggleActive}
            onMenuPress={() => { }}
          />
        ))}

        <EmptyMedicationState onAdd={handleAddMedication} />

        <WellnessTipCard />
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
    alignItems: 'flex-start',
    paddingHorizontal: LunaTheme.spacing.m,
    paddingTop: LunaTheme.spacing.m,
    paddingBottom: LunaTheme.spacing.m,
  },
  titleContainer: {
    flex: 1,
    paddingRight: 16,
  },
  screenTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: LunaTheme.colors.textPrimary,
    marginBottom: 4,
  },
  screenSubtitle: {
    fontSize: 14,
    color: LunaTheme.colors.textSecondary,
  },
  iconButton: {
    padding: LunaTheme.spacing.xs,
  },
  scrollContent: {
    paddingHorizontal: LunaTheme.spacing.m,
    paddingTop: 8,
    paddingBottom: 20,
  }
});
