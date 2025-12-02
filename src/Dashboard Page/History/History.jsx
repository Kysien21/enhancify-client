import { useState } from "react";
import { Eye, Clock } from "lucide-react";
import useGetHistory from "../../hooks/useGetHistory";
import HistoryDetail from "./HistoryDetail";
import DashboardHeader from "../Header and Sidebar/DashboardHeader";
import DasboardSidebar from "../Header and Sidebar/DasboardSidebar";

function History() {
  const { isLoading, data: historyData = [] } = useGetHistory();
  const [selectedHistory, setSelectedHistory] = useState(null);
  
  return (
    <>
      <DashboardHeader />
      <DasboardSidebar />
      {selectedHistory ? (
        <HistoryDetail
          historyData={selectedHistory}
          setHistoryData={setSelectedHistory}
        />
      ) : (
        <section>
          <div className="pt-16 sm:pt-20 xl:pt-24 md:ml-[16%] xl:ml-[15%] 2xl:ml-[16%] min-h-screen">
            <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
              <div className="mb-8 px-5">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                  Optimization History
                </h1>
                <p className="text-gray-600">
                  View all your previous resume optimization records
                </p>
              </div>

              {isLoading && (
                <div className="flex justify-center items-center h-32">
                  <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16"></div>
                </div>
              )}

              {historyData.length === 0 && !isLoading && (
                <div className="rounded-lg shadow-lg p-12 text-center bg-[#3b7ce9]">
                  <p className="text-white text-lg">
                    No previous analyses found. Start optimizing your resume!
                  </p>
                </div>
              )}
              
              {historyData.length > 0 && (
                <div className="bg-white grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-h-[calc(93vh-150px)] overflow-y-auto p-5 mb-5">
                  {historyData.map((entry, index) => {
                    const originalScore = entry.atsScore?.original || 0;
                    const enhancedScore = entry.atsScore?.enhanced || 0;
                    const improvement = enhancedScore - originalScore;

                    // Format date and time
                    // Try timestamp first, fallback to createdAt
                    const entryDate = new Date(entry.timestamp || entry.createdAt);
                    const formattedDate = entryDate.toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    });
                    const formattedTime = entryDate.toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    });

                    // Debug log to check data
                    console.log('Entry:', {
                      timestamp: entry.timestamp,
                      createdAt: entry.createdAt,
                      formattedDate,
                      formattedTime
                    });

                    return (
                      <div
                        key={index}
                        className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                      >
                        <div className="bg-[#3b7ce9] p-3 text-white">
                          <h3 className="font-semibold text-lg">
                            {formattedDate}
                          </h3>
                          {/* ✅ Added Time Display with Icon */}
                          <div className="flex items-center gap-1 mt-1 text-sm opacity-90">
                            <Clock size={14} />
                            <span>{formattedTime}</span>
                          </div>
                        </div>

                        <div className="p-4 space-y-4">
                          <div className="bg-red-50 border-2 border-red-200 rounded-lg p-3">
                            <div className="text-red-600 font-semibold text-sm mb-1">
                              Original ATS Score
                            </div>
                            <div className="text-2xl font-bold text-red-700">
                              {originalScore}%
                            </div>
                          </div>

                          <div className="bg-green-50 border-2 border-green-200 rounded-lg p-3">
                            <div className="text-green-600 font-semibold text-sm mb-1">
                              Enhanced ATS Score
                            </div>
                            <div className="text-2xl font-bold text-green-700">
                              {enhancedScore}%
                            </div>
                          </div>

                          <button
                            onClick={() => {
                              console.log("Selected entry:", entry);
                              setSelectedHistory(entry);
                            }}
                            className="w-full mt-3 flex items-center justify-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 active:scale-95 transition font-medium cursor-pointer"
                          >
                            <Eye size={18} />
                            View Details
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default History;