interface ClassHeaderProps {
  name: string;
  category: string;
  id: string;
}

export function ClassHeader({
  name,
  category,
  id,
}: {
  name: string;
  category: string;
  id: string;
}) {
  return (
    <div className="bg-linear-to-r from-[#0E4BA9] to-blue-600 p-5 sm:p-8 text-white rounded-xl sm:rounded-2xl flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
      <div className="flex-1 text-center sm:text-left">
        <div className="text-2xl sm:text-4xl font-bold">{name}</div>
        <p className="text-blue-100 text-base sm:text-lg">{category}</p>
      </div>

      <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg text-center">
        <p className="text-xs sm:text-sm font-medium">Class ID</p>
        <p className="text-lg sm:text-xl font-bold">{id}</p>
      </div>
    </div>
  );
}
