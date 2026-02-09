export default function StatBox ({ label, value }) 
{
    return (
      <div className="flex flex-col items-center justify-center w-full p-4 bg-white border-2 border-blue-500 rounded-2xl shadow-[0_4px_0_0_rgba(59,130,246,0.2)] transition-transform hover:-translate-y-1">
        <span className="text-xs font-bold tracking-wider text-blue-500 uppercase mb-1">
          {label}
        </span>
        
        {/* Value: Large, Heavy, Brown (Matches the username text) */}
        <span className="text-3xl font-black text-[#3E2723]">
          {value}
        </span>
        
      </div>
    );
  };