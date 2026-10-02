import { ArrowRight, Compass } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative min-h-[calc(100vh-72px)] overflow-hidden bg-[#f7f7f3]">
      {/* Background image */}
      <img
        src="https://commons.wikimedia.org/wiki/Special:FilePath/Dawki%20River%2C%20Dawki%2C%20Meghalaya.jpg?width=2200"
        alt="Umngot River, Dawki, Meghalaya"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Soft overlay for readability */}
      <div className="absolute inset-0 bg-black/25" />

      {/* Extra subtle bottom gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-black/15" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-72px)] max-w-7xl items-end px-6 pb-16 pt-24 lg:px-8 lg:pb-20">
        <div className="max-w-2xl">
          {/* Small label */}
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/25 bg-black/15 px-3 py-1.5 backdrop-blur-sm">
            <Compass size={13} className="text-emerald-200" />

            <span className="text-[10px] font-medium uppercase tracking-[0.24em] text-white/90">
              Discover Meghalaya
            </span>
          </div>

          {/* Heading */}
          <h1 className="max-w-xl text-[42px] font-semibold leading-[1.08] tracking-[-0.025em] text-white sm:text-[50px] lg:text-[58px]">
            Where every
            <span className="block text-emerald-200">
              journey feels alive.
            </span>
          </h1>

          {/* Description */}
          <p className="mt-5 max-w-lg text-[15px] leading-7 text-white/85 sm:text-[16px]">
            Explore misty hills, crystal-clear rivers, living root bridges and
            hidden waterfalls across the beautiful landscapes of Meghalaya.
          </p>

          {/* Buttons */}
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Link
              to="/explore"
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-[13px] font-semibold text-[#183c2c] transition hover:bg-emerald-50"
            >
              Explore Meghalaya
              <ArrowRight size={15} />
            </Link>

            <Link
              to="/virtual-tours"
              className="rounded-full border border-white/30 bg-black/10 px-5 py-3 text-[13px] font-medium text-white backdrop-blur-sm transition hover:bg-white/10"
            >
              Experience 360°
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom location label */}
      <div className="absolute bottom-5 right-6 z-10 hidden text-right sm:block lg:right-8">
        <p className="text-[10px] uppercase tracking-[0.25em] text-white/60">
          Dawki · Meghalaya
        </p>
        <p className="mt-1 text-[12px] text-white/80">
          Umngot River
        </p>
      </div>
    </section>
  );
};

export default Hero;