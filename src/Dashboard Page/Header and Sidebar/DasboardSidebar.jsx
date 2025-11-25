import { useState } from "react";
import UploadIcon from "../../assets/Upload.png";
import ResultIcon from "../../assets/Result.png";
import { Link } from "react-router-dom";


function DasboardSidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className="md:hidden fixed top-15 left-4 z-20 bg-[#3b7ce9] p-2 rounded text-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="space-y-1">
          <span className="block w-6 h-0.5 bg-white"></span>
          <span className="block w-6 h-0.5 bg-white"></span>
          <span className="block w-6 h-0.5 bg-white"></span>
        </div>
      </button>

      <aside>
        <div
          className={`fixed z-15
                      bg-[#3b7ce9] text-white h-full
                      pt-24
                      transition-all duration-500 ease-in-out
                      w-40 lg:w-40 xl:w-60

                      ${isOpen ? "left-0" : "-left-40"}
                      md:left-0
                    `}
        >
          <h2
            className="text-[20px] mb-7 font-semibold text-center
                       transition-all duration-500 ease-in-out"
          >
            Dashboard
          </h2>

          <nav>
            <ul
              className="flex flex-col gap-5 xl:gap-4 px-9 text-[15px]
                         transition-all duration-400 ease-in-out"
            >
              <li>
                <Link
                  to="/upload"
                  className="flex gap-2 items-center hover:opacity-80"
                >
                  <img src={UploadIcon} alt="Upload" className="w-5 h-5" />
                  <span className=" md:inline">Uploads</span>
                </Link>
              </li>

              <li>
                <Link
                  to="/history"
                  className="flex gap-2 items-center hover:opacity-80"
                >
                  <img src={ResultIcon} alt="History" className="w-5 h-5" />
                  <span className="md:inline">History</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </aside>
    </>
  );
}

export default DasboardSidebar;
