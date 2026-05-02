interface DataBarProps {
  label: string;
  sublabel?: string;
  value: string;
  percentage: number;
  color?: string;
}

export function DataBar({ label, sublabel, value, percentage, color = '#1e3a8a' }: DataBarProps) {
  return (
    <div className="mb-6">
      <div className="flex items-baseline justify-between mb-2">
        <div>
          <div className="text-sm font-medium text-[#030213]">{label}</div>
          {sublabel && (
            <div className="text-xs text-[#64748b] mt-1">{sublabel}</div>
          )}
        </div>
        <div className="text-sm font-semibold text-[#030213]">{value}</div>
      </div>
      
      <div className="w-full bg-[#e2e8f0] rounded-full h-2 overflow-hidden">
        <div 
          className="h-full rounded-full transition-all duration-500"
          style={{ 
            width: `${percentage}%`,
            backgroundColor: color
          }}
        />
      </div>
    </div>
  );
}
