// import { useEffect, useState } from "react";
// import axios from "axios";

// function CircularProgressChart() {
//   const radius = 55;
//   const strokeWidth = 18;
//   const size = 215;
//   const center = 110;

//   const [percentage, setPercentage] = useState(0); // current displayed percentage
//   const [targetPercentage, setTargetPercentage] = useState(0); // target fetched from API

//   const circumference = 2 * Math.PI * radius;
//   const offset = circumference - (percentage / 100) * circumference;

//   // Fetch score from API
//   const fetchScore = async () => {
//     try {
//       const response = await axios.get("http://localhost:3000/api/score", {
//         withCredentials: true,
//       });
//       if (response.data && response.data.score) {
//         setTargetPercentage(response.data.score);
//       }
//     } catch (error) {
//       console.error("Failed to fetch score:", error);
//     }
//   };

//   // Animate the progress bar
//   useEffect(() => {
//     fetchScore();
//   }, []);

//   useEffect(() => {
//     let interval = null;
//     if (percentage < targetPercentage) {
//       interval = setInterval(() => {
//         setPercentage((prev) => {
//           if (prev >= targetPercentage) {
//             clearInterval(interval);
//             return targetPercentage;
//           }
//           return prev + 1; // increment by 1% per tick
//         });
//       }, 20); // 20ms per tick → smooth animation
//     }
//     return () => clearInterval(interval); // cleanup
//   }, [targetPercentage]);

//   return (
//     <section>
//       <div className="bg-[#7AD7F0] w-[26rem] h-[13.5rem] rounded-[20px]">
//         <h1 className="text-center text-[#143A71] font-semibold relative top-[10px]">
//           Overall Score:
//         </h1>
//         <div className="relative flex items-center justify-center mt-2">
//           <svg width={size} height={size} className="rotate-[-90deg]">
//             {/* Background circle */}
//             <circle
//               stroke="#ffff"
//               strokeWidth={strokeWidth}
//               fill="transparent"
//               r={radius}
//               cx={center}
//               cy={center}
//             />

//             {/* Progress circle */}
//             <circle
//               stroke="#3b7ce9"
//               strokeWidth={strokeWidth}
//               fill="transparent"
//               r={radius}
//               cx={center}
//               cy={center}
//               strokeDasharray={circumference}
//               strokeDashoffset={offset}
//               strokeLinecap="round"
//             />
//           </svg>

//           {/* Percentage text */}
//           <div className="absolute text-black text-[25px] font-semibold">
//             {percentage}%
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default CircularProgressChart;

import { useEffect, useState } from "react";
import axios from "axios";

function CircularProgressChart({ overallScore }) {
  const radius = 55;
  const strokeWidth = 18;
  const size = 215;
  const center = 110;

  const [percentage, setPercentage] = useState(0);
  const [targetPercentage, setTargetPercentage] = useState(overallScore);

  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  useEffect(() => {
    let interval = null;
    if (percentage < targetPercentage) {
      interval = setInterval(() => {
        setPercentage((prev) => {
          if (prev >= targetPercentage) {
            clearInterval(interval);
            return targetPercentage;
          }
          return prev + 1; // increment by 1% per tick
        });
      }, 20); // 20ms per tick → smooth animation
    }
    return () => clearInterval(interval); // cleanup
  }, [targetPercentage]);

  return (
    <section>
      <div className="bg-[#7AD7F0] w-[26rem] h-[13.5rem] rounded-[20px]">
        <h1 className="text-center text-[#143A71] font-semibold relative top-[10px]">
          Overall Score:
        </h1>
        <div className="relative flex items-center justify-center mt-2">
          <svg width={size} height={size} className="rotate-[-90deg]">
            {/* Background circle */}
            <circle
              stroke="#ffff"
              strokeWidth={strokeWidth}
              fill="transparent"
              r={radius}
              cx={center}
              cy={center}
            />

            {/* Progress circle */}
            <circle
              stroke="#3b7ce9"
              strokeWidth={strokeWidth}
              fill="transparent"
              r={radius}
              cx={center}
              cy={center}
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
            />
          </svg>

          {/* Percentage text */}
          <div className="absolute text-black text-[25px] font-semibold">
            {overallScore}%
          </div>
        </div>
      </div>
    </section>
  );
}

export default CircularProgressChart;
