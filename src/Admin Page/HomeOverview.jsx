import LineGraph from "./Component/LineGraph";
import Table from "./Component/Table";
import AdminHeader from "./Header and Sidebar/AdminHeader";
import AdminSidebar from "./Header and Sidebar/AdminSidebar";

function HomeOverview() {
  return (
    <main>
      <AdminHeader />
      <AdminSidebar />
      <section>
        <div className="fixed xl:w-[79%] xl:h-150 xl:top-25 xl:left-70 bg-[#EEF3FB] rounded-[20px] px-13 py-3 justify-between flex">
          <div className="relative w-70 h-full">
            <h1 className="text-2xl mb-3 text-[#1E3A8A] font-semibold">
              Overview
            </h1>

            <div className="xl:w-60 mb-10 relative">
              <div className="xl:h-35 bg-[#7AD7F0] flex flex-col items-center justify-center pt-6 rounded-t-lg">
                <h1 className="text-3xl mb-2">1,500</h1>
                <h2 className="text-lg">Total Users</h2>
              </div>
              <div className="absolute bottom-0 left-0 w-full h-3 bg-[#1E3A8A] rounded-b-lg"></div>
            </div>

            <div className="xl:w-60 mb-10 relative">
              <div className="xl:h-35 bg-[#7AD7F0] flex flex-col items-center justify-center pt-6 rounded-t-lg">
                <h1 className="text-3xl mb-2">1,500</h1>
                <h2 className="text-lg">Total Resumes</h2>
              </div>
              <div className="absolute bottom-0 left-0 w-full h-3 bg-[#1E3A8A] rounded-b-lg"></div>
            </div>

            <div className="xl:w-60 mb-10 relative">
              <div className="xl:h-35 bg-[#7AD7F0] flex flex-col items-center justify-center pt-6 rounded-t-lg">
                <h1 className="text-3xl mb-2">1,500</h1>
                <h2 className="text-lg">Average Match Score</h2>
              </div>
              <div className="absolute bottom-0 left-0 w-full h-3 bg-[#1E3A8A] rounded-b-lg"></div>
            </div>
          </div>

          <div className="w-190 h-full flex-col pt-7">
            <LineGraph />
            <h1 className="text-lg my-3 text-[#1E3A8A]">
              Recent Analyses Summary
            </h1>
            <Table/>
          </div>
        </div>
      </section>
    </main>
  );
}

export default HomeOverview;
