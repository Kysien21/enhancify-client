import LogoIcon from "../../assets/Logo.png";

function DashboardHeader() {

  return (
    <header>
      <div
        className="bg-white fixed z-30 w-full transition-all duration-500 ease-in-out 
                   text-[#133970] h-10 sm:h-13 2xl:h-15 flex items-center justify-between shadow-md px-3 sm:px-10"
      >
        <div className="flex items-center gap-1">
          <img src={LogoIcon} alt="Logo" className="w-7 sm:w-10" />
          <h3 className="text-[11px] sm:text-[15px]">Enhancify.AI</h3>
        </div>
      </div>
    </header>
  );
}

export default DashboardHeader;
