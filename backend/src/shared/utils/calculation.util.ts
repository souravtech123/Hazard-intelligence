export const clamp = (
  value: number,
  min: number,
  max: number
): number => {
  return Math.min(Math.max(value, min), max);
};

export const round = (
  value: number,
  decimals: number = 2
): number => {
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
};

export const normalize = (
  value: number,
  min: number,
  max: number
): number => {
  if (max === min) return 0;

  return (value - min) / (max - min);
};