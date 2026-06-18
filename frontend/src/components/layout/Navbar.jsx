import { useState} from "react";
import { UserCircle, ChevronDown, LogOut } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/sakthi_textile_logo.png";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();


  const username = "sakthi_textile"; // later get from API/localStorage
  const navItems = [
    { name: "Home", path: "/" },
    { name: "Barcodes", path: "/barcode" },
    { name: "Stocks", path: "/stocks" },
    { name: "Dispatch", path: "/dispatch" },
  ];

  const handleLogout = async () => {
    try {
      await api.post("logout/",{
      refresh: localStorage.getItem("refresh")
    });
    } catch (err) {
      console.error(err);
    }

    localStorage.removeItem("access");
    localStorage.removeItem("refresh");

    navigate("/login");
  };

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

      {/* Navigation */}
      <div className="flex items-center gap-12">

        <nav className="flex items-center gap-10 text-sm font-medium">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`relative ${
                location.pathname === item.path
                  ? "text-blue-700 font-semibold"
                  : "text-slate-700 hover:text-blue-700"
              }`}
            >
              {item.name}

              {location.pathname === item.path && (
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
              )}
            </Link>
          ))}
        </nav>

        {/* User Profile */}
        <div className="relative">

          <button
            onClick={() => setShowMenu(!showMenu)}
            className="
              flex
              items-center
              gap-2
              px-3
              py-2
              rounded-xl
              hover:bg-slate-100
              transition
            "
          >
            <UserCircle
              size={32}
              className="text-blue-700"
            />

            <ChevronDown
              size={16}
              className="text-slate-500"
            />
          </button>

          {showMenu && (
            <div
              className="
                absolute
                right-0
                top-14
                w-56
                bg-white
                rounded-xl
                shadow-lg
                border
                border-slate-200
                z-50
              "
            >

              <div className="px-4 py-3 border-b">
                <p className="text-sm text-slate-500">
                  Signed in as
                </p>

                <p className="font-semibold text-slate-800">
                  {username}
                </p>
              </div>

              <button
                onClick={handleLogout}
                className="
                  w-full
                  px-4
                  py-3
                  flex
                  items-center
                  gap-3
                  text-red-600
                  hover:bg-red-50
                  rounded-b-xl
                "
              >
                <LogOut size={18} />
                Logout
              </button>

            </div>
          )}

        </div>

      </div>

    </header>
  );
}

export default Navbar;