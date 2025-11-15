// import { useState, useEffect } from "react";
// import axios from "axios";
// import { useAnimatedProgress } from "./UseAnimatedProgress";

// function ThreeLineProgressChart() {
//   const width = 380;
//   const height = 20;
//   const borderRadius = 5;

//   const [readability, setReadability] = useState(null);

//   const { progress, getProgressColor } = useAnimatedProgress(readability, 30);

//   const progressWidth = (width * progress) / 100;

//   useEffect(() => {
//     const fetchReadability = async () => {
//       try {
//         const response = await axios.get("/api/progress");
//         setReadability(response.data.target);
//       } catch (error) {
//         console.error("Error fetching progress:", error);
//       }
//     };
//     fetchReadability();
//   }, []);

//   return (
//     <section>
//       <div className="bg-[#7AD7F0] p-4 flex flex-col items-center">
//         <svg width={width} height={height}>
//           <rect
//             width={width}
//             height={height}
//             fill="#ffffff"
//             rx={borderRadius}
//             ry={borderRadius}
//           />

//           <rect
//             width={progressWidth}
//             height={height}
//             fill={getProgressColor()}
//             rx={borderRadius}
//             ry={borderRadius}
//           />

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

// export default ThreeLineProgressChart;

import { useState, useEffect } from "react";
import axios from "axios";
import { useAnimatedProgress } from "./UseAnimatedProgress";

function ThreeLineProgressChart({ readabilityScore }) {
  const width = 380;
  const height = 20;
  const borderRadius = 5;

  const { progress, getProgressColor } = useAnimatedProgress(
    readabilityScore || 0,
    30
  );
  const progressWidth = (width * progress) / 100;

  // useEffect(() => {
  //   const fetchReadability = async () => {
  //     try {
  //       const response = await axios.get("/api/progress");
  //       setReadability(response.data.target);
  //     } catch (error) {
  //       console.error("Error fetching progress:", error);
  //     }
  //   };
  //   fetchReadability();
  // }, []);

  return (
    <section>
      <div className="bg-[#7AD7F0] p-4 flex flex-col items-center">
        <text x="0" y="-5" fill="#000000" fontSize="12" fontWeight="500">
          Readability
        </text>
        <svg width={width} height={height}>
          <rect
            width={width}
            height={height}
            fill="#ffffff"
            rx={borderRadius}
            ry={borderRadius}
          />

          <rect
            width={progressWidth}
            height={height}
            fill={getProgressColor()}
            rx={borderRadius}
            ry={borderRadius}
          />

          <text x="93%" y="75%" fill="#000000" fontSize="13" fontWeight="600">
            {progress}%
          </text>
        </svg>
      </div>
    </section>
  );
}

export default ThreeLineProgressChart;
