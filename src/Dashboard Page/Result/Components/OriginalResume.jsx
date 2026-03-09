import { useEffect, useState, useRef } from "react";
import { AlertCircle } from "lucide-react";
import { Document, Page, pdfjs } from "react-pdf";
import workerSrc from "pdfjs-dist/build/pdf.worker.min?url";

pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

const OriginalResume = ({ originalResume }) => {
  const [pdfBlobUrl, setPdfBlobUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageWidth, setPageWidth] = useState(600);
  const containerRef = useRef(null);
  const blobUrlRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setPageWidth(containerRef.current.offsetWidth);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setPageNumber(1);
  };

  const onDocumentLoadError = (err) => {
    console.error("❌ React-PDF load error:", err);
    setError(true);
  };

  if (!originalResume?.fileUrl) {
    return <p className="text-center text-gray-500">No resume uploaded.</p>;
  }

  return (
    <div className="space-y-6">
      <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
        <div className="flex items-start">
          <AlertCircle className="text-red-600 mr-3 mt-1" size={25} />
          <div>
            <h1 className="font-semibold text-red-800 text-sm">
              Original Resume (PDF Preview)
            </h1>
            <p className="text-red-700 text-xs mt-1">
              Previewing your uploaded PDF resume.
            </p>
          </div>
        </div>
      </div>

      <div
        ref={containerRef}
        className="w-full p-2 flex flex-col items-center"
      >
        {loading && <p className="text-gray-500 text-sm">Loading PDF...</p>}

        {error && (
          <p className="text-red-500 text-sm">
            Failed to load PDF. Please try again.
          </p>
        )}

        {!loading && !error && pdfBlobUrl && (
          <>
            <Document
              file={pdfBlobUrl}
              onLoadSuccess={onDocumentLoadSuccess}
              onLoadError={onDocumentLoadError}
              loading="Loading PDF..."
            >
              <Page
                pageNumber={pageNumber}
                width={pageWidth}
                renderTextLayer={false}
                renderAnnotationLayer={false}
              />
            </Document>

            {numPages > 1 && (
              <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 mt-4">
                <button
                  onClick={() => setPageNumber((prev) => prev - 1)}
                  disabled={pageNumber <= 1}
                  className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                >
                  Previous
                </button>

                <span className="text-sm">
                  Page {pageNumber} of {numPages}
                </span>

                <button
                  onClick={() => setPageNumber((prev) => prev + 1)}
                  disabled={pageNumber >= numPages}
                  className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default OriginalResume;