import { ArrowUpRight, MapPin } from "lucide-react";

const destinations = [
  {
    name: "Cherrapunji",
    category: "Waterfalls",
    location: "East Khasi Hills",
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b",
  },
  {
    name: "Dawki",
    category: "Rivers",
    location: "West Jaintia Hills",
    image:
      "https://images.unsplash.com/photo-1500534623283-312aade485b7",
  },
  {
    name: "Shillong",
    category: "Hill City",
    location: "East Khasi Hills",
    image:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e",
  },
  {
    name: "Nongriat",
    category: "Living Root Bridges",
    location: "East Khasi Hills",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
  },
];

const DestinationSection = () => {
  return (
    <section className="bg-[#06130f] px-6 py-28 md:px-10 md:py-32">
      <div className="mx-auto max-w-7xl">

        {/* TOP LABEL */}
        <div className="mb-8 flex items-center gap-3">
          <span className="h-px w-8 bg-emerald-300" />

          <span className="text-[10px] uppercase tracking-[0.35em] text-emerald-300">
            Featured destinations
          </span>
        </div>

        {/* HEADER */}
        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">

          {/* LEFT */}
          <div>
            <h2 className="max-w-3xl font-serif text-[42px] leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl">
              Handpicked places,
              <br />
              <span className="italic text-emerald-200">
                unforgettable experiences.
              </span>
            </h2>
          </div>

          {/* RIGHT */}
          <div className="flex items-end justify-between gap-8 lg:pb-1">
            <p className="max-w-md text-sm leading-7 text-white/45">
              From misty hills to crystal-clear rivers, discover
              the landscapes and places that make Meghalaya
              unforgettable.
            </p>

            <button className="group hidden shrink-0 items-center gap-3 text-xs text-white md:flex">
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 transition duration-300 group-hover:border-emerald-300 group-hover:bg-emerald-300 group-hover:text-black">
                <ArrowUpRight size={15} />
              </span>

              <span className="whitespace-nowrap">
                Explore All
              </span>
            </button>
          </div>
        </div>

        {/* BIG GAP — IMPORTANT */}
        <div className="h-14 md:h-16" />

        {/* DESTINATION CARDS */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
          {destinations.map((destination) => (
            <article
              key={destination.name}
              className="group relative aspect-[0.9] overflow-hidden rounded-[18px] border border-white/[0.08] bg-[#0a1b15]"
            >

              {/* IMAGE */}
              <img
                src={destination.image}
                alt={destination.name}
                className="absolute inset-0 h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.06]"
              />

              {/* OVERLAY */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/15 to-transparent" />

              {/* CATEGORY */}
              <div className="absolute left-3 top-3 md:left-4 md:top-4">
                <span className="rounded-full border border-white/20 bg-black/25 px-2.5 py-1 text-[8px] text-white/80 backdrop-blur-md md:text-[9px]">
                  {destination.category}
                </span>
              </div>

              {/* CARD CONTENT */}
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">

                <div className="flex items-end justify-between gap-3">

                  <div>
                    <h3 className="font-serif text-xl leading-none text-white md:text-2xl">
                      {destination.name}
                    </h3>

                    <div className="mt-2 flex items-center gap-1.5 text-[9px] text-white/50">
                      <MapPin
                        size={10}
                        className="text-emerald-300"
                      />

                      <span>{destination.location}</span>
                    </div>
                  </div>

                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/25 bg-black/20 text-white backdrop-blur-md transition duration-300 group-hover:border-emerald-300 group-hover:bg-emerald-300 group-hover:text-black">
                    <ArrowUpRight size={14} />
                  </div>

                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
};

export default DestinationSection;