function AdminHeader() {
  return (
    <header>
      <div className="bg-white fixed z-[200] w-full transition-all duration-500 ease-in-out 
                   text-[#133970] h-10 sm:h-13 2xl:h-15 flex items-cente shadow-lg">
        <div className="flex w-100 justify-between items-center">
          <h3 className="text-[#30498F]">Enhancify</h3>
          <h1 className="text-[#30498F] text-2xl">Admin Dashboard</h1>
        </div>
      </div>
    </header>
  );
}

export default AdminHeader;