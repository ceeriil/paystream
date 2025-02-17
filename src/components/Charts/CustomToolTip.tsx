export const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const { name, value, color } = payload[0];
    return (
      <div
        className="p-2 bg-[#1F1F1F]  rounded-lg shadow-lg text-sm font-medium text-center border border-[#ffffff30]"
        style={{ borderLeft: `4px solid ${color}` }}>
        <p>{name}</p>
        <p className="font-bold text-xl mt-1">{value.toLocaleString()}</p>
      </div>
    );
  }

  return null;
};
