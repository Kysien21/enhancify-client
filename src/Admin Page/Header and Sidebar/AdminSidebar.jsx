import { Link } from "react-router-dom";

function AdminSidebar() {
  return (
    <aside>
      <div className="fixed xl:w-60 xl:h-full bg-[#3B7CE9] justify-center flex xl:pt-30">
        <nav>
          <ul
            className="flex flex-col xl:gap-10 text-[15px]
                         transition-all duration-400 ease-in-out"
          >
            <li>
              <Link to="/home" className="">
                <span className="xl:text-[16px] text-white tracking-wide cursor-pointer">
                  Home/Overview
                </span>
              </Link>
            </li>

            <li>
              <Link
                to="/User"
                className="xl:text-[16px] text-white tracking-wide cursor-pointer"
              >
                <span>User Management</span>
              </Link>
            </li>
            <li>
              <Link
                to="/report"
                className="xl:text-[16px] text-white tracking-wide cursor-pointer"
              >
                <span>Reports and Analytics</span>
              </Link>
            </li>
            <li>
              <Link
                to="/system"
                className="xl:text-[16px] text-white tracking-wide cursor-pointer"
              >
                <span>System Management</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
}

export default AdminSidebar;
