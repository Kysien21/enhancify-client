import { Link } from "react-router-dom";
import UploadIcon from "../../../assets/Upload.png";
import ResultIcon from "../../../assets/Result.png";

function DashboardSidebar() {
  return (
    <aside>
      <div
        className="fixed z-[100]
                   w-10 xl:w-60
                   h-full bg-[#3b7ce9] text-white
                   pt-[5rem] xl:pt-[6.5rem]
                   transition-all duration-500 ease-in-out"
      >
        <h2
          className="xl:text-[20px] xl:mb-7
                     font-semibold trasition-all duration-500 ease-in-out text-center"
        >
          <span className="hidden md:inline">Dashboard</span>
        </h2>
        <nav>
          <ul
            className="flex flex-col gap-5 xl:gap-4 px-9
                       text-[15px]
                       transition-all duration-400 ease-in-out"
          >
            <li>
              <Link to="/upload" className="flex gap-1 items-center">
                <img src={UploadIcon} alt="Upload" />
                <span className="hidden md:inline">Uploads</span>
              </Link>
            </li>

            <li>
              <Link to="/history" className="flex gap-1 items-center">
                <img src={ResultIcon} alt="History" className="w-5 h-5 " />
                <span className="hidden md:inline">History</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
}

export default DashboardSidebar;
