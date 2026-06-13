import { UserCircle } from "lucide-react";
import logo from "../../assets/sakthi_textile_logo.png";

function Navbar() {
  return (
    <header className="h-20 bg-white border-b border-slate-200 px-12 flex items-center justify-between">

      {/* Logo */}
      <div className="flex items-center">
        <img
          src={logo}
          alt="Sakthi Textiles"
          className="w-35 object-contain"
        />
      </div>

      {/* Navigation + Profile */}
      <div className="flex items-center gap-12">

        <nav className="flex items-center gap-10 text-sm font-medium">

          <button className="relative text-blue-700 font-semibold">
            Home

            <span
              className="
                absolute
                left-0
                -bottom-4
                w-full
                h-[2px]
                bg-blue-700
              "
            />
          </button>

          <button className="text-slate-700 hover:text-blue-700">
            Dispatch
          </button>

          <button className="text-slate-700 hover:text-blue-700">
            Stocks
          </button>

          <button className="text-slate-700 hover:text-blue-700">
            Report
          </button>

          <button className="text-slate-700 hover:text-blue-700">
            Barcodes
          </button>

        </nav>

        {/* User Profile */}

        <button
          className="
            w-12
            h-12
            rounded-full
            border-2
            border-blue-700
            flex
            items-center
            justify-center
          "
        >
          <UserCircle
            size={28}
            className="text-blue-700"
          />
        </button>

      </div>

    </header>
  );
}

export default Navbar;