import { AlertCircle } from "lucide-react";

const OriginalResume = ({ originalResume }) => {
  if (!originalResume?.fileUrl) {
    return <p className="text-center text-gray-500">No resume uploaded.</p>;
  }

  const officeViewerUrl = `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(
    originalResume.fileUrl
  )}`;

  return (
    <div className="space-y-6">

      {/* Warning Banner */}
      <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-6">
        <div className="flex items-start">
          <AlertCircle className="text-yellow-600 mr-3 mt-1" size={25} />
          <div>
            <h1 className="font-semibold text-yellow-800 text-sm">
              Original Resume (Word Preview)
            </h1>
            <p className="text-yellow-700 text-xs mt-1">
              Previewing uploaded Word document.
            </p>
          </div>
        </div>
      </div>

      {/* Word Viewer */}
      <div className="w-full h-[800px] border rounded-xl overflow-hidden">
        <iframe
          src={officeViewerUrl}
          width="100%"
          height="100%"
          frameBorder="0"
          title="Word Resume Preview"
        />
      </div>
    </div>
  );
};

export default OriginalResume;