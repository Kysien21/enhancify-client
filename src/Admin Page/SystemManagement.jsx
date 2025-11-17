import AddAdminAcc from "./Component/AddAdminAcc";
import ChangeAdminPass from "./Component/ChangeAdminPass";
import AdminHeader from "./Header and Sidebar/AdminHeader";
import AdminSidebar from "./Header and Sidebar/AdminSidebar";


function SystemManagement() {
  return (
    <main>
        <AdminHeader />
        <AdminSidebar />
      <section>
        <div className="fixed xl:w-[79%] xl:h-150 xl:top-25 xl:left-70 bg-[#EEF3FB] rounded-[20px] px-8 py-3 flex-col flex items-center">
          <div className="text-center">
            <h1 className="text-2xl text-[#1E3A8A] font-semibold">System Management</h1>
            <p className="text-lg">Configure security settings and manage administrative access.</p>
          </div>
          <div className="w-full h-full flex justify-between items-center">
            <AddAdminAcc />
            <ChangeAdminPass />
          </div>
        </div>
      </section>
    </main>
  );
}

export default SystemManagement;