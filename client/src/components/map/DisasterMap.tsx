import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Circle, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import HabitationMarker from "./HabitationMarker";
import RelocationSiteMarker from "./RelocationSiteMarker";
import { getHabitations } from "../../services/habitation.api";
import { getRelocationSites } from "../../services/relocation.api";
import type { Habitation } from "../../types/habitation";
import type { RelocationSite } from "../../types/relocation";

// Ranchi centre
const MAP_CENTER: [number, number] = [23.3856, 85.3200];
const MAP_ZOOM = 10;

// Hazard zone overlay data (flood/landslide polygons as circles for simplicity)
const HAZARD_ZONES = [
  { lat: 23.3180, lng: 85.3900, radius: 3500, color: "#ef4444", label: "Nagri Flood Inundation Zone" },
  { lat: 23.4441, lng: 85.3196, radius: 2800, color: "#f97316", label: "Kanke River Basin Flood Area" },
  { lat: 23.2980, lng: 85.2200, radius: 3200, color: "#ef4444", label: "Subarnarekha Flash Flood Zone" },
  { lat: 23.3600, lng: 85.4400, radius: 2000, color: "#a855f7", label: "Tatisilwai Highway Cut Landslide Area" },
  { lat: 23.1600, lng: 85.4200, radius: 2200, color: "#f97316", label: "Murhu Flood Zone" },
];

const DisasterMap = () => {
  const [habitations, setHabitations] = useState<Habitation[]>([]);
  const [sites, setSites] = useState<RelocationSite[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getHabitations(), getRelocationSites()])
      .then(([habs, relocs]) => {
        setHabitations(habs);
        setSites(relocs);
      })
      .catch(() => {
        setHabitations([]);
        setSites([]);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-gray-800 bg-gray-950 shadow-2xl" style={{ height: "560px" }}>
      {/* Dark Glass Legend */}
      <div className="absolute top-3 right-3 z-[1000] bg-slate-900/90 backdrop-blur-md border border-slate-800 p-3.5 rounded-xl text-xs shadow-2xl text-gray-200 max-w-[230px]">
        <div className="font-bold text-white mb-2 flex items-center justify-between border-b border-slate-800 pb-1.5">
          <span>OpenStreetMap GIS</span>
          <span className="text-[10px] text-emerald-400 font-mono">LIVE LABELS</span>
        </div>
        <div className="space-y-1.5 text-[11px]">
          {[
            { color: "#ef4444", label: "CRITICAL risk habitation" },
            { color: "#f97316", label: "VERY HIGH risk" },
            { color: "#f59e0b", label: "HIGH risk" },
            { color: "#10b981", label: "LOW risk" },
            { color: "#10b981", label: "◆ Safe Relocation site", shape: "diamond" },
            { color: "#ef4444", label: "Flood hazard zone", fill: true },
            { color: "#a855f7", label: "Landslide hazard zone", fill: true },
          ].map(({ color, label, shape, fill }) => (
            <div key={label} className="flex items-center gap-2">
              <div
                className={`shrink-0 ${shape === "diamond" ? "w-2.5 h-2.5 rotate-45 rounded-sm" : "w-2.5 h-2.5 rounded-full"}`}
                style={{
                  background: fill ? "transparent" : color,
                  border: fill ? `2px dashed ${color}` : `1.5px solid #ffffff`,
                }}
              />
              <span className="text-gray-300 truncate">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {loading && (
        <div className="absolute inset-0 z-[999] bg-gray-950/80 backdrop-blur-sm flex items-center justify-center text-white font-bold text-sm">
          <div className="flex items-center gap-3">
            <span className="w-4 h-4 rounded-full border-2 border-red-500 border-t-transparent animate-spin" />
            <span>Loading OpenStreetMap GIS Data…</span>
          </div>
        </div>
      )}

      <MapContainer
        center={MAP_CENTER}
        zoom={MAP_ZOOM}
        style={{ width: "100%", height: "100%", background: "#090d16" }}
        zoomControl={true}
      >
        {/* OpenStreetMap Official API Tile Layer with High-Contrast Dark Filter */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          className="osm-dark-tiles"
        />

        {/* Hazard zone overlays */}
        {HAZARD_ZONES.map((zone) => (
          <Circle
            key={zone.label}
            center={[zone.lat, zone.lng]}
            radius={zone.radius}
            pathOptions={{
              color: zone.color,
              fillColor: zone.color,
              fillOpacity: 0.22,
              weight: 2,
              dashArray: "6 4",
            }}
          >
            <Popup>
              <div className="text-xs font-bold text-white">{zone.label}</div>
            </Popup>
          </Circle>
        ))}

        {/* Habitation markers with permanent place name labels */}
        {habitations.map((hab) => (
          <HabitationMarker
            key={hab.id}
            id={hab.id}
            name={hab.name}
            population={hab.population}
            riskScore={hab.riskScore ?? 0}
            riskLevel={hab.riskLevel ?? "LOW"}
            relocationPriority={(hab as any).relocationPriority ?? "MONITOR"}
            latitude={hab.latitude}
            longitude={hab.longitude}
          />
        ))}

        {/* Relocation site markers with permanent site name labels */}
        {sites.map((site) => (
          <RelocationSiteMarker
            key={site.id}
            id={site.id}
            name={site.name}
            availableCapacity={site.availableCapacity}
            suitabilityScore={site.suitabilityScore}
            hazardRisk={(site as any).hazardRisk ?? 0}
            latitude={site.latitude}
            longitude={site.longitude}
          />
        ))}
      </MapContainer>

      {/* Dark Leaflet Popup, Map Tile & Permanent Label Styling */}
      <style>{`
        .leaflet-container {
          background-color: #090d16 !important;
        }

        /* High-contrast OpenStreetMap Dark Tile Filter - Keeps Ranchi, Kanke & Roads Clearly Legible */
        .osm-dark-tiles {
          filter: brightness(0.65) invert(1) contrast(3.2) hue-rotate(200deg) saturate(0.35) brightness(0.75) !important;
        }

        /* Permanent Dark Map Place Labels */
        .dark-map-label, .dark-map-label-green {
          background: rgba(15, 23, 42, 0.92) !important;
          border: 1px solid rgba(51, 65, 85, 0.9) !important;
          border-radius: 8px !important;
          padding: 3px 8px !important;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.6) !important;
          backdrop-filter: blur(4px) !important;
        }

        .dark-map-label::before, .dark-map-label-green::before {
          border-top-color: rgba(15, 23, 42, 0.92) !important;
        }

        .leaflet-popup-content-wrapper, .leaflet-popup-tip {
          background: #0f172a !important;
          color: #f8fafc !important;
          border: 1px solid #334155 !important;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.7), 0 8px 10px -6px rgba(0, 0, 0, 0.7) !important;
          border-radius: 12px !important;
        }

        .leaflet-popup-content {
          margin: 10px 14px !important;
        }

        .leaflet-container a.leaflet-popup-close-button {
          color: #94a3b8 !important;
          padding: 6px !important;
        }

        .leaflet-container a.leaflet-popup-close-button:hover {
          color: #ffffff !important;
        }

        @keyframes pulse {
          0%   { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.8); }
          70%  { box-shadow: 0 0 0 10px rgba(239, 68, 68, 0); }
          100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }
        }
      `}</style>
    </div>
  );
};

export default DisasterMap;
