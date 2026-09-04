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
  { lat: 23.3180, lng: 85.3900, radius: 3500, color: "#ef4444", label: "Nagri Flood Zone" },
  { lat: 23.4441, lng: 85.3196, radius: 2800, color: "#f97316", label: "Kanke Flood Area" },
  { lat: 23.2980, lng: 85.2200, radius: 3200, color: "#ef4444", label: "Subarnarekha Flash Flood Zone" },
  { lat: 23.3600, lng: 85.4400, radius: 2000, color: "#a855f7", label: "Tatisilwai Landslide Zone" },
  { lat: 23.1600, lng: 85.4200, radius: 2200, color: "#f97316", label: "Murhu Flood Area" },
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
    <div className="relative w-full rounded-xl overflow-hidden border shadow-sm" style={{ height: "520px" }}>
      {/* Legend */}
      <div style={{
        position: "absolute", top: 12, right: 12, zIndex: 1000,
        background: "rgba(255,255,255,0.95)", padding: "10px 14px",
        borderRadius: "8px", fontSize: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.15)"
      }}>
        <div style={{ fontWeight: 700, marginBottom: 6 }}>Map Legend</div>
        {[
          { color: "#7f1d1d", label: "CRITICAL risk habitation" },
          { color: "#dc2626", label: "VERY HIGH risk habitation" },
          { color: "#ea580c", label: "HIGH risk habitation" },
          { color: "#ca8a04", label: "MODERATE risk" },
          { color: "#16a34a", label: "LOW risk" },
          { color: "#15803d", label: "◆ Relocation site" },
          { color: "#ef4444", label: "Flood hazard zone" },
          { color: "#a855f7", label: "Landslide hazard zone" },
        ].map(({ color, label }) => (
          <div key={label} style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 3 }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: color, flexShrink: 0 }} />
            <span>{label}</span>
          </div>
        ))}
      </div>

      {loading && (
        <div style={{
          position: "absolute", inset: 0, display: "flex",
          alignItems: "center", justifyContent: "center",
          background: "rgba(255,255,255,0.7)", zIndex: 999
        }}>
          <span style={{ fontWeight: 600 }}>Loading map data…</span>
        </div>
      )}

      <MapContainer
        center={MAP_CENTER}
        zoom={MAP_ZOOM}
        style={{ width: "100%", height: "100%" }}
        zoomControl={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
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
              fillOpacity: 0.15,
              weight: 2,
              dashArray: "6 4",
            }}
          >
            <Popup>
              <b>{zone.label}</b>
            </Popup>
          </Circle>
        ))}

        {/* Habitation markers — real data */}
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

        {/* Relocation site markers — real data */}
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

      {/* Pulse animation style */}
      <style>{`
        @keyframes pulse {
          0%   { box-shadow: 0 0 0 0 rgba(220,38,38,0.6); }
          70%  { box-shadow: 0 0 0 8px rgba(220,38,38,0); }
          100% { box-shadow: 0 0 0 0 rgba(220,38,38,0); }
        }
      `}</style>
    </div>
  );
};

export default DisasterMap;
