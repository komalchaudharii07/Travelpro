import { ArrowRight, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const destinations = [
  {
    id: "shillong",
    name: "Shillong",
    location: "East Khasi Hills",
    description:
      "A lively hill city surrounded by pine forests, waterfalls and beautiful viewpoints.",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Shillong%20from%20Shillong%20Peak.jpg?width=1400",
  },
  {
    id: "cherrapunji",
    name: "Cherrapunji",
    location: "East Khasi Hills",
    description:
      "Discover dramatic cliffs, misty valleys, caves and some of Meghalaya's most spectacular waterfalls.",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Seven%20Sister%20Waterfall%2C%20Cherrapunjee%2C%20Meghalaya.jpg?width=1400",
  },
  {
    id: "dawki",
    name: "Dawki",
    location: "West Jaintia Hills",
    description:
      "Known for the crystal-clear Umngot River, green hills and unforgettable riverside experiences.",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Dawki%20River.jpg?width=1400",
  },
  {
    id: "nongriat",
    name: "Nongriat",
    location: "East Khasi Hills",
    description:
      "Walk through dense forests to discover the famous living root bridges of Meghalaya.",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Root%20Bridges%20at%20Nonghriat.jpg?width=1400",
  },
];

const Destinations = () => {
  return (
    <div className="min-h-screen bg-[#f7f7f3] text-[#17221d]">

      {/* ================= NAVBAR ================= */}
      <header className="border-b border-gray-200 bg-[#f7f7f3]">

        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">

          {/* Logo */}
          <Link
            to="/"
            className="text-xl font-semibold tracking-tight"
          >
            Meghalaya<span className="text-emerald-600">.</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden items-center gap-8 md:flex">

            <Link
              to="/"
              className="text-sm text-gray-500 transition hover:text-[#183c2c]"
            >
              Home
            </Link>

            <Link
              to="/explore"
              className="text-sm text-gray-500 transition hover:text-[#183c2c]"
            >
              Explore
            </Link>

            <Link
              to="/destinations"
              className="text-sm font-medium text-[#183c2c]"
            >
              Destinations
            </Link>

            <Link
              to="/virtual-tours"
              className="text-sm text-gray-500 transition hover:text-[#183c2c]"
            >
              360° Tours
            </Link>

            <Link
              to="/gallery"
              className="text-sm text-gray-500 transition hover:text-[#183c2c]"
            >
              Gallery
            </Link>

          </nav>

          {/* Auth */}
          <div className="flex items-center gap-2">

            <Link
              to="/login"
              className="hidden rounded-full px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-100 hover:text-[#183c2c] sm:block"
            >
              Sign in
            </Link>

            <Link
              to="/signup"
              className="rounded-full bg-[#183c2c] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#214d39]"
            >
              Get started
            </Link>

          </div>

        </div>
      </header>

      {/* ================= PAGE INTRO ================= */}
      <section className="px-6 pb-16 pt-20 lg:px-8 lg:pb-20 lg:pt-24">

        <div className="mx-auto max-w-7xl">

          <div className="max-w-3xl">

            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-emerald-700">
              Explore Meghalaya
            </p>

            <h1 className="mt-4 text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
              Places worth
              <span className="text-emerald-700">
                {" "}getting lost in.
              </span>
            </h1>

            <p className="mt-5 max-w-2xl text-[16px] leading-7 text-gray-500">
              From lively hill towns to quiet villages, clear rivers
              and hidden waterfalls, discover the places that make
              Meghalaya unforgettable.
            </p>

          </div>

        </div>
      </section>

      {/* ================= FEATURED DESTINATION ================= */}
      <section className="px-6 pb-20 lg:px-8">

        <div className="mx-auto max-w-7xl">

          <Link
            to="/destination/cherrapunji"
            className="group relative block h-[420px] overflow-hidden rounded-[28px] sm:h-[480px] lg:h-[560px]"
          >

            <img
              src="https://commons.wikimedia.org/wiki/Special:FilePath/Seven%20Sisters%20Falls.jpg?width=2200"
              alt="Seven Sisters Falls, Meghalaya"
              className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-7 sm:p-10 lg:p-12">

              <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-emerald-300">
                Featured destination
              </p>

              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white md:text-4xl">
                Cherrapunji
              </h2>

              <p className="mt-3 max-w-xl text-[15px] leading-6 text-white/75">
                Chase waterfalls, explore ancient caves and walk
                through landscapes shaped by some of the heaviest
                rainfall on earth.
              </p>

              <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-[#183c2c] transition group-hover:bg-emerald-50">
                Explore Cherrapunji
                <ArrowRight size={16} />
              </span>

            </div>

          </Link>

        </div>
      </section>

      {/* ================= DESTINATION GRID ================= */}
      <section className="bg-white px-6 py-20 lg:px-8 lg:py-24">

        <div className="mx-auto max-w-7xl">

          {/* Section heading */}
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">

            <div>

              <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-emerald-700">
                More to discover
              </p>

              <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
                Explore the highlights.
              </h2>

            </div>

            <Link
              to="/explore"
              className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 transition hover:text-emerald-800"
            >
              View on map
              <ArrowRight size={16} />
            </Link>

          </div>

          {/* Cards */}
          <div className="mt-12 grid gap-6 md:grid-cols-2">

            {destinations.map((destination) => (
              <Link
                key={destination.id}
                to={`/destination/${destination.id}`}
                className="group overflow-hidden rounded-[22px] border border-gray-100 bg-[#f7f7f3] transition duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/5"
              >

                {/* Image */}
                <div className="relative h-[300px] overflow-hidden">

                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
                  />

                  {/* Image gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />

                  {/* Location */}
                  <div className="absolute bottom-5 left-5 flex items-center gap-1.5 text-xs font-medium text-white">
                    <MapPin size={14} />
                    {destination.location}
                  </div>

                </div>

                {/* Content */}
                <div className="p-6">

                  <div className="flex items-start justify-between gap-5">

                    <div>

                      <h3 className="text-2xl font-semibold tracking-tight text-[#17221d]">
                        {destination.name}
                      </h3>

                      <p className="mt-3 text-sm leading-6 text-gray-500">
                        {destination.description}
                      </p>

                    </div>

                    <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gray-200 bg-white text-[#183c2c] transition group-hover:border-emerald-200 group-hover:bg-emerald-50">
                      <ArrowRight size={16} />
                    </div>

                  </div>

                </div>

              </Link>
            ))}

          </div>

        </div>
      </section>

      {/* ================= MAP CTA ================= */}
      <section className="px-6 py-24 lg:px-8 lg:py-28">

        <div className="mx-auto max-w-7xl">

          <div className="rounded-[28px] bg-[#183c2c] px-7 py-14 text-center text-white sm:px-12 lg:px-16 lg:py-16">

            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-emerald-300">
              Plan your journey
            </p>

            <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
              There is more to Meghalaya than the famous places.
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-[15px] leading-7 text-white/60">
              Open the interactive map and discover viewpoints,
              waterfalls, villages, restaurants and places waiting
              to be explored.
            </p>

            <Link
              to="/explore"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#183c2c] transition hover:bg-emerald-50"
            >
              Explore interactive map
              <ArrowRight size={16} />
            </Link>

          </div>

        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="border-t border-gray-200 bg-[#f7f7f3]">

        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-6 py-8 sm:flex-row sm:items-center sm:justify-between lg:px-8">

          <Link
            to="/"
            className="text-lg font-semibold tracking-tight"
          >
            Meghalaya<span className="text-emerald-600">.</span>
          </Link>

          <div className="flex flex-wrap gap-6 text-sm text-gray-500">

            <Link
              to="/"
              className="transition hover:text-[#183c2c]"
            >
              Home
            </Link>

            <Link
              to="/explore"
              className="transition hover:text-[#183c2c]"
            >
              Explore
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

export default Destinations;