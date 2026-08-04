import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { ScreenWrapper } from '../../../shared/components/ScreenWrapper';
import { LunaTheme } from '../../dashboard/styles/theme';

export const InsightsScreen = () => {
  return (
    <ScreenWrapper style={styles.wrapper}>
      {/* HEADER */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Seus Insights</Text>
          <Text style={styles.subtitle}>Dados baseados nos seus últimos 3 meses</Text>
        </View>
        <Pressable style={styles.iconButton}>
          <MaterialCommunityIcons name="cog-outline" size={26} color={LunaTheme.colors.primary} />
        </Pressable>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

        {/* TOP CARDS */}
        <View style={styles.row}>
          {/* Card 1 */}
          <View style={[styles.topCard, { backgroundColor: LunaTheme.colors.primary }]}>
            <View style={styles.topCardHeader}>
              <MaterialCommunityIcons name="swap-horizontal" size={20} color="#FFF" />
              <View style={styles.badge}>
                <Text style={styles.badgeText}>Meta</Text>
              </View>
            </View>
            <View style={styles.topCardBody}>
              <Text style={styles.topCardLabelLight}>Duração média</Text>
              <Text style={styles.topCardValueLight}>28 dias</Text>
            </View>
          </View>

          {/* Card 2 */}
          <View style={[styles.topCard, { backgroundColor: '#F8BBD0' }]}>
            <View style={styles.topCardHeader}>
              <MaterialCommunityIcons name="calendar-outline" size={20} color={LunaTheme.colors.textSecondary} />
            </View>
            <View style={styles.topCardBody}>
              <Text style={styles.topCardLabelDark}>Último ciclo</Text>
              <Text style={styles.topCardValueDark}>5 dias</Text>
            </View>
          </View>
        </View>

        {/* HUMOR CARD */}
        <View style={styles.card}>
          <View style={styles.cardHeaderRow}>
            <MaterialCommunityIcons name="emoticon-happy-outline" size={20} color="#673AB7" />
            <Text style={styles.positiveText}>+12% estável</Text>
          </View>
          <Text style={styles.cardLabel}>Humor predominante</Text>
          <View style={styles.humorRow}>
            <Text style={styles.humorEmoji}>😊</Text>
            <Text style={styles.humorText}>Radiante</Text>
          </View>
        </View>

        {/* HISTÓRICO DO CICLO */}
        <View style={styles.card}>
          <View style={styles.cardHeaderRow}>
            <Text style={styles.cardTitle}>Histórico do Ciclo</Text>
            <Pressable>
              <Text style={styles.linkText}>Ver todos &gt;</Text>
            </Pressable>
          </View>

          <View style={styles.chartMock}>
            {/* Tooltip mock */}
            <View style={styles.chartTooltip}>
              <Text style={styles.chartTooltipText}>28d</Text>
              <View style={styles.chartTooltipArrow} />
            </View>
            <View style={styles.chartXAxis}>
              {['Jan', 'Fev', 'Mar', 'Abr', 'Mai'].map((month, idx) => (
                <Text
                  key={month}
                  style={[styles.chartLabel, idx === 2 && styles.chartLabelBold]}
                >
                  {month}
                </Text>
              ))}
            </View>
          </View>
        </View>

        {/* SINTOMAS RECORRENTES */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Sintomas Recorrentes</Text>

          <View style={styles.progressRow}>
            <View style={styles.progressHeader}>
              <Text style={styles.progressLabel}>Cãibras</Text>
              <Text style={styles.progressValue}>12 dias/mês</Text>
            </View>
            <View style={styles.progressBarBg}>
              <View style={[styles.progressBarFill, { width: '80%' }]} />
            </View>
          </View>

          <View style={styles.progressRow}>
            <View style={styles.progressHeader}>
              <Text style={styles.progressLabel}>Fadiga</Text>
              <Text style={styles.progressValue}>8 dias/mês</Text>
            </View>
            <View style={styles.progressBarBg}>
              <View style={[styles.progressBarFill, { width: '50%' }]} />
            </View>
          </View>

          <View style={styles.progressRow}>
            <View style={styles.progressHeader}>
              <Text style={styles.progressLabel}>Enxaqueca</Text>
              <Text style={styles.progressValue}>3 dias/mês</Text>
            </View>
            <View style={styles.progressBarBg}>
              <View style={[styles.progressBarFill, { width: '20%' }]} />
            </View>
          </View>

          <Pressable style={styles.outlineButton}>
            <Text style={styles.outlineButtonText}>Ver Relatório Completo</Text>
          </Pressable>
        </View>

        {/* QUALIDADE DO SONO */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Qualidade do Sono</Text>
          <Text style={styles.cardSubtitle}>Melhora de 15% esta semana</Text>

          <View style={styles.sleepRow}>
            <View style={styles.sleepCircle}>
              <Text style={styles.sleepCircleText}>7.5h</Text>
            </View>
            <View style={styles.sleepInfo}>
              <Text style={styles.sleepInfoTitle}>Média de sono profundo</Text>
              <Text style={styles.sleepInfoDesc}>Qualidade: Alta</Text>
            </View>
          </View>

          <View style={styles.barChartMock}>
            {[40, 60, 80, 50, 100, 60, 50].map((height, idx) => (
              <View
                key={idx}
                style={[
                  styles.bar,
                  { height },
                  idx === 4 && styles.barActive
                ]}
              />
            ))}
          </View>
        </View>

        {/* DICA PERSONALIZADA */}
        <View style={styles.tipCard}>
          <View style={styles.tipHeader}>
            <Text style={styles.tipTitle}>Dica Personalizada</Text>
          </View>
          <View style={styles.tipBody}>
            <View style={styles.tipIconBox}>
              <MaterialCommunityIcons name="lightbulb-outline" size={24} color="#FFF" />
            </View>
            <Text style={styles.tipText}>
              Notamos que seu sono melhora quando você pratica yoga à noite. Que tal uma sessão de 10 min hoje?
            </Text>
          </View>
        </View>

      </ScrollView>

      {/* FAB - Se comportará como absoluto pela implementação do FabButton */}

    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 0,
    backgroundColor: '#FFFBFD',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: LunaTheme.spacing.m,
    paddingTop: LunaTheme.spacing.m,
    paddingBottom: LunaTheme.spacing.m,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1C1B1F', // Quase preto
  },
  subtitle: {
    fontSize: 12,
    color: LunaTheme.colors.textSecondary,
    marginTop: 2,
  },
  iconButton: {
    padding: LunaTheme.spacing.xs,
  },
  scrollContent: {
    paddingHorizontal: LunaTheme.spacing.m,
    paddingBottom: 100, // Espaço pro FAB e rolagem
  },
  row: {
    flexDirection: 'row',
    gap: LunaTheme.spacing.m,
    marginBottom: LunaTheme.spacing.m,
  },
  topCard: {
    flex: 1,
    borderRadius: LunaTheme.radii.large,
    padding: LunaTheme.spacing.m,
    minHeight: 110,
    justifyContent: 'space-between',
  },
  topCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  badge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  badgeText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  topCardBody: {
    marginTop: LunaTheme.spacing.m,
  },
  topCardLabelLight: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 12,
  },
  topCardValueLight: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: 'bold',
  },
  topCardLabelDark: {
    color: LunaTheme.colors.textSecondary,
    fontSize: 12,
  },
  topCardValueDark: {
    color: LunaTheme.colors.textPrimary,
    fontSize: 22,
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#F5F5F5',
    borderRadius: LunaTheme.radii.large,
    padding: LunaTheme.spacing.l,
    marginBottom: LunaTheme.spacing.m,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  positiveText: {
    color: '#673AB7',
    fontSize: 12,
    fontWeight: 'bold',
  },
  cardLabel: {
    fontSize: 12,
    color: LunaTheme.colors.textSecondary,
  },
  humorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  humorEmoji: {
    fontSize: 24,
    marginRight: 8,
  },
  humorText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: LunaTheme.colors.textPrimary,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: LunaTheme.colors.textPrimary,
  },
  cardSubtitle: {
    fontSize: 12,
    color: LunaTheme.colors.textSecondary,
    marginBottom: LunaTheme.spacing.m,
  },
  linkText: {
    fontSize: 12,
    color: LunaTheme.colors.primary,
  },
  chartMock: {
    height: 100,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingTop: 40,
  },
  chartTooltip: {
    backgroundColor: '#333',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    position: 'absolute',
    top: 20,
  },
  chartTooltipText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  chartTooltipArrow: {
    width: 0,
    height: 0,
    borderLeftWidth: 4,
    borderRightWidth: 4,
    borderTopWidth: 4,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#333',
    alignSelf: 'center',
    marginTop: 4,
  },
  chartXAxis: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 16,
    marginTop: 16,
  },
  chartLabel: {
    fontSize: 12,
    color: LunaTheme.colors.textSecondary,
  },
  chartLabelBold: {
    fontWeight: 'bold',
    color: LunaTheme.colors.textPrimary,
  },
  progressRow: {
    marginBottom: LunaTheme.spacing.m,
    marginTop: 8,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  progressLabel: {
    fontSize: 12,
    color: LunaTheme.colors.textSecondary,
  },
  progressValue: {
    fontSize: 12,
    color: LunaTheme.colors.textPrimary,
    fontWeight: 'bold',
  },
  progressBarBg: {
    height: 6,
    backgroundColor: '#E0E0E0',
    borderRadius: 3,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#673AB7',
    borderRadius: 3,
  },
  outlineButton: {
    borderWidth: 1,
    borderColor: '#E0B0B0',
    borderRadius: 24,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: LunaTheme.spacing.m,
  },
  outlineButtonText: {
    color: LunaTheme.colors.primary,
    fontWeight: 'bold',
    fontSize: 14,
  },
  sleepRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: LunaTheme.spacing.l,
  },
  sleepCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: '#F8BBD0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  sleepCircleText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: LunaTheme.colors.textPrimary,
  },
  sleepInfo: {
    flex: 1,
  },
  sleepInfoTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: LunaTheme.colors.textPrimary,
  },
  sleepInfoDesc: {
    fontSize: 12,
    color: LunaTheme.colors.textSecondary,
  },
  barChartMock: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 60,
    marginTop: 8,
  },
  bar: {
    width: '12%',
    backgroundColor: '#FCE4EC',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  barActive: {
    backgroundColor: '#6D4C41', // Marrom avermelhado escuro do mockup
  },
  tipCard: {
    backgroundColor: '#7E57C2', // Roxo principal
    borderRadius: LunaTheme.radii.large,
    padding: LunaTheme.spacing.l,
    marginBottom: LunaTheme.spacing.m,
  },
  tipHeader: {
    marginBottom: LunaTheme.spacing.m,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
  tipBody: {
    flexDirection: 'row',
  },
  tipIconBox: {
    width: 40,
    height: 40,
    borderRadius: LunaTheme.radii.medium,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  tipText: {
    flex: 1,
    color: '#FFF',
    fontSize: 13,
    lineHeight: 18,
  }
});
