import BarGraph from "./Component/BarGraph";
import AdminHeader from "./Header and Sidebar/AdminHeader";
import AdminSidebar from "./Header and Sidebar/AdminSidebar";
import StatCard from "./Component/StatCard";
import LineGraphTwo from "./Component/LineGraphTwo";

function ReportAndAnalytics() {
  return (
    <main>
      <AdminHeader />
      <AdminSidebar />

      <section>
        <div className="pt-16 sm:pt-20 xl:pt-24 md:ml-[16%] xl:ml-[15%] 2xl:ml-[16%] min-h-screen">
          <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-blue-100 rounded-2xl p-4 sm:p-6 lg:p-5">
              
              <h1 className="text-2xl sm:text-3xl md:text-4xl text-[#1E3A8A] font-semibold underline mb-6 md:mb-8 lg:mb-12 text-center">
                Reports and Analytics
              </h1>

              {/* Stats Cards */}
              <div className="flex flex-col sm:flex-row w-full gap-4 md:gap-6 lg:gap-8 items-center justify-center mb-8 md:mb-9 px-3 sm:px-0 xl:px-30">

                <div className="w-full sm:w-auto sm:flex-1">
                  <StatCard value="1,500" label="Total Analysis" />
                </div>

                <div className="w-full sm:w-auto sm:flex-1">
                  <StatCard value="1,500" label="AVG Improvement" />
                </div>

                <div className="w-full sm:w-auto sm:flex-1">
                  <StatCard value="1,500" label="Active Users" />
                </div>

              </div>

              {/* Graphs */}
              <div className="w-full flex flex-col lg:flex-row gap-1 lg:grid-cols-3">

                <div className="w-full lg:w-1/2">
                <LineGraphTwo />
                </div>

                <div className="w-full lg:w-1/2">
                  <BarGraph />
                </div>

              </div>

            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default ReportAndAnalytics;