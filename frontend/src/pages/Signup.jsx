import {
  ArrowLeft,
  Mail,
  Phone,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const AUTH_IMAGE =
  "https://commons.wikimedia.org/wiki/Special:FilePath/Seven%20Sisters%20Falls.jpg?width=2200";

const Signup = () => {
  const [contact, setContact] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Backend OTP API yahan connect hoga
    console.log("Send OTP to:", contact);
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

          {/* Image overlay */}
          <div className="absolute inset-0 bg-black/10" />

          {/* Bottom gradient */}
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
            RIGHT SIGNUP SECTION
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

              <h1 className="text-[40px] font-semibold leading-tight tracking-[-0.02em] text-[#17221d]">
                Create Account
              </h1>

              <p className="mt-1.5 text-[14px] text-gray-500">
                or{" "}
                <Link
                  to="/login"
                  className="font-semibold text-[#183c2c] transition hover:text-emerald-700"
                >
                  Log In
                </Link>
              </p>

            </div>

            {/* =================================================
                SIGNUP FORM
            ================================================== */}
            <form
              onSubmit={handleSubmit}
              className="mt-7"
            >

              {/* =================================================
                  PHONE / EMAIL
              ================================================== */}
              <div>

                <label
                  htmlFor="contact"
                  className="mb-1.5 block text-[14px] font-medium text-gray-600"
                >
                  Phone Number or Email
                  <span className="text-emerald-600"> *</span>
                </label>

                <div className="relative">

                  <Mail
                    size={14}
                    strokeWidth={1.7}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    id="contact"
                    name="contact"
                    type="text"
                    value={contact}
                    onChange={(e) =>
                      setContact(e.target.value)
                    }
                    required
                    placeholder="Enter your email"
                    autoComplete="email"
                    className="h-[38px] w-full rounded-md border border-gray-200 bg-white pl-9 pr-3 text-[11px] text-gray-700 outline-none transition placeholder:text-gray-400 hover:border-gray-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/10"
                  />

                </div>

              </div>

              {/* =================================================
                  SEND OTP BUTTON
              ================================================== */}
              <button
                type="submit"
                className="mt-4 h-[42px] w-full rounded-md bg-[#183c2c] text-[14px] font-semibold text-white transition hover:bg-[#214d39] active:scale-[0.99]"
              >
                Send OTP
              </button>

            </form>

            {/* =================================================
                OR DIVIDER
            ================================================== */}
            <div className="my-5 flex items-center gap-3">

              <div className="h-px flex-1 bg-gray-200" />

              <span className="text-13px] text-gray-400">
                OR
              </span>

              <div className="h-px flex-1 bg-gray-200" />

            </div>

            {/* =================================================
                SOCIAL LOGIN
            ================================================== */}
            <div className="space-y-2">

              {/* GOOGLE */}
              <button
                type="button"
                className="flex h-[43px] w-full items-center justify-center gap-2.5 rounded-md border border-gray-200 bg-white text-[13px] font-medium text-gray-600 transition hover:border-gray-300 hover:bg-gray-50 active:scale-[0.99]"
              >

                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M21.805 12.23c0-.79-.065-1.55-.19-2.28H12v4.32h5.51a4.7 4.7 0 0 1-2.045 3.085v2.56h3.305c1.935-1.78 3.035-4.405 3.035-7.685Z"
                    fill="#4285F4"
                  />

                  <path
                    d="M12 22c2.765 0 5.085-.915 6.77-2.485l-3.305-2.56c-.915.615-2.08.98-3.465.98-2.665 0-4.92-1.8-5.73-4.22H2.85v2.64A10.22 10.22 0 0 0 12 22Z"
                    fill="#34A853"
                  />

                  <path
                    d="M6.27 13.715A6.14 6.14 0 0 1 5.95 12c0-.595.105-1.175.32-1.715v-2.64H2.85A10.02 10.02 0 0 0 1.78 12c0 1.61.385 3.13 1.07 4.355l3.42-2.64Z"
                    fill="#FBBC05"
                  />

                  <path
                    d="M12 6.065c1.505 0 2.855.52 3.92 1.54l2.94-2.94C17.08 2.99 14.76 2 12 2a10.22 10.22 0 0 0-9.15 5.645l3.42 2.64c.81-2.42 3.065-4.22 5.73-4.22Z"
                    fill="#EA4335"
                  />
                </svg>

                Continue With Google

              </button>

              {/* FACEBOOK */}
              <button
                type="button"
                className="flex h-[42px] w-full items-center justify-center gap-2.5 rounded-md border border-gray-200 bg-white text-[13px] font-medium text-gray-600 transition hover:border-gray-300 hover:bg-gray-50 active:scale-[0.99]"
              >

                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="#1877F2"
                >
                  <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.413c0-3.025 1.792-4.696 4.533-4.696 1.312 0 2.686.236 2.686.236v2.973h-1.514c-1.491 0-1.956.93-1.956 1.885v2.262h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073Z" />
                </svg>

                Continue With Facebook

              </button>

              {/* APPLE */}
              <button
                type="button"
                className="flex h-[42px] w-full items-center justify-center gap-2.5 rounded-md border border-gray-200 bg-white text-[13px] font-medium text-gray-600 transition hover:border-gray-300 hover:bg-gray-50 active:scale-[0.99]"
              >

                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="text-black"
                >
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.3-.79-1.53 0-2.01.77-3.28.82-1.31.05-2.3-1.32-3.14-2.55C4.23 16.93 2.93 12.45 4.7 9.53c.87-1.45 2.41-2.37 4.1-2.4 1.28-.02 2.5.87 3.28.87.78 0 2.24-1.08 3.78-.92.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.27-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.02.07-.42 1.44-1.32 2.59ZM13.53 3.5c.73-.89 1.94-1.57 3.13-1.62.15 1.24-.36 2.49-1.07 3.39-.7.9-1.85 1.6-3.08 1.51-.16-1.22.44-2.49 1.02-3.28Z" />
                </svg>

                Continue With Apple

              </button>

            </div>

            {/* =================================================
                LOGIN LINK
            ================================================== */}
            <p className="mt-6 text-center text-[13px] text-gray-500">

              Already have an Account?{" "}

              <Link
                to="/login"
                className="font-semibold text-[#183c2c] transition hover:text-emerald-700"
              >
                Log In
              </Link>

            </p>

          </div>
        </section>

      </div>
    </div>
  );
};

export default Signup;