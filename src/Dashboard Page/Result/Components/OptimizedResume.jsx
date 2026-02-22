import { useEffect, useState, useRef } from "react";
import { CheckCircle } from "lucide-react";

const OptimizedResume = ({ enhancedResume }) => {
  const [pdfBlobUrl, setPdfBlobUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const blobUrlRef = useRef(null);

  useEffect(() => {
    if (!enhancedResume?.optimizedPdfUrl) {
      setLoading(false);
      return;
    }

    const fetchPdf = async () => {
      try {
        const response = await fetch(enhancedResume.optimizedPdfUrl, {
          credentials: "include",
        });

        if (!response.ok) throw new Error("Failed to fetch PDF");

        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        blobUrlRef.current = url;
        setPdfBlobUrl(url);
      } catch (err) {
        console.error("❌ Failed to load optimized PDF:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPdf();

    return () => {
      if (blobUrlRef.current) {
        URL.revokeObjectURL(blobUrlRef.current);
      }
    };
  }, [enhancedResume?.optimizedPdfUrl]);

  if (!enhancedResume?.optimizedPdfUrl) {
    return (
      <p className="text-center text-gray-500">
        No optimized resume available.
      </p>
    );
  }

  return (
    <div className="space-y-6">
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

      <div className="w-full h-[800px] border rounded-xl overflow-hidden flex items-center justify-center bg-gray-50">
        {loading && (
          <p className="text-gray-500 text-sm">Loading PDF...</p>
        )}
        {error && (
          <p className="text-red-500 text-sm">
            Failed to load PDF. Please try again.
          </p>
        )}
        {!loading && !error && pdfBlobUrl && (
          <iframe
            src={pdfBlobUrl}
            width="100%"
            height="100%"
            title="Optimized Resume PDF"
          />
        )}
      </div>
    </div>
  );
};

export default OptimizedResume;