// import { useState, useEffect } from "react";
// import axios from "axios";
// import { useAnimatedProgress } from "./UseAnimatedProgress";

// function TwoLineProgressChart() {
//   const width = 380;
//   const height = 20;
//   const borderRadius = 5;

//   const [ats, setAts] = useState(null);

//   // Use mock ATS score of 75 if ats is null
//   const displayAts = ats !== null ? ats : 75;

//   const { progress, getProgressColor } = useAnimatedProgress(displayAts, 30);

//   const progressWidth = (width * progress) / 100;

//   useEffect(() => {
//     const fetchAts = async () => {
//       try {
//         const response = await axios.get("/api/progress");
//         setAts(response.data.target);
//       } catch (error) {
//         console.error("Error fetching ATS score:", error);
//       }
//     };
//     fetchAts();
//   }, []);

//   return (
//     <section>
//       <div className="bg-[#7AD7F0] p-4 flex flex-col items-center">
//         <svg width={width} height={height}>
//           {/* Background bar */}
//           <rect
//             width={width}
//             height={height}
//             fill="#ffffff"
//             rx={borderRadius}
//             ry={borderRadius}
//           />
//           {/* Progress bar */}
//           <rect
//             width={progressWidth}
//             height={height}
//             fill={getProgressColor()}
//             rx={borderRadius}
//             ry={borderRadius}
//           />
//           {/* Label text */}
//           <text
//             x="93%"
//             y="75%"
//             fill="#000000"
//             fontSize="13"
//             fontWeight="600"
//           >
//             {progress}%
//           </text>
//         </svg>
//       </div>
//     </section>
//   );
// }

// export default TwoLineProgressChart;

import { useState, useEffect } from "react";
import axios from "axios";
import { useAnimatedProgress } from "./UseAnimatedProgress";

function TwoLineProgressChart({ atsCompatibilityScore }) {
  const width = 380;
  const height = 20;
  const borderRadius = 5;

  // const [ats, setAts] = useState(null);

  // const displayAts = ats !== null ? ats : 75;

  const { progress, getProgressColor } = useAnimatedProgress(
    atsCompatibilityScore || 0,
    30
  );

  const progressWidth = (width * progress) / 100;

  // useEffect(() => {
  //   const fetchAts = async () => {
  //     try {
  //       const response = await axios.get("/api/progress");
  //       setAts(response.data.target);
  //     } catch (error) {
  //       console.error("Error fetching ATS score:", error);
  //     }
  //   };
  //   fetchAts();
  // }, []);

  // return () => clearInterval(interval); // cleanup
  // }, [targetPercentage]);

  return (
    <section>
      <div className="bg-[#7AD7F0] p-4 flex flex-col items-center">
        <text x="0" y="-5" fill="#000000" fontSize="12" fontWeight="500">
          ATS Compatibility
        </text>
        <svg width={width} height={height}>
          {/* Background bar */}
          <rect
            width={width}
            height={height}
            fill="#ffffff"
            rx={borderRadius}
            ry={borderRadius}
          />
          {/* Progress bar */}
          <rect
            width={progressWidth}
            height={height}
            fill={getProgressColor()}
            rx={borderRadius}
            ry={borderRadius}
          />
          {/* Label text */}
          <text x="93%" y="75%" fill="#000000" fontSize="13" fontWeight="600">
            {progress}%
          </text>
        </svg>
      </div>
    </section>
  );
}

export default TwoLineProgressChart;
