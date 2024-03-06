const checkMeetingTime = (start, end, meetStart, Duration) => {
  // Получаем время начала и окончания рабочего дня
  let [startHours, startMin] = start.split(':');
  let [endHours, endMin] = end.split(':');

  // Получаем время начала встречи
  let [meetStartHours, meetStartMinutes] = meetStart.split(':');

  // Преобразуем строку в число
  const tranformToNumber = (time) => parseInt(time, 10);

  // Конвертет время в минуты
  const convertToMinutes = (hours, minutes) => hours * 60 + minutes;

  // Преобразования в число
  startHours = tranformToNumber(startHours);
  startMin = tranformToNumber(startMin);
  endHours = tranformToNumber(endHours);
  endMin = tranformToNumber(endMin);
  meetStartHours = tranformToNumber(meetStartHours);
  meetStartMinutes = tranformToNumber(meetStartMinutes);

  // Преобразование в минуты
  const MinutesWorkDayStart = convertToMinutes(startHours, startMin);
  const MinutesWorkDayEnd = convertToMinutes(endHours, endMin);
  const MinutesMeetStart = convertToMinutes(meetStartHours, meetStartMinutes);

  // Получение времени завершения встречи
  const endMeetingTime = MinutesMeetStart + Duration;

  return (
    MinutesMeetStart >= MinutesWorkDayStart &&
    MinutesMeetStart <= MinutesWorkDayEnd &&
    endMeetingTime <= MinutesWorkDayEnd);
};

export { checkMeetingTime };
