export const formatNumber = (
  value: number,
  decimals = 0
): string => {
  return new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
};

export const formatPercentage = (
  value: number,
  decimals = 1
): string => {
  return `${value.toFixed(decimals)}%`;
};

export const formatDate = (
  value: string | Date
): string => {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
};