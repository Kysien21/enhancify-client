import { CheckCircle } from "lucide-react";

const OptimizedResume = ({ enhancedResume }) => {
  if (!enhancedResume?.optimizedPdfUrl) {
    return (
      <p className="text-center text-gray-500">
        No optimized resume available.
      </p>
    );
  }

  return (
    <div className="space-y-6">

      {/* Success Banner */}
      <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
        <div className="flex items-start">
          <CheckCircle className="text-green-600 mr-3 mt-1" size={24} />
          <div>
            <h3 className="font-semibold text-green-800 text-sm">
              ATS-Optimized Resume
            </h3>
            <p className="text-green-700 text-xs mt-1">
              Previewing optimized resume PDF.
            </p>
          </div>
        </div>
      </div>

      {/* PDF Viewer */}
      <div className="w-full h-[800px] border rounded-xl overflow-hidden">
        <iframe
          src={enhancedResume.optimizedPdfUrl}
          width="100%"
          height="100%"
          title="Optimized Resume PDF"
        />
      </div>
    </div>
  );
};

export default OptimizedResume;