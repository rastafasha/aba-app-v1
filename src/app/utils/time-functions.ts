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
