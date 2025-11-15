import { useState } from "react";
import { Eye } from "lucide-react";
import DashboardHeader from "../Header and Sidebar/Header/DashboardHeader";
import DashboardSidebar from "../Header and Sidebar/Sidebar/DasboardSidebar";
import useGetHistory from "./useGetHistory";
import HistoryDetail from "./HistoryDetail";
const MOCK_HISTORY = [
  {
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    enhancedResume: {
      contact: {
        name: "Joana Mae Gallardo",
      },
    },
    atsScore: {
      original: 42,
      enhanced: 88,
    },
  },
  {
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    enhancedResume: {
      contact: {
        name: "John Smith",
      },
    },
    atsScore: {
      original: 55,
      enhanced: 92,
    },
  },
  {
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    enhancedResume: {
      contact: {
        name: "Maria Garcia",
      },
    },
    atsScore: {
      original: 38,
      enhanced: 81,
    },
  },
  {
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    enhancedResume: {
      contact: {
        name: "David Chen",
      },
    },
    atsScore: {
      original: 61,
      enhanced: 89,
    },
  },
  {
    createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    enhancedResume: {
      contact: {
        name: "Sarah Johnson",
      },
    },
    atsScore: {
      original: 45,
      enhanced: 85,
    },
  },
  {
    createdAt: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString(),
    enhancedResume: {
      contact: {
        name: "Michael Brown",
      },
    },
    atsScore: {
      original: 52,
      enhanced: 87,
    },
  },
];

function History() {
  const { isLoading, historyData } = useGetHistory();
  const [selectedHistory, setSelectedHistory] = useState(null);
  // const [historyData, setHistoryData] = useState([]);

  // useEffect(() => {
  //   const stored = JSON.parse(localStorage.getItem("history")) || [];
  //   // Use stored data if available, otherwise use mock data
  //   const data = stored.length > 0 ? stored : MOCK_HISTORY;
  //   setHistoryData(data.reverse());
  // }, []);

  return (
    <>
      <DashboardHeader />
      <DashboardSidebar />
      {selectedHistory ? (
        <HistoryDetail
          historyData={selectedHistory}
          setHistoryData={setSelectedHistory}
        />
      ) : (
        <section className="ml-[22%] mr-8 mb-4  bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-lg ">
          <div className="max-w-6xl mt-[50px]">
            <div className="mb-8">
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
              <div className="bg-white rounded-lg shadow-lg p-12 text-center">
                <p className="text-gray-500 text-lg">
                  No previous analyses found. Start optimizing your resume!
                </p>
              </div>
            )}
            {historyData.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-h-[calc(90vh-150px)] overflow-y-auto pr-4">
                {historyData.map((entry, index) => {
                  const originalScore = entry.atsScore?.original || 0;
                  const enhancedScore = entry.atsScore?.enhanced || 0;
                  const improvement = enhancedScore - originalScore;

                  return (
                    <div
                      key={index}
                      className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow overflow-hidden"
                    >
                      <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 p-4 text-white">
                        <h3 className="font-semibold text-lg truncate">
                          {new Date(entry.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            }
                          )}
                        </h3>
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
                          className="w-full mt-3 flex items-center justify-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition font-medium"
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
        </section>
      )}
    </>
  );
}

export default History;
