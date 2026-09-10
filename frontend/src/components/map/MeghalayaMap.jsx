import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  LocateFixed,
  Map as MapIcon,
  Satellite,
  X,
  Navigation,
  ArrowRight,
} from "lucide-react";
import { fetchLocations } from "../../services/api";

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const MEGHALAYA_CENTER = {
  lat: 25.467,
  lng: 91.366,
};

const MeghalayaMap = () => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markerRef = useRef(null);
  const dbMarkersRef = useRef([]);
  const googleRef = useRef(null);
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [mapType, setMapType] = useState("roadmap");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [dbLocations, setDbLocations] = useState([]);

  // =====================================================
  // FETCH DATABASE LOCATIONS ON MOUNT
  // =====================================================
  useEffect(() => {
    const getDbLocations = async () => {
      try {
        const data = await fetchLocations();
        setDbLocations(data || []);
      } catch (err) {
        console.error("Failed to fetch database locations:", err);
      }
    };
    getDbLocations();
  }, []);

  // =====================================================
  // INITIALIZE GOOGLE MAP ONCE
  // =====================================================
  useEffect(() => {
    let cancelled = false;

    const loadMap = async () => {
      try {
        if (!API_KEY) {
          setError(
            "Google Maps API key is missing. Check your .env file."
          );
          setLoading(false);
          return;
        }

        const { setOptions, importLibrary } = await import(
          "@googlemaps/js-api-loader"
        );

        setOptions({
          key: API_KEY,
          v: "weekly",
          language: "en",
          region: "IN",
        });

        const { Map } = await importLibrary("maps");
        await importLibrary("places");
        const { AdvancedMarkerElement } = await importLibrary("marker");

        if (cancelled || !mapRef.current) {
          return;
        }

        googleRef.current = {
          Map,
          AdvancedMarkerElement,
        };

        const map = new Map(mapRef.current, {
          center: MEGHALAYA_CENTER,
          zoom: 9,
          mapTypeId: "roadmap",
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: true,
          zoomControl: true,
          gestureHandling: "greedy",
          mapId: "DEMO_MAP_ID",
        });

        mapInstanceRef.current = map;
        setLoading(false);
        setError("");
      } catch (err) {
        console.error("Google Maps loading error:", err);
        setError(
          err?.message ||
            "Google Maps could not be loaded. Check your API key and Google Cloud settings."
        );
        setLoading(false);
      }
    };

    loadMap();

    return () => {
      cancelled = true;
    };
  }, []);

  // =====================================================
  // RENDER DATABASE MARKERS WHEN MAP & DATA ARE READY
  // =====================================================
  useEffect(() => {
    if (!mapInstanceRef.current || !googleRef.current || !dbLocations.length) {
      return;
    }

    // Clear old markers if any
    dbMarkersRef.current.forEach((m) => {
      m.map = null;
    });
    dbMarkersRef.current = [];

    const map = mapInstanceRef.current;

    dbLocations.forEach((loc) => {
      const lat = loc.mapCoordinates?.lat ?? loc.lat ?? loc.latitude;
      const lng = loc.mapCoordinates?.lng ?? loc.lng ?? loc.longitude;
      const tourId = loc._id || loc.id;

      if (lat !== undefined && lng !== undefined && tourId) {
        const dbMarker = new googleRef.current.AdvancedMarkerElement({
          map: map,
          position: {
            lat: Number(lat),
            lng: Number(lng),
          },
          title: loc.title || loc.name,
        });

        dbMarker.addListener("click", () => {
          map.panTo({ lat: Number(lat), lng: Number(lng) });
          map.setZoom(14);

          setSelectedPlace({
            id: tourId,
            name: loc.title || loc.name,
            address: loc.location || loc.address || "Meghalaya, India",
            photo: loc.image || loc.views?.[0]?.iframeUrl || null,
            location: {
              lat: Number(lat),
              lng: Number(lng),
            },
            isDatabaseTour: true,
          });
        });

        dbMarkersRef.current.push(dbMarker);
      }
    });
  }, [dbLocations]);

  // =====================================================
  // CHANGE MAP TYPE
  // =====================================================
  useEffect(() => {
    if (!mapInstanceRef.current) {
      return;
    }
    mapInstanceRef.current.setMapTypeId(mapType);
  }, [mapType]);

  // =====================================================
  // SEARCH PLACE
  // =====================================================
  const searchPlace = async () => {
    if (!query.trim()) {
      return;
    }

    if (!mapInstanceRef.current) {
      setError("Map is not ready yet.");
      return;
    }

    try {
      setError("");
      const { Place } = await importLibraryPlaces();

      const request = {
        textQuery: `${query}, Meghalaya, India`,
        fields: [
          "displayName",
          "formattedAddress",
          "location",
          "photos",
          "id",
        ],
        locationBias: {
          center: MEGHALAYA_CENTER,
          radius: 50000,
        },
        maxResultCount: 1,
        language: "en",
      };

      const { places } = await Place.searchByText(request);

      if (!places || places.length === 0) {
        setError(`"${query}" was not found in Meghalaya.`);
        return;
      }

      const place = places[0];

      if (!place.location) {
        setError("Location coordinates are not available.");
        return;
      }

      if (markerRef.current) {
        markerRef.current.map = null;
        markerRef.current = null;
      }

      const marker = new googleRef.current.AdvancedMarkerElement({
        map: mapInstanceRef.current,
        position: place.location,
        title: place.displayName,
      });

      markerRef.current = marker;

      mapInstanceRef.current.panTo(place.location);
      mapInstanceRef.current.setZoom(15);

      let photoUrl = null;
      if (place.photos?.length) {
        try {
          photoUrl = place.photos[0].getURI({
            maxWidth: 700,
            maxHeight: 450,
          });
        } catch (photoError) {
          console.log("Photo unavailable:", photoError);
        }
      }

      setSelectedPlace({
        name: place.displayName || query,
        address: place.formattedAddress || "Meghalaya, India",
        photo: photoUrl,
        location: {
          lat: place.location.lat(),
          lng: place.location.lng(),
        },
        isDatabaseTour: false,
      });
    } catch (err) {
      console.error("Place search error:", err);
      setError(err?.message || "Could not search this place.");
    }
  };

  const importLibraryPlaces = async () => {
    const { importLibrary } = await import("@googlemaps/js-api-loader");
    const { Place } = await importLibrary("places");
    return { Place };
  };

  const locateMe = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    if (!mapInstanceRef.current) {
      setError("Map is not ready yet.");
      return;
    }

    setError("");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        if (markerRef.current) {
          markerRef.current.map = null;
          markerRef.current = null;
        }

        const marker = new googleRef.current.AdvancedMarkerElement({
          map: mapInstanceRef.current,
          position: location,
          title: "Your Location",
        });

        markerRef.current = marker;
        mapInstanceRef.current.panTo(location);
        mapInstanceRef.current.setZoom(14);

        setSelectedPlace({
          name: "Your Location",
          address: "Current browser location",
          photo: null,
          location,
          isDatabaseTour: false,
        });
      },
      (geoError) => {
        console.error(geoError);
        setError("Unable to access your location. Please allow location permission.");
      }
    );
  };

  const clearSearch = () => {
    setQuery("");
    setSelectedPlace(null);
    setError("");

    if (markerRef.current) {
      markerRef.current.map = null;
      markerRef.current = null;
    }

    if (mapInstanceRef.current) {
      mapInstanceRef.current.panTo(MEGHALAYA_CENTER);
      mapInstanceRef.current.setZoom(9);
    }
  };

  const resetMap = () => {
    clearSearch();
  };

  return (
    <div className="relative h-[650px] w-full overflow-hidden bg-gray-100">
      {loading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-[#f7f7f3]">
          <div className="text-center">
            <div className="mx-auto h-9 w-9 animate-spin rounded-full border-2 border-gray-300 border-t-[#183c2c]" />
            <p className="mt-4 text-sm text-gray-500">Loading Meghalaya map...</p>
          </div>
        </div>
      )}

      {error && (
        <div className="absolute left-1/2 top-5 z-50 w-[90%] max-w-md -translate-x-1/2 rounded-2xl border border-red-200 bg-white p-4 shadow-xl">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-red-600">Map issue</p>
              <p className="mt-1 text-xs leading-5 text-gray-500">{error}</p>
            </div>
            <button onClick={() => setError("")} className="rounded-full p-1 text-gray-400 hover:bg-gray-100">
              <X size={16} />
            </button>
          </div>
        </div>
      )}

      <div ref={mapRef} className="absolute inset-0" />

      <div className="absolute left-4 right-4 top-4 z-30 sm:left-6 sm:right-auto sm:w-[400px]">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            searchPlace();
          }}
          className="flex items-center rounded-2xl border border-gray-200 bg-white px-4 shadow-xl"
        >
          <Search size={19} className="shrink-0 text-gray-400" />
          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setError("");
            }}
            placeholder="Search places in Meghalaya..."
            className="h-13 w-full bg-transparent px-3 text-sm text-gray-700 outline-none placeholder:text-gray-400"
          />
          {query && (
            <button type="button" onClick={clearSearch} className="rounded-full p-1.5 text-gray-400 hover:bg-gray-100">
              <X size={16} />
            </button>
          )}
        </form>
        <button
          onClick={searchPlace}
          disabled={!query.trim()}
          className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-[#183c2c] py-3 text-sm font-medium text-white shadow-lg transition hover:bg-[#214d39] disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Search size={15} />
          Search this place
        </button>
      </div>

      <div className="absolute right-4 top-4 z-30 flex flex-col gap-2">
        <button
          onClick={() => setMapType("roadmap")}
          title="Road map"
          className={`flex h-11 w-11 items-center justify-center rounded-xl border shadow-lg ${
            mapType === "roadmap" ? "border-[#183c2c] bg-[#183c2c] text-white" : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
          }`}
        >
          <MapIcon size={18} />
        </button>
        <button
          onClick={() => setMapType("satellite")}
          title="Satellite"
          className={`flex h-11 w-11 items-center justify-center rounded-xl border shadow-lg ${
            mapType === "satellite" ? "border-[#183c2c] bg-[#183c2c] text-white" : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
          }`}
        >
          <Satellite size={18} />
        </button>
        <button onClick={locateMe} title="My location" className="flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-600 shadow-lg hover:bg-gray-50">
          <LocateFixed size={18} />
        </button>
        <button onClick={resetMap} title="Back to Meghalaya" className="flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-600 shadow-lg hover:bg-gray-50">
          <Navigation size={17} />
        </button>
      </div>

      {selectedPlace && (
        <div className="absolute bottom-5 left-5 z-30 w-[calc(100%-40px)] max-w-sm overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl sm:left-6">
          {selectedPlace.photo && <img src={selectedPlace.photo} alt={selectedPlace.name} className="h-36 w-full object-cover" />}
          <div className="p-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-100">
                    <LocateFixed size={14} className="text-emerald-700" />
                  </span>
                  <p className="text-base font-semibold text-[#17221d]">{selectedPlace.name}</p>
                </div>
                <p className="mt-2 text-xs leading-5 text-gray-500">{selectedPlace.address}</p>
              </div>
              <button onClick={() => setSelectedPlace(null)} className="rounded-full p-1.5 text-gray-400 hover:bg-gray-100">
                <X size={16} />
              </button>
            </div>

            {selectedPlace.isDatabaseTour && (
              <button
                onClick={() => navigate(`/virtual-tours/${selectedPlace.id}`)}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#183c2c] py-2.5 text-xs font-semibold text-white transition hover:bg-[#214d39]"
              >
                <span>View 360° Panorama Tour</span>
                <ArrowRight size={14} />
              </button>
            )}

            {selectedPlace.location && !selectedPlace.isDatabaseTour && (
              <div className="mt-3 rounded-xl bg-[#f7f7f3] px-3 py-2">
                <p className="text-[10px] uppercase tracking-wider text-gray-400">Coordinates</p>
                <p className="mt-1 text-xs text-gray-600">
                  {selectedPlace.location.lat.toFixed(5)} , {selectedPlace.location.lng.toFixed(5)}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="absolute bottom-4 right-4 z-20 hidden rounded-full border border-white/60 bg-white/90 px-4 py-2 text-[10px] font-medium uppercase tracking-[0.15em] text-gray-500 shadow-md backdrop-blur-sm sm:block">
        Meghalaya · Interactive Map
      </div>
    </div>
  );
};

export default MeghalayaMap;