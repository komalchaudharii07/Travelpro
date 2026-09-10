import Hero from "../components/hero/Hero";
import DestinationSection from "../components/destination/DestinationSection";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Compass,
  Map,
  Move3D,
  Play,
} from "lucide-react";

const experiences = [
  {
    title: "Seven Sisters Falls",
    location: "Cherrapunji",
    description:
      "Seven dramatic waterfalls flowing down the misty cliffs of Sohra.",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Seven%20Sisters%20Falls.jpg?width=1600",
  },
  {
    title: "Nohkalikai Falls",
    location: "Cherrapunji",
    description:
      "A spectacular waterfall surrounded by the green hills of Meghalaya.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/5/5e/Nohkalikai_Falls_Cherrapunji.JPG",
  },
  {
    title: "Living Root Bridge",
    location: "Nongriat",
    description:
      "A remarkable living bridge shaped by nature and generations of Khasi tradition.",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Root%20Bridges%20at%20Nonghriat.jpg?width=1400",
  },
  {
    title: "Laitlum Canyon",
    location: "Near Shillong",
    description:
      "Quiet mountain ridges and sweeping valleys overlooking Meghalaya.",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Laitlum.jpg?width=1400",
  },
];

const Home = () => {
  return (
    <div className="min-h-screen bg-[#f7f7f3] text-[#17221d]">

      {/* =====================================================
          HERO
      ===================================================== */}
      <section>
        <Hero />
      </section>


      {/* =====================================================
          INTRO
      ===================================================== */}
      <section className="px-6 py-20 lg:px-8 lg:py-28">

        <div className="mx-auto max-w-7xl">

          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">

            {/* Left */}
            <div>

              <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-emerald-700">
                Discover Meghalaya
              </p>

              <h2 className="max-w-xl text-[32px] font-semibold leading-[1.15] tracking-[-0.02em] md:text-[40px]">
                A land shaped by
                <span className="text-emerald-700">
                  {" "}clouds, water and wonder.
                </span>
              </h2>

            </div>

            {/* Right */}
            <div className="max-w-2xl lg:ml-auto">

              <p className="text-[15px] leading-7 text-gray-600 md:text-[16px]">
                From mist-covered hills and living root bridges to
                crystal-clear rivers and quiet villages, Meghalaya
                offers a journey that feels far removed from the
                ordinary.
              </p>

              <Link
                to="/explore"
                className="mt-6 inline-flex items-center gap-2 text-[14px] font-semibold text-emerald-700 transition hover:text-emerald-800"
              >
                Explore the region
                <ArrowRight size={16} />
              </Link>

            </div>

          </div>

        </div>
      </section>


      {/* =====================================================
          DESTINATIONS
      ===================================================== */}
      <section>
        <DestinationSection />
      </section>


      {/* =====================================================
          FEATURED REAL PLACES
      ===================================================== */}
      <section className="px-6 py-20 lg:px-8 lg:py-28">

        <div className="mx-auto max-w-7xl">

          {/* Section heading */}
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">

            <div className="max-w-2xl">

              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-emerald-700">
                Places worth seeing
              </p>

              <h2 className="mt-3 text-[32px] font-semibold leading-tight tracking-[-0.02em] md:text-[40px]">
                See Meghalaya as it really is.
              </h2>

              <p className="mt-4 max-w-xl text-[15px] leading-7 text-gray-500">
                From powerful waterfalls to ancient living bridges,
                discover some of the landscapes that define Meghalaya.
              </p>

            </div>

            <Link
              to="/gallery"
              className="inline-flex items-center gap-2 text-[14px] font-semibold text-emerald-700"
            >
              View gallery
              <ArrowRight size={16} />
            </Link>

          </div>


          {/* Cards */}
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

            {experiences.map((experience) => (
              <Link
                to="/gallery"
                key={experience.title}
                className="group overflow-hidden rounded-[20px] bg-white shadow-sm ring-1 ring-black/[0.04] transition duration-300 hover:-translate-y-1 hover:shadow-md"
              >

                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden bg-gray-200">

                  <img
                    src={experience.image}
                    alt={experience.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />

                  {/* subtle overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-70" />

                  {/* Location */}
                  <div className="absolute bottom-3 left-3">
                    <span className="rounded-full bg-black/30 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.16em] text-white backdrop-blur-md">
                      {experience.location}
                    </span>
                  </div>

                </div>


                {/* Text */}
                <div className="p-5">

                  <h3 className="text-[18px] font-semibold tracking-tight text-[#17221d]">
                    {experience.title}
                  </h3>

                  <p className="mt-2 text-[13px] leading-6 text-gray-500">
                    {experience.description}
                  </p>

                  <div className="mt-4 flex items-center gap-1 text-[12px] font-semibold text-emerald-700">
                    Explore
                    <ArrowRight
                      size={14}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </div>

                </div>

              </Link>
            ))}

          </div>

        </div>
      </section>


      {/* =====================================================
          360 EXPERIENCE
      ===================================================== */}
      <section className="px-6 py-20 lg:px-8 lg:py-28">

        <div className="mx-auto max-w-7xl">

          <div className="relative overflow-hidden rounded-[28px] bg-[#183c2c] px-7 py-14 text-white sm:px-10 lg:px-16 lg:py-20">

            {/* Decorative glow */}
            <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-emerald-400/10 blur-3xl" />

            <div className="relative z-10 grid gap-12 lg:grid-cols-[1fr_0.8fr] lg:items-center">

              {/* Content */}
              <div>

                <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-full bg-white/10">
                  <Move3D
                    size={20}
                    className="text-emerald-300"
                  />
                </div>

                <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-emerald-300">
                  Immersive Meghalaya
                </p>

                <h2 className="mt-4 max-w-xl text-[32px] font-semibold leading-[1.15] tracking-tight md:text-[40px]">
                  Experience Meghalaya
                  <br />
                  before you arrive.
                </h2>

                <p className="mt-5 max-w-lg text-[15px] leading-7 text-white/65">
                  Step inside panoramic experiences and explore
                  Meghalaya from every direction with our 360°
                  virtual tours.
                </p>

                <Link
                  to="/virtual-tours"
                  className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-[14px] font-semibold text-[#183c2c] transition hover:bg-emerald-50"
                >
                  Explore 360° tours
                  <ArrowRight size={16} />
                </Link>

              </div>


              {/* Feature cards */}
              <div className="grid gap-3">

                <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-5 backdrop-blur-sm">

                  <Compass
                    size={20}
                    className="text-emerald-300"
                  />

                  <h3 className="mt-4 text-[16px] font-medium">
                    Discover places
                  </h3>

                  <p className="mt-1 text-[13px] leading-6 text-white/50">
                    Find hidden gems and iconic destinations.
                  </p>

                </div>


                <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-5 backdrop-blur-sm">

                  <Map
                    size={20}
                    className="text-emerald-300"
                  />

                  <h3 className="mt-4 text-[16px] font-medium">
                    Explore the map
                  </h3>

                  <p className="mt-1 text-[13px] leading-6 text-white/50">
                    Navigate towns, attractions and experiences.
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>
      </section>


      {/* =====================================================
          EXPERIENCE FEATURES
      ===================================================== */}
      <section className="bg-white px-6 py-20 lg:px-8 lg:py-28">

        <div className="mx-auto max-w-7xl">

          <div className="max-w-2xl">

            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-emerald-700">
              More than a destination
            </p>

            <h2 className="mt-3 text-[32px] font-semibold tracking-tight md:text-[40px]">
              Travel at your own pace.
            </h2>

            <p className="mt-4 text-[15px] leading-7 text-gray-500">
              Whether you want adventure, nature, culture or
              simply a quiet escape, create an experience that
              belongs to you.
            </p>

          </div>


          {/* Feature cards */}
          <div className="mt-10 grid gap-5 md:grid-cols-3">

            {/* Card 1 */}
            <div className="rounded-[20px] border border-gray-100 bg-[#f7f7f3] p-7">

              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100">
                <Compass
                  size={19}
                  className="text-emerald-700"
                />
              </div>

              <h3 className="mt-6 text-[19px] font-semibold">
                Explore freely
              </h3>

              <p className="mt-3 text-[14px] leading-6 text-gray-500">
                Discover destinations, viewpoints and hidden
                corners across Meghalaya.
              </p>

            </div>


            {/* Card 2 */}
            <div className="rounded-[20px] border border-gray-100 bg-[#f7f7f3] p-7">

              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100">
                <Map
                  size={19}
                  className="text-emerald-700"
                />
              </div>

              <h3 className="mt-6 text-[19px] font-semibold">
                Find your route
              </h3>

              <p className="mt-3 text-[14px] leading-6 text-gray-500">
                Use the interactive map to discover places and
                plan where you want to go.
              </p>

            </div>


            {/* Card 3 */}
            <div className="rounded-[20px] border border-gray-100 bg-[#f7f7f3] p-7">

              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100">
                <Play
                  size={19}
                  className="text-emerald-700"
                />
              </div>

              <h3 className="mt-6 text-[19px] font-semibold">
                See it in 360°
              </h3>

              <p className="mt-3 text-[14px] leading-6 text-gray-500">
                Preview breathtaking locations through immersive
                panoramic experiences.
              </p>

            </div>

          </div>

        </div>
      </section>


      {/* =====================================================
          FINAL CTA
      ===================================================== */}
      <section className="px-6 py-20 lg:px-8 lg:py-28">

        <div className="mx-auto max-w-4xl text-center">

          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-emerald-700">
            Your journey starts here
          </p>

          <h2 className="mt-4 text-[32px] font-semibold leading-tight tracking-tight md:text-[40px]">
            Meghalaya is waiting to be explored.
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-[15px] leading-7 text-gray-500">
            Start exploring destinations, discover hidden places
            and experience Meghalaya from a whole new perspective.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">

            <Link
              to="/explore"
              className="inline-flex items-center gap-2 rounded-full bg-[#183c2c] px-6 py-3 text-[14px] font-medium text-white transition hover:bg-[#214d39]"
            >
              Start exploring
              <ArrowRight size={16} />
            </Link>

            <Link
              to="/signup"
              className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-6 py-3 text-[14px] font-medium text-[#183c2c] transition hover:border-gray-300 hover:bg-gray-50"
            >
              Create account
            </Link>

          </div>

        </div>
      </section>


      {/* =====================================================
          FOOTER
      ===================================================== */}
      <footer className="border-t border-gray-200 bg-[#f7f7f3]">

        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-6 py-8 sm:flex-row sm:items-center sm:justify-between lg:px-8">

          <Link
            to="/"
            className="text-lg font-semibold tracking-tight"
          >
            Meghalaya
            <span className="text-emerald-600">.</span>
          </Link>

          <div className="flex flex-wrap gap-6 text-[13px] text-gray-500">

            <Link
              to="/explore"
              className="transition hover:text-[#183c2c]"
            >
              Explore
            </Link>

            <Link
              to="/destinations"
              className="transition hover:text-[#183c2c]"
            >
              Destinations
            </Link>

            <Link
              to="/virtual-tours"
              className="transition hover:text-[#183c2c]"
            >
              360° Tours
            </Link>

            <Link
              to="/gallery"
              className="transition hover:text-[#183c2c]"
            >
              Gallery
            </Link>

            <Link
              to="/login"
              className="transition hover:text-[#183c2c]"
            >
              Sign in
            </Link>

          </div>

        </div>

      </footer>

    </div>
  );
};

export default Home;