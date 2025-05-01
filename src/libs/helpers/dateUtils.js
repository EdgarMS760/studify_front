import dayjs from 'dayjs';

/**
 * Convierte una fecha UTC en una fecha local y la formatea.
 * @param {string} utcDate - La fecha en formato UTC (ej: "2025-04-27T03:00:00.000Z")
 * @param {string} format - El formato de salida deseado (por defecto "DD/MM/YYYY HH:mm")
 * @returns {string} La fecha convertida a hora local y formateada.
 */
export function formatDateToLocal(utcDate, format = 'DD/MM/YYYY HH:mm') {
  if (!utcDate) return '';
  
  return dayjs(utcDate).local().format(format);
}
