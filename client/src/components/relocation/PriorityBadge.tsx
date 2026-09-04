interface PriorityBadgeProps {
  priority: "HIGH" | "MEDIUM" | "LOW";
}

const PriorityBadge = ({ priority }: PriorityBadgeProps) => {
  const styles = {
    HIGH: "bg-red-100 text-red-700",
    MEDIUM: "bg-yellow-100 text-yellow-700",
    LOW: "bg-green-100 text-green-700",
  };

  return (
    <span
      className={`px-2.5 py-1 rounded-full text-xs font-semibold ${styles[priority]}`}
    >
      {priority}
    </span>
  );
};

export default PriorityBadge;