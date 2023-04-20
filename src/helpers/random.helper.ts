export const getRandomBetween = (min: number, max: number): number => {
  return min + (max - min) * Math.random();
};
