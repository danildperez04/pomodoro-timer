export function formatTime(time: number) {
  return time > 9 ? String(time) : `0${time}`;
}