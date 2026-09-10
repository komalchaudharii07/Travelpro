import { Link, useLocation, useNavigate } from "react-router-dom";
import { Compass, Menu, X, LogOut, Shield, Bookmark } from "lucide-react";
import { useState, useEffect } from "react";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Explore", path: "/explore" },
  { name: "Destinations", path: "/destinations" },
  { name: "360° Tours", path: "/virtual-tours" },
  { name: "Gallery", path: "/gallery" },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [authState, setAuthState] = useState({ token: null, user: null });
  const location = useLocation();
  const navigate = useNavigate();

  const syncAuthState = () => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    let user = null;
    
    try {
      user = storedUser && storedUser !== "undefined" ? JSON.parse(storedUser) : null;
    } catch (e) {
      user = null;
    }

    setAuthState({ token, user });
  };

  useEffect(() => {
    syncAuthState();

    window.addEventListener("auth-change", syncAuthState);
    window.addEventListener("storage", syncAuthState);

    return () => {
      window.removeEventListener("auth-change", syncAuthState);
      window.removeEventListener("storage", syncAuthState);
    };
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("auth-change"));
    setMenuOpen(false);
    navigate("/login");
  };

  const isAuthenticated = !!authState.token;
  const userRole = authState.user?.role || "explorer";
  const username = authState.user?.username || "Explorer";

  const isActive = (path) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="absolute left-0 top-0 z-50 w-full px-5 pt-5 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between rounded-full border border-white/10 bg-black/25 px-4 py-3 shadow-2xl backdrop-blur-xl md:px-5">
          
          {/* LOGO */}
          <Link to="/" className="group flex items-center gap-2.5" onClick={() => setMenuOpen(false)}>
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/10 transition group-hover:border-emerald-400/50 group-hover:bg-emerald-400/10">
              <Compass size={19} className="transition duration-500 group-hover:rotate-45 text-white" />
            </span>
            <span className="text-lg font-semibold tracking-tight text-white md:text-xl">
              Meghalaya<span className="text-emerald-400">.</span>
            </span>
          </Link>

          {/* DESKTOP NAV */}
          <div className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative rounded-full px-4 py-2 text-sm transition ${
                  isActive(item.path) ? "bg-white/10 text-white" : "text-white/55 hover:bg-white/5 hover:text-white"
                }`}
              >
                {item.name}
                {isActive(item.path) && (
                  <span className="absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-emerald-400" />
                )}
              </Link>
            ))}
          </div>

          {/* DESKTOP AUTH / CTA */}
          <div className="hidden items-center gap-3 md:flex">
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                {userRole === "admin" ? (
                  <Link
                    to="/admin/dashboard"
                    className="flex items-center gap-1.5 rounded-full bg-emerald-600 px-4 py-2 text-xs font-semibold tracking-wide text-white transition hover:bg-emerald-500"
                  >
                    <Shield size={14} /> Admin Dashboard
                  </Link>
                ) : (
                  <Link
                    to="/profile"
                    className="flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold text-white transition hover:bg-white/20"
                  >
                    <Bookmark size={14} /> Saved Itineraries
                  </Link>
                )}

                <div className="flex items-center gap-2 border-l border-white/20 pl-3">
                  <span className="text-xs font-medium text-emerald-300">Hi, {username}</span>
                  <button
                    onClick={handleLogout}
                    title="Logout"
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-red-500/80"
                  >
                    <LogOut size={14} />
                  </button>
                </div>
              </div>
            ) : (
              <>
                <Link to="/login" className="rounded-full px-4 py-2 text-sm font-medium text-white/80 transition hover:text-white">
                  Sign in
                </Link>
                <Link to="/signup" className="rounded-full bg-white px-5 py-2.5 text-sm font-medium text-black transition duration-300 hover:bg-emerald-400">
                  Get Started
                </Link>
              </>
            )}
          </div>

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
                className={`block rounded-2xl px-5 py-3 text-sm transition ${
                  isActive(item.path) ? "bg-white/10 text-white" : "text-white/55 hover:bg-white/5 hover:text-white"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>{item.name}</span>
                  {isActive(item.path) && <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />}
                </div>
              </Link>
            ))}

            <div className="mt-3 border-t border-white/10 pt-3">
              {isAuthenticated ? (
                <div className="space-y-2">
                  <div className="px-5 py-2 text-xs font-medium text-emerald-300">
                    Signed in as <span className="font-bold text-white">{username}</span> ({userRole})
                  </div>

                  {userRole === "admin" ? (
                    <Link
                      to="/admin/dashboard"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-5 py-3 text-center text-sm font-medium text-white transition hover:bg-emerald-500"
                    >
                      <Shield size={16} /> Admin Dashboard
                    </Link>
                  ) : (
                    <Link
                      to="/profile"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center justify-center gap-2 rounded-2xl bg-white/10 px-5 py-3 text-center text-sm font-medium text-white transition hover:bg-white/20"
                    >
                      <Bookmark size={16} /> Saved Itineraries
                    </Link>
                  )}

                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center justify-center gap-2 rounded-2xl bg-red-500/20 px-5 py-3 text-center text-sm font-medium text-red-300 transition hover:bg-red-500 hover:text-white"
                  >
                    <LogOut size={16} /> Logout
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    to="/login"
                    onClick={() => setMenuOpen(false)}
                    className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-center text-sm font-medium text-white transition hover:bg-white/10"
                  >
                    Sign in
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setMenuOpen(false)}
                    className="rounded-2xl bg-white px-5 py-3 text-center text-sm font-medium text-black transition duration-300 hover:bg-emerald-400"
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;