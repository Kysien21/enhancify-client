import BarGraph from "./Component/BarGraph";
import LineGraph from "./Component/LineGraph";
import AdminHeader from "./Header and Sidebar/AdminHeader";
import AdminSidebar from "./Header and Sidebar/AdminSidebar";

function ReportAndAnalytics() {
  return (
    <main>
      <AdminHeader />
      <AdminSidebar />
      <section>
        <div className="fixed xl:w-[79%] xl:h-150 xl:top-25 xl:left-70 bg-[#EEF3FB] rounded-[20px] px-13 py-3 flex-col flex items-center">
          <h1 className="text-4xl text-[#1E3A8A] font-semibold underline mb-12">
            Reports and Analytics
          </h1>
          <div className="flex w-full h-40 items-center justify-evenly">
            <div className="xl:w-60 mb-10 relative">
              <div className="xl:h-35 bg-[#7AD7F0] flex flex-col items-center justify-center pt-6 rounded-t-lg">
                <h1 className="text-3xl mb-2">1,500</h1>
                <h2 className="text-lg">Total Analysis</h2>
              </div>
              <div className="absolute bottom-0 left-0 w-full h-3 bg-[#1E3A8A] rounded-b-lg"></div>
            </div>

            <div className="xl:w-60 mb-10 relative">
              <div className="xl:h-35 bg-[#7AD7F0] flex flex-col items-center justify-center pt-6 rounded-t-lg">
                <h1 className="text-3xl mb-2">1,500</h1>
                <h2 className="text-lg">AVG Improvement</h2>
              </div>
              <div className="absolute bottom-0 left-0 w-full h-3 bg-[#1E3A8A] rounded-b-lg"></div>
            </div>

            <div className="xl:w-60 mb-10 relative">
              <div className="xl:h-35 bg-[#7AD7F0] flex flex-col items-center justify-center pt-6 rounded-t-lg">
                <h1 className="text-3xl mb-2">1,500</h1>
                <h2 className="text-lg">Active Users</h2>
              </div>
              <div className="absolute bottom-0 left-0 w-full h-3 bg-[#1E3A8A] rounded-b-lg"></div>
            </div>
          </div>
          <div className="w-full h-full flex justify-between items-center">
            <LineGraph
              title="System Usage Over Time"
              labels={[
                "JAN",
                "FEB",
                "MAR",
                "JUN",
                "JUL",
                "AUG",
                "SEP",
                "OCT",
                "NOV",
                "DEC",
              ]}
              data={[100, 200, 150, 300, 300, 200, 300]}
              borderColor="#ff0000"
              width={530}
              height={200}
            />
            <BarGraph />
          </div>
        </div>
      </section>
    </main>
  );
}

export default ReportAndAnalytics;
