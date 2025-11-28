function UploadLoading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 md:pl-[16%]">
      <div className="absolute inset-0"></div>
      <div className="relative w-32 h-32 flex items-center justify-center shadow-lg">
        <div className="absolute inset-0 rounded-full bg-amber-500 backdrop-blur-xl"></div>
        <div className="absolute inset-0 animate-spin">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <defs>
              <linearGradient id="loaderGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#4285F4" />
                <stop offset="100%" stopColor="#2CD4A7" />
              </linearGradient>
            </defs>
            <circle
              cx="50"
              cy="50"
              r="30"
              fill="none"
              stroke="url(#loaderGradient)"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray="140 300"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default UploadLoading;
