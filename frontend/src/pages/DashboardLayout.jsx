import Navbar from "../components/layout/Navbar";

function DashboardLayout({ children }) {

  return (

    <div className="relative min-h-screen bg-slate-100">

      {/* Left Blue Strip */}

      <div
        className="
          fixed
          left-0
          top-0
          bottom-0
          w-13
          bg-[#003A8C]
          z-10
        "
      />

      {/* Content Area */}

      <div className="pl-10">

        <Navbar />

        <main className="p-8">
          {children}
        </main>

      </div>

    </div>

  );

}

export default DashboardLayout;