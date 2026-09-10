import { useEffect, useRef } from "react";
import { Viewer } from "@photo-sphere-viewer/core";
import "@photo-sphere-viewer/core/index.css";

const PanoramaViewer = ({ image, title = "Meghalaya 360°" }) => {
  console.log("PanoramaViewer component is rendering! Image prop is:", image);
  const containerRef = useRef(null);
  const viewerRef = useRef(null);

  useEffect(() => {
   if (!containerRef.current || !image) {
      console.warn("PanoramaViewer: Missing container ref or image source", { image });
      return;
    }
    console.log("PanoramaViewer attempting to load source:", image);
    // Initialize Photo Sphere Viewer and capture in a local variable
    const viewer = new Viewer({
      container: containerRef.current,
      panorama: image,
      navbar: ["zoom", "move", "fullscreen"],
      defaultZoomLvl: 50,
      mousemove: true,
      mousewheel: true,
      touchmoveTwoFingers: false,
      caption: title,
      keyboard: true,
    });

    viewerRef.current = viewer;
    viewer.addEventListener('load-error', (e) => {
      console.error("Photo Sphere Viewer failed to load asset:", image, e);
    });
    // Robust cleanup function to destroy instance and clear DOM container
    return () => {
      if (viewer) {
        viewer.destroy();
      }
      if (viewerRef.current === viewer) {
        viewerRef.current = null;
      }
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
    };
  }, [image, title]);

  return (
    <div className="relative h-full w-full overflow-hidden bg-black">
      <div ref={containerRef} className="h-full w-full" />

      {/* Top Title Overlay */}
      <div className="pointer-events-none absolute left-5 top-5 z-20">
        <div className="rounded-full border border-white/15 bg-black/40 px-4 py-2 backdrop-blur-md">
          <p className="text-[10px] uppercase tracking-[0.3em] text-emerald-400">
            360° WebP Experience
          </p>
          <p className="mt-1 text-sm font-medium text-white">{title}</p>
        </div>
      </div>

      {/* Bottom Navigation Hint */}
      <div className="pointer-events-none absolute bottom-5 left-1/2 z-20 -translate-x-1/2">
        <div className="rounded-full border border-white/10 bg-black/40 px-5 py-2.5 text-xs text-white/60 backdrop-blur-md">
          Drag to look around
        </div>
      </div>
    </div>
  );
};

export default PanoramaViewer;