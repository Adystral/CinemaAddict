export default function hourConverter(minutes) {
  const remainder = minutes%60;
  const hour = Math.floor(minutes/60);
  
  return `${hour}h ${remainder}m`;
}