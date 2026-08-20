/**
 * dateUtils.ts
 * Utilitários de data sem dependências externas (Date Nativo) para manter o projeto leve e offline.
 * Todas as funções assumem que o input é um objeto Date ou string no formato 'YYYY-MM-DD'.
 */

export const formatDate = (date: Date | string, formatString: string = 'YYYY-MM-DD'): string => {
  const d = typeof date === 'string' ? parseISOLocal(date) : date;
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');

  return formatString
    .replace('YYYY', String(year))
    .replace('MM', month)
    .replace('DD', day);
};

export const parseISOLocal = (isoString: string): Date => {
  // Parsing 'YYYY-MM-DD' considering local timezone to avoid off-by-one errors
  const [year, month, day] = isoString.split('T')[0].split('-');
  return new Date(Number(year), Number(month) - 1, Number(day));
};

export const isSameDay = (date1: Date | string, date2: Date | string): boolean => {
  const d1 = typeof date1 === 'string' ? parseISOLocal(date1) : date1;
  const d2 = typeof date2 === 'string' ? parseISOLocal(date2) : date2;
  
  return d1.getFullYear() === d2.getFullYear() &&
         d1.getMonth() === d2.getMonth() &&
         d1.getDate() === d2.getDate();
};

export const differenceInDays = (date1: Date | string, date2: Date | string): number => {
  const d1 = typeof date1 === 'string' ? parseISOLocal(date1) : date1;
  const d2 = typeof date2 === 'string' ? parseISOLocal(date2) : date2;

  // Reset time to start of day for accurate calculation
  const start1 = new Date(d1.getFullYear(), d1.getMonth(), d1.getDate());
  const start2 = new Date(d2.getFullYear(), d2.getMonth(), d2.getDate());

  const msPerDay = 1000 * 60 * 60 * 24;
  return Math.floor((start1.getTime() - start2.getTime()) / msPerDay);
};

export const addDays = (date: Date | string, days: number): Date => {
  const d = typeof date === 'string' ? parseISOLocal(date) : new Date(date);
  d.setDate(d.getDate() + days);
  return d;
};

export const startOfDay = (date: Date | string): Date => {
  const d = typeof date === 'string' ? parseISOLocal(date) : new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
};

export const endOfDay = (date: Date | string): Date => {
  const d = typeof date === 'string' ? parseISOLocal(date) : new Date(date);
  d.setHours(23, 59, 59, 999);
  return d;
};

export const generateId = (): string => {
  // Fallback ID generator if uuid is not available
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};
