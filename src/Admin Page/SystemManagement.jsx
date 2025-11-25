
import ChangeAdminPass from "./Component/ChangeAdminPass";
import AdminHeader from "./Header and Sidebar/AdminHeader";
import AdminSidebar from "./Header and Sidebar/AdminSidebar";


function SystemManagement() {
  return (
    <main>
        <AdminHeader />
        <AdminSidebar />
      <section>
        <div className="pt-16 sm:pt-20 xl:pt-24 md:ml-[16%] xl:ml-[15%] 2xl:ml-[16%] min-h-screen">
          <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="p-4 sm:p-6 lg:p-8">
          <div className="text-center">
            <h1 className="text-2xl text-[#1E3A8A] font-semibold">System Management</h1>
            <p className="text-lg">Configure security settings and manage administrative access.</p>
          </div>
          <div className="w-full h-full flex justify-center items-center">
            <ChangeAdminPass />
          </div>
          </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default SystemManagement;