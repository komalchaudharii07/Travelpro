import {
  ArrowLeft,
  Eye,
  EyeOff,
  Lock,
  Mail,
} from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

const AUTH_IMAGE =
  "https://commons.wikimedia.org/wiki/Special:FilePath/Seven%20Sisters%20Falls.jpg?width=2200";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
  const navigate = useNavigate();

 const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await API.post("/users/login", { email, password });
      
      // Extract token and user safely, handling different backend response shapes
      const token = response.data.token;
      const userData = response.data.user || response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(userData));

      // Notify the navbar instantly that auth state changed
      window.dispatchEvent(new Event("auth-change"));

      navigate("/"); 
    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen bg-[#eef0ed] p-0 md:p-3">
      <div className="grid min-h-screen overflow-hidden bg-white md:min-h-[calc(100vh-24px)] md:grid-cols-[65%_35%] md:rounded-sm">

        {/* LEFT IMAGE SECTION */}
        <section className="relative hidden overflow-hidden md:block">
          <img
            src={AUTH_IMAGE}
            alt="Seven Sisters Falls, Meghalaya"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/10" />
          <div className="absolute inset-x-0 bottom-0 h-[48%] bg-gradient-to-t from-black/70 via-black/25 to-transparent" />

          <Link
            to="/"
            className="absolute left-7 top-7 z-25 flex items-center gap-2 rounded-full border border-white/30 bg-black/10 px-4 py-2.5 text-[12px] font-medium text-white backdrop-blur-sm transition hover:bg-black/25"
          >
            <ArrowLeft size={14} />
            Back
          </Link>

          <div className="absolute right-7 top-7 z-25 text-[10px] font-medium uppercase tracking-[0.2em] text-white/80">
            Meghalaya · India
          </div>

          <div className="absolute bottom-9 left-9 z-25 max-w-[520px] xl:left-11 xl:bottom-11">
            <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-emerald-300">
              Meghalaya 360°
            </p>
            <h2 className="mt-2.5 text-[32px] font-semibold leading-[1.08] tracking-[-0.025em] text-white xl:text-[38px]">
              Find your way into the hills.
            </h2>
            <p className="mt-3 max-w-[410px] text-[13px] leading-5 text-white/75">
              Explore beautiful places, local stories and unforgettable experiences across Meghalaya.
            </p>
          </div>
        </section>

        {/* RIGHT LOGIN SECTION */}
        <section className="flex min-h-screen items-center justify-center bg-[#fafbf8] px-7 py-10 sm:px-12 md:min-h-0 md:px-8 lg:px-10">
          <div className="w-full max-w-[350px]">

            <Link
              to="/"
              className="mb-10 block text-[17px] font-semibold tracking-tight text-[#183c2c] md:hidden"
            >
              Meghalaya
              <span className="text-emerald-600">.</span>
            </Link>

            <div>
              <h1 className="text-[38px] font-semibold tracking-[-0.02em] text-[#17221d]">
                Log In
              </h1>
              <p className="mt-1 text-[16px] text-gray-400">
                or{" "}
                <Link
                  to="/signup"
                  className="font-medium text-gray-600 transition hover:text-emerald-700"
                >
                  Create Account
                </Link>
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-7">
              {error && (
                <div className="mb-4 rounded-md bg-red-50 p-3 text-[11px] text-red-600 border border-red-200">
                  {error}
                </div>
              )}

              {/* EMAIL */}
              <div>
                <label htmlFor="email" className="mb-1.5 block text-[13px] font-medium text-gray-600">
                  Email address <span className="text-emerald-600">*</span>
                </label>
                <div className="relative">
                  <Mail size={14} strokeWidth={1.7} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="h-[38px] w-full rounded-md border border-gray-200 bg-white pl-9 pr-3 text-[11px] text-gray-700 outline-none transition placeholder:text-gray-400 hover:border-gray-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/10"
                  />
                </div>
              </div>

              {/* PASSWORD */}
              <div className="mt-5">
                <div className="mb-1.5 flex items-center justify-between">
                  <label htmlFor="password" className="text-[13px] font-medium text-gray-600">
                    Password <span className="text-emerald-600">*</span>
                  </label>
                </div>
                <div className="relative">
                  <Lock size={14} strokeWidth={1.7} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    className="h-[38px] w-full rounded-md border border-gray-200 bg-white pl-9 pr-10 text-[11px] text-gray-700 outline-none transition placeholder:text-gray-400 hover:border-gray-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
              </div>

              {/* REMEMBER + FORGOT */}
              <div className="mt-4 flex items-center justify-between">
                <label className="flex cursor-pointer items-center gap-1.5">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-3.5 w-3.5 cursor-pointer accent-emerald-700"
                  />
                  <span className="text-[12px] text-gray-500">Remember me</span>
                </label>
                <Link to="/forgot-password" className="text-[13px] text-gray-500 underline underline-offset-2 transition hover:text-emerald-700">
                  Forgot Password
                </Link>
              </div>

              {/* LOGIN BUTTON */}
              <button
                type="submit"
                className="mt-5 h-[42px] w-full rounded-md bg-[#183c2c] text-[12px] font-semibold text-white transition hover:bg-[#214d39] active:scale-[0.99]"
              >
                Log In
              </button>
            </form>

            <div className="my-5 flex items-center gap-3">
              <div className="h-px flex-1 bg-gray-200" />
              <span className="text-[12px] text-gray-500">OR</span>
              <div className="h-px flex-1 bg-gray-200" />
            </div>

            {/* SOCIAL LOGIN */}
            <div className="space-y-2">
              <button type="button" className="flex h-[41px] w-full items-center justify-center gap-2.5 rounded-md border border-gray-200 bg-white text-[13px] font-medium text-gray-600 transition hover:border-gray-300 hover:bg-gray-50">
                Continue With Google
              </button>
            </div>

            <p className="mt-6 text-center text-[12px] text-gray-500">
              Don't have an Account?{" "}
              <Link to="/signup" className="font-medium text-[#183c2c] transition hover:text-emerald-700">
                Create Account
              </Link>
            </p>

          </div>
        </section>

      </div>
    </div>
  );
};

export default Login;