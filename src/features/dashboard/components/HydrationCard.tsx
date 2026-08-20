import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Modal } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LunaTheme } from '../styles/theme';
import { useDailyRecordStore } from '../../../shared/store/dailyRecordStore';
import { formatDate } from '../../../shared/utils/dateUtils';

interface HydrationCardProps {
  current: number;
  goal: number;
}

export const HydrationCard: React.FC<HydrationCardProps> = ({ current, goal }) => {
  const [modalVisible, setModalVisible] = useState(false);
  
  const addWaterStore = useDailyRecordStore(state => state.addWater);
  const setHydrationGoal = useDailyRecordStore(state => state.setHydrationGoal);
  
  const today = formatDate(new Date(), 'YYYY-MM-DD');

  const percentage = Math.min(Math.round((current / goal) * 100), 100) || 0;

  const addWater = (amountInLiters: number) => {
    addWaterStore(today, amountInLiters);
    setModalVisible(false);
  };

  const increaseGoal = () => setHydrationGoal(parseFloat((goal + 0.1).toFixed(2)));
  const decreaseGoal = () => setHydrationGoal(goal > 0.1 ? parseFloat((goal - 0.1).toFixed(2)) : goal);

  return (
    <>
      <Pressable style={styles.card} onPress={() => setModalVisible(true)}>
        <View style={styles.row}>
          <View style={styles.leftContent}>
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons name="water-outline" size={24} color="#1E88E5" />
            </View>
            <View>
              <Text style={styles.title}>Hidratação</Text>
              <Text style={styles.subtitle}>Meta: {goal.toString().replace('.', ',')} L</Text>
            </View>
          </View>
          <View style={styles.rightContent}>
            <Text style={styles.value}>{current.toString().replace('.', ',')} L</Text>
            <Text style={styles.percentage}>{percentage}% da meta</Text>
          </View>
        </View>
        
        {/* Barra de Progresso */}
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBar, { width: `${percentage}%` }]} />
        </View>
      </Pressable>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Hidratação</Text>
              <Pressable onPress={() => setModalVisible(false)}>
                <MaterialCommunityIcons name="close" size={24} color="#333" />
              </Pressable>
            </View>

            <View style={styles.section}>
              <Text style={styles.modalSubtitle}>Ajustar meta diária</Text>
              <View style={styles.goalAdjustRow}>
                <Pressable style={styles.goalBtn} onPress={decreaseGoal}>
                  <MaterialCommunityIcons name="minus" size={24} color="#1E88E5" />
                </Pressable>
                <Text style={styles.goalText}>{goal.toString().replace('.', ',')} L</Text>
                <Pressable style={styles.goalBtn} onPress={increaseGoal}>
                  <MaterialCommunityIcons name="plus" size={24} color="#1E88E5" />
                </Pressable>
              </View>
            </View>
            
            <View style={styles.section}>
              <Text style={styles.modalSubtitle}>Quanto você bebeu agora?</Text>
              <View style={styles.waterOptionsRow}>
                <Pressable style={styles.waterOptionBtn} onPress={() => addWater(0.2)}>
                  <MaterialCommunityIcons name="cup-water" size={32} color="#1E88E5" />
                  <Text style={styles.waterOptionText}>200 ml</Text>
                </Pressable>
                
                <Pressable style={styles.waterOptionBtn} onPress={() => addWater(0.35)}>
                  <MaterialCommunityIcons name="glass-mug-variant" size={32} color="#1E88E5" />
                  <Text style={styles.waterOptionText}>350 ml</Text>
                </Pressable>
                
                <Pressable style={styles.waterOptionBtn} onPress={() => addWater(0.5)}>
                  <MaterialCommunityIcons name="bottle-tonic-outline" size={32} color="#1E88E5" />
                  <Text style={styles.waterOptionText}>500 ml</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: LunaTheme.colors.surface,
    borderRadius: LunaTheme.radii.medium,
    padding: LunaTheme.spacing.m,
    marginBottom: LunaTheme.spacing.l,
    borderColor: LunaTheme.colors.border,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: LunaTheme.spacing.m,
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E3F2FD',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: LunaTheme.spacing.s,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: LunaTheme.colors.textPrimary,
  },
  subtitle: {
    fontSize: 12,
    color: LunaTheme.colors.textSecondary,
    marginTop: 2,
  },
  rightContent: {
    alignItems: 'flex-end',
  },
  value: {
    fontSize: 20,
    fontWeight: 'bold',
    color: LunaTheme.colors.primary,
  },
  percentage: {
    fontSize: 12,
    color: LunaTheme.colors.textSecondary,
    marginTop: 2,
  },
  progressBarContainer: {
    height: 6,
    backgroundColor: '#F5F5F5',
    borderRadius: 3,
    width: '100%',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#1E88E5',
    borderRadius: 3,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#FFF',
    width: '100%',
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 8,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: LunaTheme.colors.primary,
  },
  section: {
    marginBottom: 24,
  },
  modalSubtitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: LunaTheme.colors.textPrimary,
    marginBottom: 16,
  },
  goalAdjustRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  goalBtn: {
    backgroundColor: '#E3F2FD',
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  goalText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E88E5',
    marginHorizontal: 32,
  },
  waterOptionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  waterOptionBtn: {
    alignItems: 'center',
    backgroundColor: '#F3EDF7',
    padding: 16,
    borderRadius: 16,
    flex: 1,
    marginHorizontal: 4,
  },
  waterOptionText: {
    marginTop: 8,
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
  },
});
