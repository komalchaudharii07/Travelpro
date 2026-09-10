import { useEffect, useRef } from "react";
import { Viewer } from "@photo-sphere-viewer/core";
import "@photo-sphere-viewer/core/index.css";

const PanoramaViewer = ({ image }) => {
  const containerRef = useRef(null);
  const viewerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || !image) return;

    let isMounted = true;
    const imagePath = image.startsWith("http") ? image : `${window.location.origin}${image}`;

    // Preload image bitmap to avoid WebP decoding crashes in Three.js loader
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = imagePath;

    img.onload = () => {
      if (!isMounted || !containerRef.current) return;

      viewerRef.current = new Viewer({
        container: containerRef.current,
        panorama: imagePath,
        navbar: ["zoom", "move", "fullscreen"],
        defaultZoomLvl: 50,
      });

      viewerRef.current.addEventListener("ready", () => {
        console.log("PANORAMA READY");
      });
    };

    img.onerror = (err) => {
      console.error("PANORAMA LOAD ERROR:", err);
    };

    return () => {
      isMounted = false;
      if (viewerRef.current) {
        viewerRef.current.destroy();
        viewerRef.current = null;
      }
    };
  }, [image]);

  return <div ref={containerRef} className="h-full w-full bg-black" />;
};

export default PanoramaViewer;