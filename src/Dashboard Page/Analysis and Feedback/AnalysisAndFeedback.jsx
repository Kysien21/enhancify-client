// import CircularProgressChart from "./Components/CircularProgressChart";
// import OneLineProgressChart from "./Components/OneLineProgressChart";
// import TwoLineProgressChart from "./Components/TwoLineProgressChart";
// import ThreeLineProgressChart from "./Components/ThreeLineProgressChart";
// import { useEffect, useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import axios from "axios";

// function AnalysisAndFeedback() {
//   const [feedback, setFeedback] = useState("Loading...");
//   const navigate = useNavigate();
//   const location = useLocation();

//   useEffect(() => {
//     const fetchFeedback = async () => {
//       try {
//         const response = await axios.get("http://localhost:3000/api/feedback", {
//           withCredentials: true
//         });
//         setFeedback(response.data.comment || "No feedback provided.");
//       } catch (error) {
//         console.error(error);
//         setFeedback("Unable to fetch feedback.");
//       }
//     };
//     fetchFeedback();
//   }, []);

//   const handleBack = () => {
//     // Navigate back to upload page
//     navigate("/upload");
//   };

//   const handleEnhancify = () => {
//     // Navigate to enhance page
//     navigate("/enhance");
//   };

//   return (
//     <main>
//       <div
//         className="fixed top-[4rem] xl:top-[6rem] left-[4rem] xl:left-[18.5rem]
//                    w-[82%] xl:w-[77.5%] h-[15rem] xl:h-[38rem]
//                    bg-[#eef3fb] border-2 border-[#2979ff] rounded-[10px]
//                    flex flex-col items-center
//                    transition-all duration-500 ease-in-out"
//       >
//         <div className="w-full justify-evenly flex items-center my-10">
//           <CircularProgressChart />
//           <div className="flex gap-6 items-center flex-col">
//             <OneLineProgressChart />
//             <TwoLineProgressChart />
//             <ThreeLineProgressChart />
//           </div>
//         </div>

//         <div className="w-[60rem] bg-white h-[10rem] rounded-[10px] p-4 overflow-y-auto">
//           <p className="text-gray-700 text-center">{feedback}</p>
//         </div>

//         <div className="flex gap-6 mt-4">
//           <button
//             onClick={handleBack}
//             className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
//           >
//             Back to Upload
//           </button>
//           <button
//             onClick={handleEnhancify}
//             className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//           >
//             Enhancify
//           </button>
//         </div>
//       </div>
//     </main>
//   );
// }

// export default AnalysisAndFeedback;

import CircularProgressChart from "./Components/CircularProgressChart";
import OneLineProgressChart from "./Components/OneLineProgressChart";
import TwoLineProgressChart from "./Components/TwoLineProgressChart";
import ThreeLineProgressChart from "./Components/ThreeLineProgressChart";

function AnalysisAndFeedback({ onClose, analysisData }) {
  console.log("Analysis Data in AnalysisAndFeedback:", analysisData);

  return (
    <main>
      <section>
        <div
          className="fixed top-[4rem] xl:top-[6rem] left-[4rem] xl:left-[18.5rem]
                     w-[82%] xl:w-[77.5%] h-[15rem] xl:h-[38rem]
                     bg-[#eef3fb] border-2 border-[#2979ff] rounded-[10px]
                     flex flex-col items-center 
                     transition-all duration-500 ease-in-out"
        >
          {/* X button */}
          <button
            onClick={onClose} // <-- call the function passed as prop
            className="absolute top-3 right-3 text-white bg-red-500 hover:bg-red-600 px-3 py-1 rounded-full font-bold"
          >
            ✕
          </button>

          <div className="w-full justify-evenly flex items-center my-10">
            <CircularProgressChart
              overallScore={analysisData?.overallScore || 0}
            />

            <div className="flex gap-6 items-center flex-col">
              <OneLineProgressChart
                jobMatchScore={analysisData?.jobMatchScore || 0}
              />
              <TwoLineProgressChart
                atsCompatibilityScore={analysisData?.atsCompatibilityScore || 0}
              />
              <ThreeLineProgressChart
                readabilityScore={analysisData?.readabilityScore || 0}
              />
            </div>
          </div>

          <div className="w-[60rem] bg-white h-[10rem] rounded-[10px] p-4 overflow-y-auto">
            {/* <p className="text-gray-700 text-center">{feedback}</p> */}
            <p className="text-gray-700 text-center">
              {analysisData?.briefSummary || "No feedback available."}
            </p>
          </div>

          <div className="flex gap-6 mt-4">
            <button
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              // onClick={() => navigate("/upload")}
            >
              Back to Upload
            </button>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              // onClick={handleEnhancifyClick}
            >
              Enhancify
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

export default AnalysisAndFeedback;
