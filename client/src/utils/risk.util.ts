export const getRiskColor = (level: string): string => {
  const colors: Record<string, string> = {
    LOW: "text-green-600",
    MODERATE: "text-yellow-600",
    HIGH: "text-orange-600",
    VERY_HIGH: "text-red-600",
    CRITICAL: "text-red-800",
    MEDIUM: "text-yellow-600",
  };
  return colors[level] ?? "text-gray-600";
};

export const getRiskBgColor = (level: string): string => {
  const colors: Record<string, string> = {
    LOW: "bg-green-100",
    MODERATE: "bg-yellow-100",
    HIGH: "bg-orange-100",
    VERY_HIGH: "bg-red-100",
    CRITICAL: "bg-red-200",
    MEDIUM: "bg-yellow-100",
  };
  return colors[level] ?? "bg-gray-100";
};
