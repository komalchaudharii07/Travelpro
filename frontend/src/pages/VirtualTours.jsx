import {
  ArrowRight,
  Compass,
  Map,
  Move3D,
  X,
} from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

import PanoramaViewer from "../components/panorama/PanoramaViewer";
import { fetchLocations, fetchLocationById } from "../services/api";

const VirtualTours = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [tours, setTours] = useState([]);
  const [selectedTour, setSelectedTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadTourData = async () => {
      try {
        setLoading(true);

        const data = await fetchLocations();
        const allTours = data || [];

        setTours(allTours);

        if (id) {
          const foundTour = allTours.find(
            (tour) => tour._id === id || tour.id === id
          );

          if (foundTour) {
            setSelectedTour(foundTour);
          } else {
            const singleData = await fetchLocationById(id);

            if (singleData) {
              setSelectedTour(singleData);
            } else {
              setError("Tour not found.");
            }
          }
        } else {
          setSelectedTour(null);
        }
      } catch (err) {
        console.error("Failed to load virtual tours:", err);
        setError("Failed to load virtual tour data.");
      } finally {
        setLoading(false);
      }
    };

    loadTourData();
  }, [id]);

  const handleOpenTour = (tour) => {
  setSelectedTour(tour);

  const tourId = tour._id || tour.id;

  navigate("/virtual-tours/" + tourId, {
    replace: true,
  });
};

const handleCloseTour = () => {
  setSelectedTour(null);

  navigate("/virtual-tours", {
    replace: true,
  });
};

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#f7f7f3]">
        <div className="h-9 w-9 animate-spin rounded-full border-2 border-gray-300 border-t-[#183c2c]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f7f7f3]">
        <p className="text-sm text-red-600">{error}</p>
      </div>
    );
  }

  const featuredTour = tours[0];
  const remainingTours = tours.slice(1);

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
              places through immersive 360° WebP experiences.
            </p>

          </div>

        </div>

      </section>


      {/* ================= FEATURED ================= */}

      {featuredTour && (
        <section className="px-6 pb-16 lg:px-8">

          <div className="mx-auto max-w-7xl">

            <div className="grid overflow-hidden rounded-[24px] border border-gray-200 bg-white md:grid-cols-[1.35fr_1fr]">

              <div className="relative h-[300px] md:h-[390px]">

                <img
                  src={
                    featuredTour.image ||
                    featuredTour.views?.[0]?.iframeUrl ||
                    "https://images.unsplash.com/photo-1544735716-392fe2489ffa"
                  }
                  alt={featuredTour.title}
                  className="h-full w-full object-cover"
                />

                <div className="absolute left-5 top-5">
                  <span className="rounded-full bg-black/45 px-3 py-1.5 text-[10px] font-medium text-white backdrop-blur-md">
                    Featured experience
                  </span>
                </div>

              </div>

              <div className="flex flex-col justify-center p-7 sm:p-9 lg:p-11">

                <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-emerald-700">
                  {featuredTour.location || "Meghalaya"}
                </p>

                <h2 className="mt-3 text-[28px] font-semibold tracking-tight">
                  {featuredTour.title}
                </h2>

                <p className="mt-3 text-[14px] leading-6 text-gray-500">
                  {featuredTour.mainDescription ||
                    featuredTour.description ||
                    "A dramatic landscape surrounded by Meghalaya's misty green hills."}
                </p>

                <button
                  onClick={() => handleOpenTour(featuredTour)}
                  className="mt-7 flex w-fit items-center gap-2 rounded-full bg-[#183c2c] px-5 py-2.5 text-[13px] font-medium text-white transition hover:bg-[#214d39]"
                >
                  Enter 360°
                  <Move3D size={15} />
                </button>

              </div>

            </div>

          </div>

        </section>
      )}


      {/* ================= TOUR CARDS ================= */}

      {remainingTours.length > 0 && (
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

              {remainingTours.map((tour) => (

                <article
                  key={tour._id || tour.id}
                  className="overflow-hidden rounded-[18px] border border-gray-200 bg-[#fafaf7] transition duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/5"
                >

                  <div className="relative h-[210px] overflow-hidden">

                    <img
                      src={
                        tour.image ||
                        "https://images.unsplash.com/photo-1544735716-392fe2489ffa"
                      }
                      alt={tour.title}
                      className="h-full w-full object-cover transition duration-500 hover:scale-[1.03]"
                    />

                    <div className="absolute bottom-4 left-4">

                      <span className="flex items-center gap-1.5 rounded-full bg-black/45 px-3 py-1.5 text-[10px] text-white backdrop-blur-md">
                        <Compass size={12} />
                        {tour.location || "Meghalaya"}
                      </span>

                    </div>

                  </div>

                  <div className="p-5">

                    <h3 className="text-[19px] font-semibold tracking-tight">
                      {tour.title}
                    </h3>

                    <p className="mt-2 text-[13px] leading-5 text-gray-500 line-clamp-2">
                      {tour.mainDescription || tour.description}
                    </p>

                    <button
                      onClick={() => handleOpenTour(tour)}
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
      )}


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
                360° WebP environment smoothly.
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


      {/* ================= 360 VIEWER MODAL ================= */}

      {selectedTour && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-3 backdrop-blur-sm sm:p-6">

          <div className="relative h-[650px] w-full max-w-5xl overflow-hidden rounded-2xl bg-black shadow-2xl">

            <button
              onClick={handleCloseTour}
              className="absolute right-4 top-4 z-50 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md hover:bg-black/70"
            >
              <X size={18} />
            </button>

            <PanoramaViewer
              image={
                selectedTour.views?.[0]?.iframeUrl ||
                selectedTour.image
              }
            />

          </div>

        </div>
      )}

    </div>
  );
};

export default VirtualTours;
