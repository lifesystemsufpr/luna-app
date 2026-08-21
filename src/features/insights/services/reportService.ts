import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system/legacy';
import { useCycleStore } from '../../cycle/store/cycleStore';
import { useDailyRecordStore } from '../../../shared/store/dailyRecordStore';
import { statisticsService } from './statisticsService';

export const reportService = {
  generateAndSharePDF: async () => {
    try {
      const periods = useCycleStore.getState().periods;
      const { moods, symptoms } = useDailyRecordStore.getState();

      const stats = statisticsService.getCycleStats(periods);
      const mood = statisticsService.getPredominantMood(moods);
      const frequentSymptoms = statisticsService.getFrequentSymptoms(symptoms);

      const symptomsHtml = frequentSymptoms.map(s => `<li>${s.label}: ${s.count} registros</li>`).join('');
      
      const html = `
        <html>
          <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
            <style>
              body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; padding: 20px; color: #333; }
              h1 { color: #AD1457; text-align: center; }
              .card { background-color: #F5F5F5; border-radius: 8px; padding: 16px; margin-bottom: 20px; }
              h2 { color: #673AB7; font-size: 18px; border-bottom: 1px solid #ddd; padding-bottom: 8px; }
              ul { padding-left: 20px; }
              li { margin-bottom: 8px; }
            </style>
          </head>
          <body>
            <h1>Relatório de Saúde Luna</h1>
            <p style="text-align:center; color:#888;">Gerado em ${new Date().toLocaleDateString('pt-BR')}</p>
            
            <div class="card">
              <h2>Visão Geral do Ciclo</h2>
              <ul>
                <li>Duração Média do Ciclo: <strong>${stats.averageCycleLength} dias</strong></li>
                <li>Duração Média da Menstruação: <strong>${stats.averagePeriodLength} dias</strong></li>
                <li>Ciclos Registrados: <strong>${periods.length}</strong></li>
              </ul>
            </div>

            <div class="card">
              <h2>Humor e Bem-Estar</h2>
              <p>Humor Predominante: <strong>${mood ? `${mood.emoji} ${mood.text}` : 'Sem registros'}</strong></p>
            </div>

            <div class="card">
              <h2>Sintomas Recorrentes</h2>
              <ul>
                ${symptomsHtml || '<li>Nenhum sintoma registrado.</li>'}
              </ul>
            </div>
            
            <p style="text-align: center; font-size: 12px; color: #aaa; margin-top: 40px;">
              Luna - Seu app de acompanhamento do ciclo menstrual.<br/>
              Este relatório é para acompanhamento pessoal e não substitui aconselhamento médico.
            </p>
          </body>
        </html>
      `;

      const { uri } = await Print.printToFileAsync({ html });
      
      const newUri = `${FileSystem.documentDirectory}Relatorio-Luna.pdf`;
      await FileSystem.copyAsync({
        from: uri,
        to: newUri
      });

      await Sharing.shareAsync(newUri, { 
        UTI: 'com.adobe.pdf', 
        mimeType: 'application/pdf',
        dialogTitle: 'Compartilhar Relatório Luna'
      });
    } catch (error) {
      console.error('Erro ao gerar PDF:', error);
    }
  }
};
