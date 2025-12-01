
import { Link } from "react-router-dom";


function ProfileSidebar() {

  return (
    <>
      <aside>
        
        <div className="h-full w-55 bg-[#3b7ce9] pt-30 rounded-l-lg">
                      <nav> 
            <ul
              className="flex flex-col gap-5 xl:gap-4 px-9 text-[15px]
                         transition-all duration-400 ease-in-out"
            >
              <li>
                <Link
                  to="/upload"
                  className="flex gap-2 items-center hover:opacity-80 text-white text-lg"
                >
                  Edit Profile
                </Link>
              </li>

              <li>
                <Link
                  to="/history"
                  className="flex gap-2 items-center hover:opacity-80 text-white text-lg"
                >
                  Delete Account
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </aside>
    </>
  );
}

export default ProfileSidebar;
