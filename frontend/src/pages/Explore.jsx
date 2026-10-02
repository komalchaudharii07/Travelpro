import MeghalayaMap from "../components/map/MeghalayaMap";

const Explore = () => {
  return (
    <div className="min-h-screen bg-[#f7f7f3]">
      {/* Header */}
      <header className="border-b border-gray-200 bg-[#f7f7f3]">
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-6 lg:px-8">
          <a
            href="/"
            className="text-xl font-semibold tracking-tight text-[#183c2c]"
          >
            Meghalaya<span className="text-emerald-600">.</span>
          </a>

          <nav className="hidden items-center gap-7 md:flex">
            <a
              href="/"
              className="text-[13px] text-gray-500 hover:text-[#183c2c]"
            >
              Home
            </a>

            <a
              href="/explore"
              className="text-[13px] font-medium text-[#183c2c]"
            >
              Explore
            </a>

            <a
              href="/destinations"
              className="text-[13px] text-gray-500 hover:text-[#183c2c]"
            >
              Destinations
            </a>

            <a
              href="/virtual-tours"
              className="text-[13px] text-gray-500 hover:text-[#183c2c]"
            >
              360° Tours
            </a>

            <a
              href="/gallery"
              className="text-[13px] text-gray-500 hover:text-[#183c2c]"
            >
              Gallery
            </a>
          </nav>

          <a
            href="/signup"
            className="rounded-full bg-[#183c2c] px-5 py-2.5 text-[13px] font-medium text-white hover:bg-[#214d39]"
          >
            Get started
          </a>
        </div>
      </header>

      {/* Intro */}
      <section className="px-6 pb-8 pt-12 lg:px-8 lg:pt-16">
        <div className="mx-auto max-w-7xl">
          <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-emerald-700">
            Interactive map
          </p>

          <h1 className="mt-3 text-[34px] font-semibold leading-tight tracking-tight text-[#17221d] md:text-[42px]">
            Explore Meghalaya
          </h1>

          <p className="mt-3 max-w-2xl text-[15px] leading-7 text-gray-500">
            Discover waterfalls, rivers, viewpoints, restaurants, hotels,
            villages and hidden places across Meghalaya.
          </p>
        </div>
      </section>

      {/* Map */}
      <section className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[24px] border border-gray-200 bg-white shadow-sm">
          <MeghalayaMap />
        </div>
      </section>
    </div>
  );
};

export default Explore;