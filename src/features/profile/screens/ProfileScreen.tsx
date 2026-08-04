import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import { ScreenWrapper } from '../../../shared/components/ScreenWrapper';
import { LunaTheme } from '../../dashboard/styles/theme';

export const ProfileScreen = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isBiometricsEnabled, setIsBiometricsEnabled] = useState(true);

  return (
    <ScreenWrapper style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.userName}>Ana</Text>
          <View style={styles.subtitleRow}>
            <Text style={styles.userAge}>28 anos</Text>
          </View>
        </View>

        {/* TEMA */}
        <View style={styles.card}>
          <View style={styles.cardLeft}>
            <MaterialCommunityIcons name="moon-waning-crescent" size={24} color={LunaTheme.colors.primary} style={styles.cardIcon} />
            <View>
              <Text style={styles.cardTitle}>Tema</Text>
              <Text style={styles.cardSubtitle}>Claro / Escuro</Text>
            </View>
          </View>
          <Switch
            value={isDarkMode}
            onValueChange={setIsDarkMode}
            trackColor={{ false: '#E0E0E0', true: '#F48FB1' }}
            thumbColor={isDarkMode ? LunaTheme.colors.primary : '#FFFFFF'}
          />
        </View>

        {/* NOTIFICAÇÕES */}
        <Pressable style={styles.card}>
          <View style={styles.cardLeft}>
            <MaterialCommunityIcons name="bell-outline" size={24} color="#795548" style={styles.cardIcon} />
            <View>
              <Text style={styles.cardTitle}>Notificações</Text>
              <Text style={styles.cardSubtitle}>Lembretes & Alertas</Text>
            </View>
          </View>
          <MaterialCommunityIcons name="chevron-right" size={24} color={LunaTheme.colors.textSecondary} />
        </Pressable>

        {/* RELATÓRIO PDF */}
        <Pressable style={styles.card}>
          <View style={styles.cardLeft}>
            <View style={[styles.roundedIconBg, { backgroundColor: '#FFCDD2' }]}>
              <MaterialCommunityIcons name="file-pdf-box" size={20} color="#D32F2F" />
            </View>
            <View>
              <Text style={styles.cardTitle}>Relatório PDF</Text>
              <Text style={styles.cardSubtitle}>Exportar histórico</Text>
            </View>
          </View>
          <MaterialCommunityIcons name="download" size={24} color="#795548" />
        </Pressable>

        {/* GROUPED MENU (Sobre / Sair) */}
        <View style={styles.groupedCard}>
          <Pressable style={styles.groupedItem}>
            <MaterialCommunityIcons name="help-circle-outline" size={24} color="#795548" style={styles.groupedIcon} />
            <Text style={styles.groupedItemTitle}>Sobre & Suporte</Text>
            <View style={{ flex: 1 }} />
            <MaterialCommunityIcons name="chevron-right" size={24} color={LunaTheme.colors.textSecondary} />
          </Pressable>

          <Pressable style={[styles.groupedItem, styles.groupedItemNoBorder]}>
            <MaterialCommunityIcons name="logout" size={24} color="#D32F2F" style={styles.groupedIcon} />
            <Text style={[styles.groupedItemTitle, { color: '#D32F2F' }]}>Sair da Conta</Text>
          </Pressable>
        </View>

        {/* FOOTER */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Versão 1.0.0 (Luna)</Text>
          <Text style={styles.footerText}>Luna • Feito com cuidado para sua saúde</Text>
        </View>

      </ScrollView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 0,
    backgroundColor: '#FFFBFD',
  },
  scrollContent: {
    paddingHorizontal: LunaTheme.spacing.m,
    paddingTop: 40, // Espaço extra superior
    paddingBottom: 60,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  userName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1C1B1F',
    marginBottom: 4,
  },
  subtitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userAge: {
    fontSize: 14,
    color: '#757575',
  },
  userStatus: {
    fontSize: 14,
    color: LunaTheme.colors.primary,
    fontWeight: 'bold',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F5F5F5',
    borderRadius: LunaTheme.radii.large,
    padding: LunaTheme.spacing.m,
    marginBottom: LunaTheme.spacing.m,
  },
  cardHighlighted: {
    backgroundColor: '#F8BBD0', // Rosa claro
    paddingVertical: LunaTheme.spacing.l, // Um pouco mais alto
  },
  cardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardIcon: {
    marginRight: 16,
  },
  whiteIconBg: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  roundedIconBg: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3E2723', // Marrom/preto
  },
  cardSubtitle: {
    fontSize: 12,
    color: '#795548',
    marginTop: 2,
  },
  groupedCard: {
    backgroundColor: '#F5F5F5',
    borderRadius: LunaTheme.radii.large,
    paddingHorizontal: LunaTheme.spacing.m,
    marginBottom: LunaTheme.spacing.m,
  },
  groupedItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: LunaTheme.spacing.m,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  groupedItemNoBorder: {
    borderBottomWidth: 0,
  },
  groupedIcon: {
    marginRight: 16,
  },
  groupedItemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3E2723',
  },
  footer: {
    alignItems: 'center',
    marginTop: 40,
  },
  footerText: {
    fontSize: 11,
    color: '#9E9E9E',
    marginBottom: 4,
  }
});
