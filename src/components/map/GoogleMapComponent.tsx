import React, { useState, useCallback } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

interface MapMarker {
  id: string;
  position: google.maps.LatLngLiteral;
  title: string;
  type: "missing" | "sighting" | "pending";
  details?: string;
}

interface GoogleMapComponentProps {
  markers?: MapMarker[];
  center?: google.maps.LatLngLiteral;
  zoom?: number;
  onMarkerClick?: (marker: MapMarker) => void;
  height?: string;
}

const containerStyle = {
  width: "100%",
  height: "100%",
  minHeight: "400px",
  borderRadius: "0.5rem",
};

const defaultCenter = {
  lat: 40.7128,
  lng: -74.006, // New York City as default
};

const markerColors = {
  missing: "blue",
  sighting: "green",
  pending: "yellow",
};

const GoogleMapComponent: React.FC<GoogleMapComponentProps> = ({
  markers = [],
  center = defaultCenter,
  zoom = 10,
  onMarkerClick = () => {},
  height = "600px",
}) => {
  const [selectedMarker, setSelectedMarker] = useState<MapMarker | null>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);

  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "",
  });

  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  const handleMarkerClick = (marker: MapMarker) => {
    setSelectedMarker(marker);
    onMarkerClick(marker);
  };

  if (loadError) {
    return (
      <div
        className="flex items-center justify-center bg-slate-100 rounded-lg"
        style={{ height }}
      >
        <div className="text-center p-6">
          <p className="text-red-500 font-semibold mb-2">
            Error loading Google Maps
          </p>
          <p className="text-slate-600">
            Please check your API key and try again.
          </p>
        </div>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div
        className="flex items-center justify-center bg-slate-100 rounded-lg"
        style={{ height }}
      >
        <div className="text-center">
          <div className="inline-block animate-spin h-8 w-8 border-4 border-slate-200 border-t-blue-600 rounded-full mb-4"></div>
          <p className="text-slate-600">Loading map...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ height, width: "100%" }}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={zoom}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={{
          fullscreenControl: true,
          mapTypeControl: true,
          streetViewControl: false,
          zoomControl: true,
        }}
      >
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            position={marker.position}
            title={marker.title}
            onClick={() => handleMarkerClick(marker)}
            icon={{
              url: `http://maps.google.com/mapfiles/ms/icons/${markerColors[marker.type]}-dot.png`,
            }}
          />
        ))}

        {selectedMarker && (
          <InfoWindow
            position={selectedMarker.position}
            onCloseClick={() => setSelectedMarker(null)}
          >
            <div className="p-2 max-w-xs">
              <h3 className="font-semibold text-sm">{selectedMarker.title}</h3>
              {selectedMarker.details && (
                <p className="text-xs mt-1 text-gray-600">
                  {selectedMarker.details}
                </p>
              )}
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
};

export default GoogleMapComponent;
