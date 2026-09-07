import {
  ArrowLeft,
  ArrowRight,
  Mail,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const AUTH_IMAGE =
  "https://commons.wikimedia.org/wiki/Special:FilePath/Seven%20Sisters%20Falls.jpg?width=2200";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Backend forgot-password API yahan connect hoga
    console.log("Reset link requested for:", email);
  };

  return (
    <div className="min-h-screen bg-[#eef0ed] p-0 md:p-3">

      {/* =====================================================
          MAIN CONTAINER
      ====================================================== */}
      <div className="grid min-h-screen overflow-hidden bg-white md:min-h-[calc(100vh-24px)] md:grid-cols-[65%_35%] md:rounded-sm">

        {/* =====================================================
            LEFT IMAGE
        ====================================================== */}
        <section className="relative hidden overflow-hidden md:block">

          <img
            src={AUTH_IMAGE}
            alt="Seven Sisters Falls, Meghalaya"
            className="absolute inset-0 h-full w-full object-cover"
          />

          {/* subtle overlay */}
          <div className="absolute inset-0 bg-black/10" />

          {/* bottom gradient */}
          <div className="absolute inset-x-0 bottom-0 h-[48%] bg-gradient-to-t from-black/70 via-black/25 to-transparent" />

          {/* =================================================
              BACK BUTTON
          ================================================== */}
          <Link
            to="/"
            className="absolute left-7 top-7 z-20 flex items-center gap-2 rounded-full border border-white/30 bg-black/10 px-4 py-2.5 text-[12px] font-medium text-white backdrop-blur-sm transition hover:bg-black/25"
          >
            <ArrowLeft size={14} />
            Back
          </Link>

          {/* =================================================
              LOCATION
          ================================================== */}
          <div className="absolute right-7 top-7 z-20 text-[10px] font-medium uppercase tracking-[0.2em] text-white/80">
            Meghalaya · India
          </div>

          {/* =================================================
              IMAGE CONTENT
          ================================================== */}
          <div className="absolute bottom-9 left-9 z-20 max-w-[520px] xl:bottom-11 xl:left-11">

            <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-emerald-300">
              Meghalaya 360°
            </p>

            <h2 className="mt-2.5 text-[32px] font-semibold leading-[1.08] tracking-[-0.025em] text-white xl:text-[38px]">
              Find your way into the hills.
            </h2>

            <p className="mt-3 max-w-[410px] text-[13px] leading-5 text-white/75">
              Explore beautiful places, local stories and
              unforgettable experiences across Meghalaya.
            </p>

          </div>
        </section>

        {/* =====================================================
            RIGHT FORGOT PASSWORD
        ====================================================== */}
        <section className="flex min-h-screen items-center justify-center bg-[#fafbf8] px-7 py-10 sm:px-12 md:min-h-0 md:px-8 lg:px-10">

          <div className="w-full max-w-[350px]">

            {/* =================================================
                MOBILE LOGO
            ================================================== */}
            <Link
              to="/"
              className="mb-10 block text-[17px] font-semibold tracking-tight text-[#183c2c] md:hidden"
            >
              Meghalaya
              <span className="text-emerald-600">.</span>
            </Link>

            {/* =================================================
                HEADER
            ================================================== */}
            <div>

              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-emerald-700">
                Account Recovery
              </p>

              <h1 className="mt-2.5 text-[28px] font-semibold leading-tight tracking-[-0.025em] text-[#17221d]">
                Forgot Password?
              </h1>

              <p className="mt-2 text-[12px] leading-5 text-gray-500">
                Enter your email and we'll send you a
                password reset link.
              </p>

            </div>

            {/* =================================================
                FORM
            ================================================== */}
            <form
              onSubmit={handleSubmit}
              className="mt-7"
            >

              {/* Email */}
              <div>

                <label
                  htmlFor="email"
                  className="mb-1.5 block text-[10px] font-medium text-gray-600"
                >
                  Email address
                  <span className="text-emerald-600"> *</span>
                </label>

                <div className="relative">

                  <Mail
                    size={14}
                    strokeWidth={1.7}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                    placeholder="Enter your email"
                    autoComplete="email"
                    className="h-[40px] w-full rounded-md border border-gray-200 bg-white pl-9 pr-3 text-[11px] text-gray-700 outline-none transition placeholder:text-gray-400 hover:border-gray-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/10"
                  />

                </div>

              </div>

              {/* =================================================
                  SEND RESET LINK
              ================================================== */}
              <button
                type="submit"
                className="mt-5 flex h-[42px] w-full items-center justify-center gap-2 rounded-md bg-[#183c2c] text-[12px] font-semibold text-white transition hover:bg-[#214d39] active:scale-[0.99]"
              >
                Send reset link
                <ArrowRight size={14} />
              </button>

            </form>

            {/* =================================================
                BACK TO SIGN IN
            ================================================== */}
            <div className="mt-7 text-center">

              <Link
                to="/login"
                className="inline-flex items-center gap-2 text-[12px] font-medium text-gray-500 transition hover:text-[#183c2c]"
              >
                <ArrowLeft size={13} />
                Back to sign in
              </Link>

            </div>

          </div>

        </section>

      </div>
    </div>
  );
};

export default ForgotPassword;