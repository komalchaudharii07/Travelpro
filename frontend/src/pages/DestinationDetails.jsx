import {
  ArrowLeft,
  ArrowRight,
  Compass,
  MapPin,
  Play,
  Star,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";

import Navbar from "../components/navbar/Navbar";

const destinations = {
  shillong: {
    name: "Shillong",
    region: "East Khasi Hills",
    tagline: "The hill city of Meghalaya.",
    description:
      "Surrounded by pine-covered hills, waterfalls and winding roads, Shillong is the cultural and urban heart of Meghalaya.",
    image:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e",
    experiences: [
      "Explore the city's beautiful viewpoints",
      "Walk through pine forests",
      "Discover local Khasi culture",
      "Experience Shillong's vibrant cafés and markets",
    ],
  },

  cherrapunji: {
    name: "Cherrapunji",
    region: "East Khasi Hills",
    tagline: "Where clouds meet the mountains.",
    description:
      "A landscape of dramatic cliffs, mist-covered valleys, caves and spectacular waterfalls, Cherrapunji is one of Meghalaya's most iconic destinations.",
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b",
    experiences: [
      "Discover spectacular waterfalls",
      "Explore natural caves",
      "Walk through misty mountain trails",
      "Visit living root bridges",
    ],
  },

  dawki: {
    name: "Dawki",
    region: "West Jaintia Hills",
    tagline: "Where the river looks like glass.",
    description:
      "Dawki is famous for the incredibly clear waters of the Umngot River, surrounded by green hills and peaceful landscapes.",
    image:
      "https://images.unsplash.com/photo-1500534623283-312aade485b7",
    experiences: [
      "Experience the crystal-clear Umngot River",
      "Take a boat ride through the hills",
      "Explore riverside landscapes",
      "Discover nearby villages and viewpoints",
    ],
  },

  nongriat: {
    name: "Nongriat",
    region: "East Khasi Hills",
    tagline: "A bridge grown by nature.",
    description:
      "Deep inside the tropical forests of Meghalaya lies Nongriat, home to extraordinary living root bridges shaped by generations of Khasi communities.",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    experiences: [
      "Walk across living root bridges",
      "Trek through dense forests",
      "Discover hidden waterfalls",
      "Experience the remote mountain villages",
    ],
  },
};

const DestinationDetails = () => {
  const { id } = useParams();

  const destination = destinations[id];

  if (!destination) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#07110d] px-6 text-white">
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-emerald-400">
            Meghalaya
          </p>

          <h1 className="mt-4 text-4xl font-medium md:text-6xl">
            Destination not found.
          </h1>

          <Link
            to="/destinations"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition hover:bg-emerald-400"
          >
            <ArrowLeft size={17} />
            Back to destinations
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-hidden bg-[#07110d] text-white">
      <Navbar />

      {/* ================= HERO ================= */}

      <section className="relative h-[78vh] min-h-[650px] overflow-hidden">
        <img
          src={destination.image}
          alt={destination.name}
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-black/25" />

        <div className="absolute inset-0 bg-gradient-to-t from-[#07110d] via-black/20 to-black/20" />

        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 px-6 pb-14 md:px-10 md:pb-20">
          <div className="mx-auto max-w-7xl">

            <Link
              to="/destinations"
              className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/20 px-4 py-2 text-xs text-white/70 backdrop-blur-md transition hover:bg-white hover:text-black"
            >
              <ArrowLeft size={14} />
              All destinations
            </Link>

            <div className="flex items-end justify-between gap-8">
              <div>

                <div className="flex items-center gap-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />

                  <p className="text-xs uppercase tracking-[0.35em] text-emerald-400">
                    {destination.region}
                  </p>
                </div>

                <h1 className="mt-4 text-6xl font-medium leading-[0.9] tracking-tight md:text-[110px]">
                  {destination.name}
                </h1>

                <p className="mt-5 max-w-xl text-lg text-white/60 md:text-xl">
                  {destination.tagline}
                </p>
              </div>

              <div className="hidden md:flex h-16 w-16 items-center justify-center rounded-full border border-white/20 bg-black/20 backdrop-blur-md">
                <Compass size={24} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= INTRO ================= */}

      <section className="px-6 py-24 md:px-10 md:py-36">
        <div className="mx-auto max-w-7xl">

          <div className="grid gap-14 md:grid-cols-12 md:items-start">

            <div className="md:col-span-7">
              <p className="mb-6 text-xs uppercase tracking-[0.35em] text-emerald-400">
                About the destination
              </p>

              <h2 className="text-4xl font-medium leading-[1] tracking-tight md:text-7xl">
                Experience
                <br />
                <span className="text-white/30">
                  {destination.name}.
                </span>
              </h2>
            </div>

            <div className="md:col-span-5">
              <p className="text-lg leading-8 text-white/50">
                {destination.description}
              </p>

              <div className="mt-8 flex items-center gap-3 text-sm text-white/40">
                <MapPin
                  size={17}
                  className="text-emerald-400"
                />

                <span>{destination.region}, Meghalaya</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= EXPERIENCES ================= */}

      <section className="border-y border-white/10 px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-7xl">

          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="mb-5 text-xs uppercase tracking-[0.35em] text-emerald-400">
                What to experience
              </p>

              <h2 className="text-4xl font-medium md:text-6xl">
                Make the journey
                <br />
                <span className="text-white/30">
                  worth remembering.
                </span>
              </h2>
            </div>

            <p className="max-w-sm text-sm leading-6 text-white/35">
              Take your time. Explore the landscape,
              discover local places and create your own
              Meghalaya story.
            </p>
          </div>

          <div className="mt-16 divide-y divide-white/10 border-y border-white/10">

            {destination.experiences.map(
              (experience, index) => (
                <div
                  key={experience}
                  className="group grid gap-5 py-7 transition duration-300 md:grid-cols-12 md:items-center md:py-9"
                >

                  <div className="text-xs text-white/25 md:col-span-1">
                    0{index + 1}
                  </div>

                  <div className="md:col-span-9">
                    <h3 className="text-xl font-medium transition group-hover:text-emerald-400 md:text-3xl">
                      {experience}
                    </h3>
                  </div>

                  <div className="flex md:col-span-2 md:justify-end">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 transition duration-300 group-hover:border-emerald-400 group-hover:bg-emerald-400 group-hover:text-black">
                      <ArrowRight size={17} />
                    </span>
                  </div>

                </div>
              )
            )}

          </div>
        </div>
      </section>

      {/* ================= 360 EXPERIENCE ================= */}

      <section className="px-6 py-24 md:px-10 md:py-36">
        <div className="mx-auto max-w-7xl">

          <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10">

            <div className="relative h-[520px] md:h-[600px]">

              <img
                src={destination.image}
                alt={`${destination.name} 360 experience`}
                className="absolute inset-0 h-full w-full object-cover opacity-60"
              />

              <div className="absolute inset-0 bg-black/50" />

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-md transition duration-300 hover:scale-110 hover:bg-emerald-400 hover:text-black">
                  <Play
                    size={25}
                    fill="currentColor"
                  />
                </div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">

                <p className="text-xs uppercase tracking-[0.35em] text-emerald-400">
                  Immersive experience
                </p>

                <h2 className="mt-4 text-4xl font-medium md:text-7xl">
                  Step inside
                  <br />
                  <span className="text-white/40">
                    {destination.name}.
                  </span>
                </h2>

                <Link
                  to="/virtual-tours"
                  className="mt-7 inline-flex items-center gap-3 rounded-full bg-white px-6 py-3.5 text-sm font-medium text-black transition hover:bg-emerald-400"
                >
                  <Play
                    size={15}
                    fill="currentColor"
                  />
                  Enter 360° experience
                  <ArrowRight size={16} />
                </Link>

              </div>

            </div>
          </div>

        </div>
      </section>

      {/* ================= MAP CTA ================= */}

      <section className="px-6 pb-24 md:px-10 md:pb-36">
        <div className="mx-auto max-w-7xl">

          <div className="rounded-[2.5rem] border border-white/10 bg-[#10251c] p-8 md:p-14">

            <div className="grid gap-10 md:grid-cols-12 md:items-center">

              <div className="md:col-span-8">

                <div className="flex items-center gap-3">
                  <MapPin
                    size={18}
                    className="text-emerald-400"
                  />

                  <span className="text-xs uppercase tracking-[0.3em] text-emerald-400">
                    Explore on map
                  </span>
                </div>

                <h2 className="mt-5 text-4xl font-medium md:text-6xl">
                  Find your way to
                  <br />
                  <span className="text-white/30">
                    {destination.name}.
                  </span>
                </h2>

              </div>

              <div className="md:col-span-4 md:flex md:justify-end">

                <Link
                  to="/explore"
                  className="inline-flex items-center gap-3 rounded-full bg-white px-7 py-3.5 text-sm font-medium text-black transition hover:bg-emerald-400"
                >
                  <Compass size={17} />
                  Open Explore Map
                  <ArrowRight size={17} />
                </Link>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ================= NEXT DESTINATION ================= */}

      <section className="border-t border-white/10 px-6 py-20 md:px-10">

        <div className="mx-auto flex max-w-7xl items-center justify-between">

          <Link
            to="/destinations"
            className="group flex items-center gap-3 text-sm text-white/50 transition hover:text-white"
          >
            <ArrowLeft size={17} />
            Back to all destinations
          </Link>

          <div className="hidden items-center gap-2 text-xs uppercase tracking-[0.25em] text-white/25 md:flex">
            <Star size={13} />
            Meghalaya
          </div>

        </div>

      </section>

    </div>
  );
};

export default DestinationDetails;