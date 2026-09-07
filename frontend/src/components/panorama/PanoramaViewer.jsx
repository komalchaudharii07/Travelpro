import { useEffect, useRef } from "react";
import { Viewer } from "@photo-sphere-viewer/core";

import "@photo-sphere-viewer/core/index.css";

const PanoramaViewer = ({
  image,
  title = "Meghalaya 360°",
}) => {
  const containerRef = useRef(null);
  const viewerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || !image) {
      return;
    }

    viewerRef.current = new Viewer({
      container: containerRef.current,
      panorama: image,

      navbar: [
        "zoom",
        "move",
        "fullscreen",
      ],

      defaultZoomLvl: 50,

      loadingImg: undefined,

      mousemove: true,
      mousewheel: true,

      touchmoveTwoFingers: false,

      caption: title,

      keyboard: true,
    });

    return () => {
      if (viewerRef.current) {
        viewerRef.current.destroy();
        viewerRef.current = null;
      }
    };
  }, [image, title]);

  return (
    <div className="relative h-full w-full overflow-hidden bg-black">
      <div
        ref={containerRef}
        className="h-full w-full"
      />

      {/* TOP LABEL */}

      <div className="pointer-events-none absolute left-5 top-5 z-20">
        <div className="rounded-full border border-white/15 bg-black/40 px-4 py-2 backdrop-blur-md">
          <p className="text-[10px] uppercase tracking-[0.3em] text-emerald-400">
            360° Experience
          </p>

          <p className="mt-1 text-sm font-medium text-white">
            {title}
          </p>
        </div>
      </div>

      {/* BOTTOM HINT */}

      <div className="pointer-events-none absolute bottom-5 left-1/2 z-20 -translate-x-1/2">
        <div className="rounded-full border border-white/10 bg-black/40 px-5 py-2.5 text-xs text-white/60 backdrop-blur-md">
          Drag to look around
        </div>
      </div>
    </div>
  );
};

export default PanoramaViewer;