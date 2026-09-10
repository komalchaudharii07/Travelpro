import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Mail, Lock, User } from "lucide-react";
import API from "../services/api";

const AUTH_IMAGE = "https://commons.wikimedia.org/wiki/Special:FilePath/Seven%20Sisters%20Falls.jpg?width=2200";

const Signup = () => {
  const [contact, setContact] = useState("");
  const [step, setStep] = useState("REQUEST_OTP"); // 'REQUEST_OTP', 'VERIFY_OTP', or 'COMPLETE_REGISTRATION'
  const [otp, setOtp] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Step 1: Handle sending/resending OTP
  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await API.post("/users/send-otp", { contact });
      setStep("VERIFY_OTP"); 
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Handle verifying OTP (now moves to profile completion instead of finishing login)
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await API.post("/users/verify-otp", { contact, otp });
      if (response.data.success || response.data) {
        setStep("COMPLETE_REGISTRATION");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Invalid OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Step 3: Handle final registration details (username & password)
  const handleCompleteRegistration = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const payload = {
        username,
        password,
        [contact.includes("@") ? "email" : "phone"]: contact
      };

      const response = await API.post("/users/complete-registration", payload);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data));
      navigate("/"); 
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#eef0ed] p-0 md:p-3">
      <div className="grid min-h-screen overflow-hidden bg-white md:min-h-[calc(100vh-24px)] md:grid-cols-[65%_35%] md:rounded-sm">
        
        {/* Left Section (Image) */}
        <section className="relative hidden overflow-hidden md:block">
          <img src={AUTH_IMAGE} alt="Meghalaya" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-black/10" />
          <div className="absolute inset-x-0 bottom-0 h-[48%] bg-gradient-to-t from-black/70 via-black/25 to-transparent" />
          <Link to="/" className="absolute left-7 top-7 z-20 flex items-center gap-2 rounded-full border border-white/30 bg-black/10 px-4 py-2.5 text-[12px] font-medium text-white backdrop-blur-sm transition hover:bg-black/25">
            <ArrowLeft size={14} /> Back
          </Link>
          <div className="absolute bottom-9 left-9 z-20 max-w-[520px] xl:bottom-11 xl:left-11">
            <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-emerald-300">Meghalaya 360°</p>
            <h2 className="mt-2.5 text-[32px] font-semibold leading-[1.08] tracking-[-0.025em] text-white xl:text-[38px]">
              Find your way into the hills.
            </h2>
          </div>
        </section>

        {/* Right Section */}
        <section className="flex min-h-screen items-center justify-center bg-[#fafbf8] px-7 py-10 sm:px-12 md:min-h-0 md:px-8 lg:px-10">
          <div className="w-full max-w-[350px]">
            
            <div>
              <h1 className="text-[35px] font-semibold leading-tight tracking-[-0.02em] text-[#17221d]">
                {step === "REQUEST_OTP" && "Create Account"}
                {step === "VERIFY_OTP" && "Verify OTP"}
                {step === "COMPLETE_REGISTRATION" && "Profile Details"}
              </h1>
              <p className="mt-1.5 text-[14px] text-gray-500">
                {step === "REQUEST_OTP" && (
                  <>or <Link to="/login" className="font-semibold text-[#183c2c] transition hover:text-emerald-700">Log In</Link></>
                )}
                {step === "VERIFY_OTP" && `Enter the 6-digit code sent to ${contact}`}
                {step === "COMPLETE_REGISTRATION" && "Choose a username and password"}
              </p>
            </div>

            {/* STEP 1: Request OTP Form */}
            {step === "REQUEST_OTP" && (
              <form onSubmit={handleSendOtp} className="mt-7">
                {error && (
                  <div className="mb-4 rounded-md bg-red-50 p-3 text-[11px] text-red-600 border border-red-200">
                    {error}
                  </div>
                )}
                <div>
                  <label htmlFor="contact" className="mb-1.5 block text-[14px] font-medium text-gray-600">
                    Phone Number or Email <span className="text-emerald-600">*</span>
                  </label>
                  <div className="relative">
                    <Mail size={14} strokeWidth={1.7} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      id="contact"
                      type="text"
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                      required
                      placeholder="Enter email or phone"
                      className="h-[38px] w-full rounded-md border border-gray-200 bg-white pl-9 pr-3 text-[11px] text-gray-700 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/10"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="mt-4 h-[42px] w-full rounded-md bg-[#183c2c] text-[14px] font-semibold text-white transition hover:bg-[#214d39] disabled:opacity-50"
                >
                  {loading ? "Sending..." : "Send OTP"}
                </button>
              </form>
            )}

            {/* STEP 2: Verify OTP Form */}
            {step === "VERIFY_OTP" && (
              <form onSubmit={handleVerifyOtp} className="mt-7">
                {error && (
                  <div className="mb-4 rounded-md bg-red-50 p-3 text-[11px] text-red-600 border border-red-200">
                    {error}
                  </div>
                )}
                <div>
                  <label htmlFor="otp" className="mb-1.5 block text-[14px] font-medium text-gray-600">
                    Enter OTP <span className="text-emerald-600">*</span>
                  </label>
                  <input
                    id="otp"
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                    maxLength={6}
                    placeholder="123456"
                    className="h-[38px] w-full rounded-md border border-gray-200 bg-white px-3 text-[13px] text-gray-700 outline-none transition text-center tracking-widest focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/10"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="mt-4 h-[42px] w-full rounded-md bg-[#183c2c] text-[14px] font-semibold text-white transition hover:bg-[#214d39] disabled:opacity-50"
                >
                  {loading ? "Verifying..." : "Verify OTP"}
                </button>

                <button
                  type="button"
                  onClick={() => setStep("REQUEST_OTP")}
                  className="mt-3 w-full text-center text-[12px] text-gray-500 hover:underline"
                >
                  Change email/phone number
                </button>
              </form>
            )}

            {/* STEP 3: Complete Registration Form (Username & Password) */}
            {step === "COMPLETE_REGISTRATION" && (
              <form onSubmit={handleCompleteRegistration} className="mt-7 space-y-4">
                {error && (
                  <div className="rounded-md bg-red-50 p-3 text-[11px] text-red-600 border border-red-200">
                    {error}
                  </div>
                )}
                <div>
                  <label htmlFor="username" className="mb-1.5 block text-[14px] font-medium text-gray-600">
                    Username <span className="text-emerald-600">*</span>
                  </label>
                  <div className="relative">
                    <User size={14} strokeWidth={1.7} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      id="username"
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                      placeholder="Choose a username"
                      className="h-[38px] w-full rounded-md border border-gray-200 bg-white pl-9 pr-3 text-[11px] text-gray-700 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/10"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="mb-1.5 block text-[14px] font-medium text-gray-600">
                    Password <span className="text-emerald-600">*</span>
                  </label>
                  <div className="relative">
                    <Lock size={14} strokeWidth={1.7} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      placeholder="Set a password"
                      className="h-[38px] w-full rounded-md border border-gray-200 bg-white pl-9 pr-3 text-[11px] text-gray-700 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/10"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="h-[42px] w-full rounded-md bg-[#183c2c] text-[14px] font-semibold text-white transition hover:bg-[#214d39] disabled:opacity-50"
                >
                  {loading ? "Creating Account..." : "Complete Sign Up"}
                </button>
              </form>
            )}

          </div>
        </section>

      </div>
    </div>
  );
};

export default Signup;