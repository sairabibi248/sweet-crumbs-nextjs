type StatsCardProps = {
  label: string;
  value: number;
  color: string;
};

const StatsCard = ({ label, value, color }: StatsCardProps) => {
  return (
    <div className={`rounded-xl border p-5 transition-transform duration-300 hover:scale-105 hover:shadow-md ${color}`}>
      <p className="text-xs font-bold uppercase text-[#7a5c43]">{label}</p>
      <p className="mt-3 text-3xl font-bold text-[#4a2c11]">
        {value} <p className="text-sm font-normal text-[#7a5c43]">items</p>
      </p>
    </div>
  );
};

export default StatsCard;