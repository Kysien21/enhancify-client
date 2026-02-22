import { useEffect, useState, useRef } from "react";
import { AlertCircle } from "lucide-react";

const OriginalResume = ({ originalResume }) => {
  const [pdfBlobUrl, setPdfBlobUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const blobUrlRef = useRef(null);

  useEffect(() => {
    if (!originalResume?.fileUrl) {
      setLoading(false);
      return;
    }

    const fetchPdf = async () => {
      try {
        const response = await fetch(originalResume.fileUrl, {
          credentials: "include",
        });

        if (!response.ok) throw new Error("Failed to fetch PDF");

        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        blobUrlRef.current = url;
        setPdfBlobUrl(url);
      } catch (err) {
        console.error("❌ Failed to load original PDF:", err);
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
  }, [originalResume?.fileUrl]);

  if (!originalResume?.fileUrl) {
    return <p className="text-center text-gray-500">No resume uploaded.</p>;
  }

  return (
    <div className="space-y-6">
      <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-6">
        <div className="flex items-start">
          <AlertCircle className="text-yellow-600 mr-3 mt-1" size={25} />
          <div>
            <h1 className="font-semibold text-yellow-800 text-sm">
              Original Resume (PDF Preview)
            </h1>
            <p className="text-yellow-700 text-xs mt-1">
              Previewing your uploaded PDF resume.
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
            title="Original Resume PDF"
          />
        )}
      </div>
    </div>
  );
};

export default OriginalResume;