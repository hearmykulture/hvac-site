"use client";

import React, { useEffect, useRef } from "react";
import L, {
  Map as LeafletMap,
  Circle as LeafletCircle,
  Marker as LeafletMarker,
} from "leaflet";
import "leaflet/dist/leaflet.css";

type LatLngTuple = [number, number];

export type RadiusMapProps = {
  center?: LatLngTuple; // [lat, lng]
  radiusKm?: number; // radius in kilometers
  title?: string;
  className?: string;
};

const DEFAULT_CENTER: LatLngTuple = [43.082617, -89.439355]; // Madison
const DEFAULT_RADIUS_KM = 50;

export default function RadiusMap({
  center = DEFAULT_CENTER,
  radiusKm = DEFAULT_RADIUS_KM,
  title = `Primary service radius (~${DEFAULT_RADIUS_KM} km)`,
  className = "",
}: RadiusMapProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<LeafletMap | null>(null);
  const circleRef = useRef<LeafletCircle | null>(null);
  const markerRef = useRef<LeafletMarker | null>(null);

  // Always apply core layout classes; allow callers to extend height/styles.
  const wrapperClass =
    "relative w-full overflow-hidden rounded-2xl ring-1 ring-white/10 " +
    (className ? className : "h-80");

  // Create map once
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current, {
      center,
      zoom: 11,
      scrollWheelZoom: false,
    });
    mapRef.current = map;

    // OSM tiles
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19,
    }).addTo(map);

    // Explicit marker icon so bundling doesn't break the default assets
    const icon = L.icon({
      iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
      iconRetinaUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
      shadowUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      shadowSize: [41, 41],
    });

    markerRef.current = L.marker(center, { icon })
      .addTo(map)
      .bindPopup(
        `<strong>Service Hub</strong><br>${center[0].toFixed(
          5
        )}, ${center[1].toFixed(5)}`
      );

    circleRef.current = L.circle(center, {
      radius: radiusKm * 1000,
      color: "#00D1FF",
      weight: 2,
      opacity: 0.9,
      fillColor: "#00D1FF",
      fillOpacity: 0.15,
    }).addTo(map);

    // Auto-fit to circle
    fitToCircle(map, center, radiusKm);

    // Cleanup
    return () => {
      map.remove();
      mapRef.current = null;
      circleRef.current = null;
      markerRef.current = null;
    };
  }, [center, radiusKm]); // create once

  // Update center / radius on prop change
  useEffect(() => {
    const map = mapRef.current;
    const circle = circleRef.current;
    const marker = markerRef.current;
    if (!map || !circle || !marker) return;

    circle.setLatLng(center);
    circle.setRadius(radiusKm * 1000);
    marker.setLatLng(center);
    marker.setPopupContent(
      `<strong>Service Hub</strong><br>${center[0].toFixed(
        5
      )}, ${center[1].toFixed(5)}`
    );

    fitToCircle(map, center, radiusKm);
  }, [center, radiusKm]);

  return (
    <div className={wrapperClass}>
      <div ref={containerRef} style={{ height: "100%", width: "100%" }} />
      <div className="pointer-events-none absolute left-2 top-2 rounded bg-black/55 px-2 py-1 text-xs text-white/80">
        {title}
      </div>
    </div>
  );
}

/** Fit the map so the circle is nicely framed */
function fitToCircle(map: LeafletMap, center: LatLngTuple, radiusKm: number) {
  const meters = radiusKm * 1000;
  const bounds = circleBounds(center, meters);
  map.fitBounds(bounds, { padding: [24, 24], maxZoom: 15 });
}

/** Quick bbox around a circle — good enough for framing */
function circleBounds(center: LatLngTuple, radiusM: number) {
  const [lat, lng] = center;

  // meters per degree
  const METERS_PER_DEG_LAT = 111_320;
  const metersPerDegLng = METERS_PER_DEG_LAT * Math.cos((lat * Math.PI) / 180);

  const dLatDeg = radiusM / METERS_PER_DEG_LAT; // degrees latitude
  const dLngDeg = radiusM / metersPerDegLng; // degrees longitude

  const south = lat - dLatDeg;
  const north = lat + dLatDeg;
  const west = lng - dLngDeg;
  const east = lng + dLngDeg;

  return L.latLngBounds([south, west], [north, east]);
}
