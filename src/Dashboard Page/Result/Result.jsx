import { useEffect, useState } from "react";
import axios from "axios";

import DashboardHeader from "../Header and Sidebar/Header/DashboardHeader";
import DashboardSidebar from "../Header and Sidebar/Sidebar/DasboardSidebar";
import RightArrowIcon from "../../assets/right arrow.png";

function Result() {
  const [originalResume, setOriginalResume] = useState("");
  const [optimizedResume, setOptimizedResume] = useState("");
  const [editing, setEditing] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchOriginal = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/original", {
          withCredentials: true,
        });
        setOriginalResume(response.data.original || "No original resume found.");
      } catch (error) {
        console.error("Failed to fetch original resume:", error);
        setOriginalResume("Error loading original resume.");
      }
    };

    const fetchOptimized = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/optimized", {
          withCredentials: true,
        });
        setOptimizedResume(response.data.resume || "No optimized resume found.");
      } catch (error) {
        console.error("Failed to fetch optimized resume:", error);
        setOptimizedResume("Error loading optimized resume.");
      }
    };

    fetchOriginal();
    fetchOptimized();
  }, []);

  const handleEditToggle = () => {
    setEditing(!editing);
  };

  const handleOptimizedChange = (e) => {
    setOptimizedResume(e.target.value);
  };

  return (
    <main>
      <DashboardHeader />
      <DashboardSidebar />
      <section>
        <div
          className="fixed top-[4rem] xl:top-[6rem] left-[4rem] xl:left-[18.5rem]
                     w-[82%] xl:w-[77.5%] h-[15rem] xl:h-[38rem]
                     bg-[#eef3fb] border-2 border-[#2979ff] rounded-[10px]
                     flex flex-col items-center
                     transition-all duration-500 ease-in-out pt-8"
        >
          <div className="flex w-full justify-around mb-3 items-center relative">
            <h2>Original Resume</h2>
            <h2>Optimize Resume</h2>
            <button
              className="absolute right-40 xl:px-[1rem] py-[5px] text-[7px] xl:text-[13px] font-semibold text-white
                         bg-[#133970] cursor-pointer
                         transition-all duration-500 ease-in-out"
              onClick={handleEditToggle}
            >
              {editing ? "Save" : "Edit"}
            </button>
          </div>

          <div className="w-full flex justify-around items-center mb-15 relative">
            <div className="w-[21rem] h-[25rem] bg-[#a6a6a6] p-2 text-[10px] overflow-auto whitespace-pre-wrap">
              {originalResume}
            </div>

            <img
              className="absolute w-[6rem] h-[6rem]"
              src={RightArrowIcon}
              alt="Next Page"
            />

            <div className="w-[21rem] h-[25rem] bg-[#a6a6a6] p-2 text-[10px]">
              {editing ? (
                <textarea
                  value={optimizedResume}
                  onChange={handleOptimizedChange}
                  className="w-full h-full bg-[#ffff] text-[10px] p-1"
                />
              ) : (
                <pre className="whitespace-pre-wrap">{optimizedResume}</pre>
              )}
            </div>
          </div>

          <div className="flex gap-10">
            <button className="xl:px-[2.5rem] py-[5px] text-[7px] xl:text-[13px] font-semibold text-white
                               bg-[#133970] cursor-pointer
                               transition-all duration-500 ease-in-out">
              Back to Upload
            </button>
            <button
              onClick={() => setModalOpen(true)}
              className="xl:px-[2.5rem] py-[5px] text-[7px] xl:text-[13px] font-semibold text-white
                         bg-[#133970] cursor-pointer
                         transition-all duration-500 ease-in-out"
            >
              Next
            </button>
          </div>
        </div>

        {/* Modal */}
        {modalOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center"
            onClick={() => setModalOpen(false)} // close modal when clicking outside
          >
            <div
              className="fixed top-[4rem] xl:top-[6rem] left-[4rem] xl:left-[18.5rem]
                     w-[82%] xl:w-[77.5%] h-[15rem] xl:h-[38rem]
                     bg-[#eef3fb] border-2 border-[#2979ff] rounded-[10px]
                     flex flex-col items-center justify-center
                     transition-all duration-500 ease-in-out"
              onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
            >

              <div className="w-[21rem] h-[25rem] bg-[#a6a6a6] p-2 text-[10px]">
        {optimizedResume}
              </div>

              <button
                onClick={() => setModalOpen(false)}
                className="absolute top-3 right-3 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-full"
              >
                ✕
              </button>

            </div>
          </div>
        )}
      </section>
    </main>
  );
}

export default Result;
