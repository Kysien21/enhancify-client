import { useState, useEffect } from "react";
import axios from "axios";
import { useAnimatedProgress } from "./UseAnimatedProgress";

function OneLineProgressChart() {
  const width = 380;
  const height = 20;
  const borderRadius = 5;

  const [jobMatch, setJobMatch] = useState(0); 
  const { progress, getProgressColor } = useAnimatedProgress(jobMatch, 30);
  const progressWidth = (width * progress) / 100;

  useEffect(() => {
    const fetchJobMatch = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/job-match",
          { withCredentials: true }
        );
        setJobMatch(response.data.target);

        setJobMatch(0);
        setTimeout(() => {
          setJobMatch(matchScore);
        }, 200);
      } catch (error) {
        console.error("Failed to fetch job match:", error);
      }
    };

    fetchJobMatch();
  }, []);

  return (
    <section>
      <div className="bg-[#7AD7F0] p-4 flex flex-col items-center rounded-[10px]">
        <svg width={width} height={height}>
          {/* Background bar */}
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

          {/* Percentage text */}
          <text
            x="93%"
            y="75%"
            fill="#000000"
            fontSize="13"
            fontWeight="600"
          >
            {jobMatch}%
          </text>
        </svg>
      </div>
    </section>
  );
}

export default OneLineProgressChart;
