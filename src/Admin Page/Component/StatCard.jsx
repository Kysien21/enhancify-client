function StatCard({ value, label }) {
  return (
    <div className="w-full relative">
      <div className="h-30 sm:h-35 lg:h-40 xl:h-30 bg-[#7AD7F0] flex flex-col items-center justify-center pt-4 sm:pt-0 rounded-t-xl">
        <h1 className="text-xl xs:text-2xl sm:text-3xl lg:text-4xl xl:text-3xl mb-1 sm:mb-2 font-semibold">
          {value}
        </h1>
        <h2 className="text-sm xs:text-base sm:text-lg lg:text-xl xl:text-xl px-2 text-center">
          {label}
        </h2>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-2 sm:h-3 xl:h-4 bg-[#1E3A8A]"></div>
    </div>
  );
}

export default StatCard;
