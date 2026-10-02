import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const places = [
  {
    name: "Shillong",
    location: "East Khasi Hills",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Shillong%20City%20from%20Don%20Bosco%20Museum.jpg?width=1200",
  },
  {
    name: "Seven Sisters Falls",
    location: "Sohra",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Seven%20Sister%20Waterfall%2C%20Cherrapunjee%2C%20Meghalaya.jpg?width=1600",
  },
  {
    name: "Nohkalikai Falls",
    location: "Cherrapunji",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/5/5e/Nohkalikai_Falls_Cherrapunji.JPG",
  },
  {
    name: "Dawki",
    location: "West Jaintia Hills",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Dawki%20River%2C%20Meghalaya.jpg?width=1200",
  },
  {
    name: "Nongriat",
    location: "East Khasi Hills",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Living%20root%20bridges%20of%20Nongriat%20village%20in%20East%20Khasi%20Hills%20district%2C%20Meghalaya%20JEG7388.jpg?width=1200",
  },
  {
    name: "Laitlum Canyon",
    location: "Near Shillong",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Laitlum.jpg?width=1400",
  },

  {
    name: "Elephant Falls",
    location: "Shillong",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Elephant%20Falls%20from%20Meghalaya.jpg?width=1400",
  },

  {
    name: "Mawsmai Cave",
    location: "Cherrapunji",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Mawsmai%20Cave%20in%20Meghalaya%2C%20India.jpg?width=1400",
  },

  {
    name: "Umiam Lake",
    location: "Near Shillong",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Umiam%20Lake%2C%20Shillong%2C%20Meghalaya.jpg?width=1400",
  },

  {
    name: "Mawlynnong",
    location: "East Khasi Hills",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Mawlynnong.jpg?width=1400",
  },

  {
    name: "Dawki River",
    location: "Dawki",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Dawki%20River%2C%20Dawki%2C%20Meghalaya.jpg?width=1400",
  },

  {
    name: "Kynrem Falls",
    location: "Sohra",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Kynrem%20Falls%20in%20monsoon.jpg?width=1400",
  },

  {
    name: "Phe Phe Falls",
    location: "Jowai",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Phe%20Phe%20falls.jpg?width=1400",
  },

  {
    name: "Dainthlen Falls",
    location: "Sohra",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Dainthlen%20Falls.jpg?width=1400",
  },

  {
    name: "Seven Sisters — Misty View",
    location: "Cherrapunji",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Seven%20Sister%20Waterfall%20Clouds%2C%20Cherrapunjee%2C%20Meghalaya.jpg?width=1600",
  },
  {
    name: "Umiam Lake",
    location: "Near Shillong",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Umiam%20Lake%2C%20Shillong%2C%20Meghalaya.jpg?width=1200",
  },
  {
    name: "Elephant Falls",
    location: "Shillong",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Elephant%20Falls%20from%20Meghalaya.jpg?width=1200",
  },
  {
    name: "Kynrem Falls",
    location: "Sohra",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Kynrem%20Falls.jpg?width=1200",
  },
  {
    name: "Mawlynnong",
    location: "East Khasi Hills",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Mawlynnong%20Village%2C%20Meghalaya.jpg?width=1200",
  },
  {
    name: "Mawsmai Cave",
    location: "Cherrapunji",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Mawsmai%20Cave%20in%20Meghalaya%2C%20India.jpg?width=1200",
  },
  {
    name: "Mawphlang Sacred Forest",
    location: "Mawphlang",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Mawphlang%20Sacred%20Forest%2C%20Mawphlang%2C%20Meghalaya.jpg?width=1200",
  },
  {
    name: "Mawsynram",
    location: "East Khasi Hills",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Mawsynram%2C%20Meghalaya.jpg?width=1200",
  },
  {
    name: "Nartiang Monoliths",
    location: "West Jaintia Hills",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Nartiang%20Monoliths%20in%20Meghalaya%20are%20tallest%20in%20the%20world.jpg?width=1200",
  },
  {
    name: "Nartiang Durga Temple",
    location: "Nartiang",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Nartiang%20Durga%20Temple.jpg?width=1200",
  },
  {
    name: "Jowai",
    location: "West Jaintia Hills",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Jitendra%20Singh%20during%20the%20Meghalaya%20Annual%20Cultural%20Festival%20%E2%80%9CBehdienkhlam%E2%80%9D%2C%20at%20Jowai.JPG?width=1200",
  },
  {
    name: "Nongpoh",
    location: "Ri-Bhoi",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Nongpoh%2C%20Meghalaya.jpg?width=1200",
  },
  {
    name: "Phe Phe Falls",
    location: "Jowai",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Phe%20Phe%20falls.jpg?width=1200",
  },
  {
    name: "Laitlum Canyon",
    location: "Near Shillong",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Laitlum.jpg?width=1200",
  },
  {
    name: "Ward's Lake",
    location: "Shillong",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Ward%27s%20Lake%2C%20Shillong.jpg?width=1200",
  },
  {
    name: "Cathedral of Mary",
    location: "Shillong",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Cathedral%20of%20Mary%20Help%20of%20Christians.jpg?width=1200",
  },
  {
    name: "Don Bosco Museum",
    location: "Shillong",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Shillong%20City%20from%20Don%20Bosco%20Museum.jpg?width=1200",
  },
  {
    name: "Ramakrishna Mission",
    location: "Shillong",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Ramakrishna%20Mission%20Ashrama%2C%20Laitumkhrah%2C%20Shillong.jpg?width=1200",
  },
  {
    name: "Mawjymbuin Cave",
    location: "Mawsynram",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Nature%20made%20Shivalinga%20in%20Mawjymbuin%20Cave%20Mawsynram%20Meghalaya%20India.jpg?width=1200",
  },
  {
    name: "Krang Suri Falls",
    location: "West Jaintia Hills",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Krang%20Suri%20Waterfall.jpg?width=1200",
  },
  {
    name: "Wei Sawdong Falls",
    location: "Cherrapunji",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Wei%20Sawdong%20Falls.jpg?width=1200",
  },
  {
    name: "Dainthlen Falls",
    location: "Sohra",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Dainthlen%20Falls.jpg?width=1200",
  },
];

const Gallery = () => {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const selectedPlace =
    selectedIndex !== null ? places[selectedIndex] : null;

  const closeLightbox = () => {
    setSelectedIndex(null);
  };

  const showPrevious = () => {
    setSelectedIndex((current) =>
      current === 0 ? places.length - 1 : current - 1
    );
  };

  const showNext = () => {
    setSelectedIndex((current) =>
      current === places.length - 1 ? 0 : current + 1
    );
  };

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
              className="text-[13px] text-gray-500 hover:text-[#183c2c]"
            >
              360° Tours
            </Link>

            <Link
              to="/gallery"
              className="text-[13px] font-medium text-[#183c2c]"
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
              Visual journey
            </p>

            <h1 className="mt-3 text-[36px] font-semibold leading-[1.1] tracking-[-0.025em] md:text-[46px]">
              Meghalaya,
              <span className="text-emerald-700">
                {" "}through our lens.
              </span>
            </h1>

            <p className="mt-4 max-w-xl text-[15px] leading-6 text-gray-500">
              Waterfalls, living root bridges, misty hills and
              quiet villages — explore the landscapes that make
              Meghalaya unforgettable.
            </p>

          </div>

        </div>

      </section>


      {/* ================= GALLERY ================= */}

      <section className="px-6 pb-20 lg:px-8">

        <div className="mx-auto max-w-7xl">

          <div className="mb-8 flex items-center justify-between">

            <p className="text-[13px] text-gray-500">
              {places.length} places to explore
            </p>

            <Link
              to="/explore"
              className="hidden items-center gap-2 text-[13px] font-medium text-emerald-700 sm:flex"
            >
              Explore on map
              <ArrowLeft
                size={14}
                className="rotate-180"
              />
            </Link>

          </div>


          {/* Clean uniform grid */}

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">

            {places.map((place, index) => (

              <button
                key={`${place.name}-${index}`}
                onClick={() => setSelectedIndex(index)}
                className="group text-left"
              >

                <div className="relative aspect-[4/3] overflow-hidden rounded-[18px] bg-gray-200">

                  <img
                    src={place.image}
                    alt={place.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                  />

                  {/* Hover overlay */}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />

                  <div className="absolute bottom-4 left-4 right-4 translate-y-2 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">

                    <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-emerald-300">
                      {place.location}
                    </p>

                    <p className="mt-1 text-[17px] font-semibold text-white">
                      {place.name}
                    </p>

                  </div>

                </div>


                {/* Caption below image */}

                <div className="px-1 pt-3">

                  <h2 className="text-[15px] font-semibold text-[#17221d]">
                    {place.name}
                  </h2>

                  <p className="mt-1 text-[12px] text-gray-500">
                    {place.location}
                  </p>

                </div>

              </button>

            ))}

          </div>

        </div>

      </section>


      {/* ================= CTA ================= */}

      <section className="px-6 pb-20 lg:px-8">

        <div className="mx-auto max-w-7xl">

          <div className="rounded-[24px] bg-[#183c2c] px-7 py-12 text-center sm:px-10">

            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-emerald-300">
              Keep exploring
            </p>

            <h2 className="mx-auto mt-3 max-w-xl text-[28px] font-semibold leading-tight tracking-tight text-white md:text-[32px]">
              There is always another place to discover.
            </h2>

            <p className="mx-auto mt-3 max-w-lg text-[13px] leading-6 text-white/60">
              Find waterfalls, viewpoints, villages and hidden
              places across Meghalaya.
            </p>

            <Link
              to="/explore"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-[13px] font-semibold text-[#183c2c] hover:bg-emerald-50"
            >
              Open interactive map
              <ArrowLeft
                size={15}
                className="rotate-180"
              />
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
            <Link to="/virtual-tours">360° Tours</Link>

          </div>

        </div>

      </footer>


      {/* ================= LIGHTBOX ================= */}

      {selectedPlace && (

        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          onClick={closeLightbox}
        >

          <div
            className="relative w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >

            {/* Close */}

            <button
              onClick={closeLightbox}
              className="absolute right-3 top-3 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md transition hover:bg-black/70"
            >
              <X size={19} />
            </button>


            {/* Image */}

            <div className="overflow-hidden rounded-[18px] bg-black">

              <img
                src={selectedPlace.image}
                alt={selectedPlace.name}
                className="max-h-[78vh] w-full object-contain"
              />

            </div>


            {/* Info */}

            <div className="mt-4 text-center">

              <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-emerald-400">
                {selectedPlace.location}
              </p>

              <h2 className="mt-1 text-xl font-semibold text-white">
                {selectedPlace.name}
              </h2>

            </div>


            {/* Previous */}

            <button
              onClick={showPrevious}
              className="absolute left-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md transition hover:bg-black/70 sm:-left-5"
            >
              <ChevronLeft size={20} />
            </button>


            {/* Next */}

            <button
              onClick={showNext}
              className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md transition hover:bg-black/70 sm:-right-5"
            >
              <ChevronRight size={20} />
            </button>

          </div>

        </div>

      )}

    </div>
  );
};

export default Gallery;