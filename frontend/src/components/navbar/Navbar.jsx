import { Link, useLocation } from "react-router-dom";
import { Compass, Menu, X } from "lucide-react";
import { useState } from "react";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Explore", path: "/explore" },
  { name: "Destinations", path: "/destinations" },
  { name: "360° Tours", path: "/virtual-tours" },
  { name: "Gallery", path: "/gallery" },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }

    return location.pathname.startsWith(path);
  };

  return (
    <nav className="absolute left-0 top-0 z-50 w-full px-5 pt-5 md:px-8">

      <div className="mx-auto max-w-7xl">

        {/* MAIN NAVBAR */}
        <div className="flex items-center justify-between rounded-full border border-white/10 bg-black/25 px-4 py-3 shadow-2xl backdrop-blur-xl md:px-5">

          {/* LOGO */}
          <Link
            to="/"
            className="group flex items-center gap-2.5"
            onClick={() => setMenuOpen(false)}
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/10 transition group-hover:border-emerald-400/50 group-hover:bg-emerald-400/10">
              <Compass
                size={19}
                className="transition duration-500 group-hover:rotate-45"
              />
            </span>

            <span className="text-lg font-semibold tracking-tight text-white md:text-xl">
              Meghalaya
              <span className="text-emerald-400">.</span>
            </span>
          </Link>

          {/* DESKTOP NAV */}
          <div className="hidden items-center gap-1 md:flex">

            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative rounded-full px-4 py-2 text-sm transition ${isActive(item.path)
                    ? "bg-white/10 text-white"
                    : "text-white/55 hover:bg-white/5 hover:text-white"
                  }`}
              >
                {item.name}

                {isActive(item.path) && (
                  <span className="absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-emerald-400" />
                )}
              </Link>
            ))}

          </div>

          {/* DESKTOP CTA */}
          <Link
            to="/explore"
            className="hidden rounded-full bg-white px-5 py-2.5 text-sm font-medium text-black transition duration-300 hover:bg-emerald-400 md:block"
          >
            Start Exploring
          </Link>

          {/* MOBILE BUTTON */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:bg-white/10 md:hidden"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

        </div>

        {/* MOBILE MENU */}
        {menuOpen && (
          <div className="mt-3 overflow-hidden rounded-3xl border border-white/10 bg-[#07110d]/95 p-3 shadow-2xl backdrop-blur-2xl md:hidden">

            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMenuOpen(false)}
                className={`block rounded-2xl px-5 py-4 text-sm transition ${isActive(item.path)
                    ? "bg-white/10 text-white"
                    : "text-white/55 hover:bg-white/5 hover:text-white"
                  }`}
              >
                <div className="flex items-center justify-between">
                  <span>{item.name}</span>

                  {isActive(item.path) && (
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  )}
                </div>
              </Link>
            ))}

            <Link
              to="/explore"
              onClick={() => setMenuOpen(false)}
              className="mt-2 block rounded-2xl bg-white px-5 py-4 text-center text-sm font-medium text-black transition hover:bg-emerald-400"
            >
              Start Exploring
            </Link>

          </div>
        )}

      </div>
    </nav>
  );
};

export default Navbar;