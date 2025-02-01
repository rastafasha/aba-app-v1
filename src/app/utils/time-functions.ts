export const convertToMinutes = (time: string): number => {
  if (!time || !time.includes(':')) {
    // console.error(`Invalid time format: ${time}`);
    return 0; // O manejar el error de otra manera
  }

  const [hours, minutes] = time.split(':').map(Number);

  // Validar que hours y minutes sean números válidos
  if (
    isNaN(hours) ||
    isNaN(minutes) ||
    hours < 0 ||
    minutes < 0 ||
    minutes >= 60
  ) {
    // console.error(`Invalid time values: hours=${hours}, minutes=${minutes}`);
    return 0; // O manejar el error de otra manera
  }

  return hours * 60 + minutes;
}


export const convertToHours = (totalMinutes: number): string => {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours}h ${minutes}m`;
}

export function calculateTimeDifference(startTime: string, endTime: string, append = ''): string {
  if (!startTime || !endTime) {
    return '';
  }
  // Normalize the time format by adding seconds if not present
  const normalizeTime = (time: string) => time.includes(':') ?
    (time.split(':').length === 2 ? `${time}:00` : time) :
    `${time}:00:00`;

  const start = normalizeTime(startTime);
  const end = normalizeTime(endTime);

  // Convert times to minutes
  const getMinutes = (time: string) => {
    const [hours, minutes, seconds] = time.split(':').map(Number);
    return hours * 60 + minutes + (seconds || 0) / 60;
  };

  // Calculate difference in minutes
  const diffMinutes = getMinutes(end) - getMinutes(start);

  // Convert back to HH:mm:ss format
  const hours = Math.floor(diffMinutes / 60);
  const minutes = Math.floor(diffMinutes % 60);
  // const seconds = Math.round((diffMinutes % 1) * 60);

  // Format with leading zeros
  // const pad = (num: number) => num.toString().padStart(2, '0');

  return `${hours}h ${minutes}m ${append}`.trim();
}


export function calculateUnitsFromTime(startTime: string, endTime: string): number {
  if (!startTime || !endTime) return 0;
  const start = parseTime(startTime);
  const end = parseTime(endTime);
  if (!start || !end) return 0;
  const durationMinutes = (end.getTime() - start.getTime()) / (1000 * 60);
  return Math.ceil(durationMinutes / 15);
}


export function parseTime(timeStr: string): Date | null {
  if (!timeStr) return null;
  const [hours, minutes] = timeStr.split(':').map(Number);
  const date = new Date();
  date.setHours(hours, minutes, 0, 0);
  return date;
}
