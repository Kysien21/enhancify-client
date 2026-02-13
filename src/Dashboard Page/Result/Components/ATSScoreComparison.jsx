import { Download, ArrowLeft, TrendingUp } from "lucide-react";

const ATSScoreComparison = ({ atsScore, onBack, onDownload }) => {
  return (
    <div className="bg-white rounded-lg shadow-[0_4px_8px_rgba(0,0,0,0.1),0_-4px_8px_rgba(0,0,0,0.05),4px_0_8px_rgba(0,0,0,0.05),-4px_0_8px_rgba(0,0,0,0.05)] p-6 mb-6">
      
      {/* Header Buttons */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 px-3 py-2 rounded-lg transition"
            title="Go back"
          >
            <ArrowLeft size={20} />
            <span className="text-sm font-medium">Back</span>
          </button>
        </div>
        <button
          onClick={onDownload}
          className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          <Download size={20} />
          Download Optimized Resume
        </button>
      </div>

      {/* ATS Score Comparison */}
      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4">
          <div className="text-red-600 font-semibold mb-2">
            Original ATS Score
          </div>
          <div className="text-4xl font-bold text-red-700">
            {atsScore.original}%
          </div>
        </div>
        <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
          <div className="text-green-600 font-semibold mb-2">
            Enhanced ATS Score
          </div>
          <div className="text-4xl font-bold text-green-700">
            {atsScore.enhanced}%
          </div>
        </div>
      </div>

      {/* Score Breakdown */}
      <div className="mt-6 space-y-4">
        {atsScore.categories.map((cat, idx) => (
          <div key={idx} className="flex items-center gap-4">
            
            <div className="w-32 text-sm font-medium text-gray-700">
              {cat.name}
            </div>

            <div className="flex-1 flex items-center gap-3">

              {/* ORIGINAL */}
              <div className="flex-1 relative bg-gray-200 rounded-full h-3">
                <div
                  className="bg-red-500 h-3 rounded-full"
                  style={{ width: `${cat.original}%` }}
                />
                <span className="absolute right-0 -top-5 text-xs text-red-600 font-semibold">
                  {cat.original}%
                </span>
              </div>

              <TrendingUp className="text-green-600" size={18} />

              {/* ENHANCED */}
              <div className="flex-1 relative bg-gray-200 rounded-full h-3">
                <div
                  className="bg-green-500 h-3 rounded-full"
                  style={{ width: `${cat.enhanced}%` }}
                />
                <span className="absolute right-0 -top-5 text-xs text-green-600 font-semibold">
                  {cat.enhanced}%
                </span>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ATSScoreComparison;
