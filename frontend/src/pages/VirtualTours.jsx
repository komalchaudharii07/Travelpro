import {
  ArrowRight,
  Compass,
  Map,
  Move3D,
  X,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

import PanoramaViewer from "../components/panorama/PanoramaViewer";

const tours = [
  {
    id: "seven-sisters",
    title: "Seven Sisters Falls",
    location: "Cherrapunji",
    description:
      "A dramatic waterfall surrounded by Meghalaya's misty hills.",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Seven%20Sister%20Waterfall%2C%20Cherrapunjee%2C%20Meghalaya.jpg?width=1200",
    panorama: "https://photo-sphere-viewer.js.org/assets/sphere.jpg",
  },
  {
    id: "umngot",
    title: "Umngot River",
    location: "Dawki",
    description:
      "Crystal-clear water flowing between the green hills of Dawki.",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Dawki%20River.jpg?width=1200",
    panorama: "https://photo-sphere-viewer.js.org/assets/sphere.jpg",
  },
  {
    id: "nongriat",
    title: "Living Root Bridge",
    location: "Nongriat",
    description:
      "Walk through dense forests to discover Meghalaya's living root bridges.",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Root%20Bridges%20at%20Nonghriat.jpg?width=1200",
    panorama: "https://photo-sphere-viewer.js.org/assets/sphere.jpg",
  },
  {
    id: "nohkalikai",
    title: "Nohkalikai Falls",
    location: "Cherrapunji",
    description:
      "A spectacular waterfall dropping into a deep turquoise pool.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/5/5e/Nohkalikai_Falls_Cherrapunji.JPG",
    panorama: "https://photo-sphere-viewer.js.org/assets/sphere.jpg",
  }, ,
];

const VirtualTours = () => {
  const [selectedTour, setSelectedTour] = useState(null);

  return (
    <div className="min-h-screen bg-[#f7f7f3] text-[#17221d]">

      {/* ================= NAVBAR ================= */}

      <header className="border-b border-gray-200 bg-[#f7f7f3]">
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-6 lg:px-8">

          <Link
            to="/"
            className="text-lg font-semibold tracking-tight"
          >
            Meghalaya<span className="text-emerald-600">.</span>
          </Link>

          <nav className="hidden items-center gap-7 md:flex">

            <Link
              to="/"
              className="text-[13px] text-gray-500 hover:text-[#183c2c]"
            >
              Home
            </Link>

            <Link
              to="/explore"
              className="text-[13px] text-gray-500 hover:text-[#183c2c]"
            >
              Explore
            </Link>

            <Link
              to="/destinations"
              className="text-[13px] text-gray-500 hover:text-[#183c2c]"
            >
              Destinations
            </Link>

            <Link
              to="/virtual-tours"
              className="text-[13px] font-medium text-[#183c2c]"
            >
              360° Tours
            </Link>

            <Link
              to="/gallery"
              className="text-[13px] text-gray-500 hover:text-[#183c2c]"
            >
              Gallery
            </Link>

          </nav>

          <div className="flex items-center gap-2">

            <Link
              to="/login"
              className="hidden rounded-full px-4 py-2 text-[13px] font-medium text-gray-600 hover:bg-gray-100 sm:block"
            >
              Sign in
            </Link>

            <Link
              to="/signup"
              className="rounded-full bg-[#183c2c] px-4 py-2 text-[13px] font-medium text-white hover:bg-[#214d39]"
            >
              Get started
            </Link>

          </div>

        </div>
      </header>


      {/* ================= INTRO ================= */}

      <section className="px-6 pb-12 pt-16 lg:px-8 lg:pt-20">

        <div className="mx-auto max-w-7xl">

          <div className="max-w-2xl">

            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-emerald-700">
              Meghalaya 360°
            </p>

            <h1 className="mt-3 text-[36px] font-semibold leading-[1.1] tracking-[-0.025em] md:text-[46px]">
              Explore before
              <span className="text-emerald-700"> you arrive.</span>
            </h1>

            <p className="mt-4 max-w-xl text-[15px] leading-6 text-gray-500">
              Step inside some of Meghalaya's most beautiful
              places through immersive 360° experiences.
            </p>

          </div>

        </div>

      </section>


      {/* ================= FEATURED ================= */}

      <section className="px-6 pb-16 lg:px-8">

        <div className="mx-auto max-w-7xl">

          <div className="grid overflow-hidden rounded-[24px] border border-gray-200 bg-white md:grid-cols-[1.35fr_1fr]">

            {/* Image */}

            <div className="relative h-[300px] md:h-[390px]">

              <img
                src={tours[0].image}
                alt={tours[0].title}
                className="h-full w-full object-cover"
              />

              <div className="absolute left-5 top-5">
                <span className="rounded-full bg-black/45 px-3 py-1.5 text-[10px] font-medium text-white backdrop-blur-md">
                  Featured experience
                </span>
              </div>

            </div>


            {/* Content */}

            <div className="flex flex-col justify-center p-7 sm:p-9 lg:p-11">

              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-emerald-700">
                Cherrapunji
              </p>

              <h2 className="mt-3 text-[28px] font-semibold tracking-tight">
                Seven Sisters Falls
              </h2>

              <p className="mt-3 text-[14px] leading-6 text-gray-500">
                A dramatic waterfall surrounded by Meghalaya's
                misty green hills.
              </p>

              <button
                onClick={() => setSelectedTour(tours[0])}
                className="mt-7 flex w-fit items-center gap-2 rounded-full bg-[#183c2c] px-5 py-2.5 text-[13px] font-medium text-white transition hover:bg-[#214d39]"
              >
                Enter 360°
                <Move3D size={15} />
              </button>

            </div>

          </div>

        </div>

      </section>


      {/* ================= TOUR CARDS ================= */}

      <section className="border-y border-gray-200 bg-white px-6 py-16 lg:px-8">

        <div className="mx-auto max-w-7xl">

          <div className="flex items-end justify-between">

            <div>

              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-emerald-700">
                Virtual journeys
              </p>

              <h2 className="mt-2 text-[28px] font-semibold tracking-tight md:text-[32px]">
                More places to explore.
              </h2>

            </div>

            <Link
              to="/explore"
              className="hidden items-center gap-2 text-[13px] font-medium text-emerald-700 sm:flex"
            >
              View map
              <ArrowRight size={15} />
            </Link>

          </div>


          <div className="mt-9 grid gap-5 md:grid-cols-3">

            {tours.slice(1).map((tour) => (

              <article
                key={tour.id}
                className="overflow-hidden rounded-[18px] border border-gray-200 bg-[#fafaf7] transition duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/5"
              >

                {/* Smaller image */}

                <div className="relative h-[210px] overflow-hidden">

                  <img
                    src={tour.image}
                    alt={tour.title}
                    className="h-full w-full object-cover transition duration-500 hover:scale-[1.03]"
                  />

                  <div className="absolute bottom-4 left-4">

                    <span className="flex items-center gap-1.5 rounded-full bg-black/45 px-3 py-1.5 text-[10px] text-white backdrop-blur-md">
                      <Compass size={12} />
                      {tour.location}
                    </span>

                  </div>

                </div>


                {/* Card content */}

                <div className="p-5">

                  <h3 className="text-[19px] font-semibold tracking-tight">
                    {tour.title}
                  </h3>

                  <p className="mt-2 text-[13px] leading-5 text-gray-500">
                    {tour.description}
                  </p>

                  <button
                    onClick={() => setSelectedTour(tour)}
                    className="mt-5 inline-flex items-center gap-2 text-[13px] font-semibold text-[#183c2c] hover:text-emerald-700"
                  >
                    Explore 360°
                    <ArrowRight size={14} />
                  </button>

                </div>

              </article>

            ))}

          </div>

        </div>

      </section>


      {/* ================= HOW IT WORKS ================= */}

      <section className="px-6 py-16 lg:px-8">

        <div className="mx-auto max-w-7xl">

          <div className="max-w-xl">

            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-emerald-700">
              How it works
            </p>

            <h2 className="mt-2 text-[28px] font-semibold tracking-tight">
              Look around. Discover more.
            </h2>

          </div>


          <div className="mt-9 grid gap-5 md:grid-cols-3">

            <div className="rounded-[18px] border border-gray-200 bg-white p-6">

              <Move3D
                size={20}
                className="text-emerald-700"
              />

              <h3 className="mt-5 text-[17px] font-semibold">
                Move around
              </h3>

              <p className="mt-2 text-[13px] leading-5 text-gray-500">
                Drag around the scene and explore the complete
                360° environment.
              </p>

            </div>


            <div className="rounded-[18px] border border-gray-200 bg-white p-6">

              <Compass
                size={20}
                className="text-emerald-700"
              />

              <h3 className="mt-5 text-[17px] font-semibold">
                Discover places
              </h3>

              <p className="mt-2 text-[13px] leading-5 text-gray-500">
                Discover waterfalls, rivers, forests and
                hidden corners.
              </p>

            </div>


            <div className="rounded-[18px] border border-gray-200 bg-white p-6">

              <Map
                size={20}
                className="text-emerald-700"
              />

              <h3 className="mt-5 text-[17px] font-semibold">
                Plan your trip
              </h3>

              <p className="mt-2 text-[13px] leading-5 text-gray-500">
                Find the location on the map and start planning
                your journey.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* ================= CTA ================= */}

      <section className="px-6 pb-20 lg:px-8">

        <div className="mx-auto max-w-7xl">

          <div className="rounded-[24px] bg-[#183c2c] px-7 py-12 text-center sm:px-10">

            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-emerald-300">
              Start exploring
            </p>

            <h2 className="mx-auto mt-3 max-w-xl text-[28px] font-semibold leading-tight tracking-tight text-white md:text-[32px]">
              Discover Meghalaya for yourself.
            </h2>

            <p className="mx-auto mt-3 max-w-lg text-[13px] leading-6 text-white/60">
              Explore destinations and find them on the
              interactive map.
            </p>

            <Link
              to="/explore"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-[13px] font-semibold text-[#183c2c] hover:bg-emerald-50"
            >
              Explore Meghalaya
              <ArrowRight size={15} />
            </Link>

          </div>

        </div>

      </section>


      {/* ================= FOOTER ================= */}

      <footer className="border-t border-gray-200">

        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-7 sm:flex-row sm:items-center sm:justify-between lg:px-8">

          <Link
            to="/"
            className="text-lg font-semibold"
          >
            Meghalaya<span className="text-emerald-600">.</span>
          </Link>

          <div className="flex gap-6 text-[12px] text-gray-500">

            <Link to="/">Home</Link>
            <Link to="/explore">Explore</Link>
            <Link to="/destinations">Destinations</Link>
            <Link to="/gallery">Gallery</Link>

          </div>

        </div>

      </footer>


      {/* ================= 360 VIEWER ================= */}

      {selectedTour && (

        <div className="fixed inset-0 z-50 bg-black/80 p-3 backdrop-blur-sm sm:p-6">

          <div className="relative h-full w-full overflow-hidden rounded-2xl bg-black">

            <button
              onClick={() => setSelectedTour(null)}
              className="absolute right-4 top-4 z-50 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md hover:bg-black/70"
            >
              <X size={18} />
            </button>

            <PanoramaViewer
              image={selectedTour.panorama}
              title={selectedTour.title}
            />

          </div>

        </div>

      )}

    </div>
  );
};

export default VirtualTours;