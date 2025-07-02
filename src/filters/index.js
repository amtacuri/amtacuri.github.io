export default function toAgoTime(milliseconds) {
  
  const totalSeconds = Math.floor(milliseconds / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const days =  Math.floor(hours / 24)
  let timeString = '';
  if (days > 0) {
    timeString += `${days} dia`;
    timeString += (days > 1) ? 's' : '';
  } else {
    if (hours > 0) {
      timeString += `${hours} horas `;
    } else {
      if (minutes > 0) {
        timeString += `${minutes} minutos `;
      } else {
        if (seconds > 0) {
          timeString += `${seconds} segundos `;
        }
      }
    }
  }

  return `Hace ${timeString}`;
}