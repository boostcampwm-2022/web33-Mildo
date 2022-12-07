// eslint-disable-next-line
export const makeTime = (
  populationTime: Date | string,
  type: number
): string | null => {
  if (!populationTime) {
    return null;
  }

  const populationTimeDate: Date = new Date(populationTime);
  const month: number = populationTimeDate.getMonth() + 1;
  const date: number = populationTimeDate.getDate();
  const hour: number = populationTimeDate.getHours();
  const minute: number = populationTimeDate.getMinutes();

  const time =
    type === 0
      ? `${month}월 ${date}일 ${hour}:${minute} 기준`
      : `${month}/${date} ${String(hour).padStart(2, '0')}:${String(
          minute
        ).padStart(2, '0')}`;

  return time;
};
