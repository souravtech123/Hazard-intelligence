import { Marker, Popup, Tooltip } from "react-leaflet";
import { divIcon } from "leaflet";
import { Link } from "react-router-dom";

interface RelocationSiteMarkerProps {
  id: string;
  name: string;
  availableCapacity: number;
  suitabilityScore: number;
  hazardRisk: number;
  latitude: number;
  longitude: number;
}

function getSuitabilityColor(score: number): string {
  if (score >= 85) return "#10b981";
  if (score >= 70) return "#34d399";
  if (score >= 55) return "#f59e0b";
  return "#eab308";
}

const RelocationSiteMarker = ({
  id,
  name,
  availableCapacity,
  suitabilityScore,
  hazardRisk,
  latitude,
  longitude,
}: RelocationSiteMarkerProps) => {
  const color = getSuitabilityColor(suitabilityScore);

  const icon = divIcon({
    className: "",
    html: `<div style="
      width:18px;height:18px;
      border-radius:4px;
      transform:rotate(45deg);
      background:${color};
      border:2px solid #ffffff;
      box-shadow:0 0 12px ${color};
    "></div>`,
    iconSize: [18, 18],
    iconAnchor: [9, 9],
  });

  return (
    <Marker position={[latitude, longitude]} icon={icon}>
      {/* Permanent relocation site label visible on map */}
      <Tooltip permanent direction="top" offset={[0, -10]} className="dark-map-label-green">
        <div style={{ display: "flex", itemsCenter: "center", gap: "4px" }}>
          <span style={{ fontWeight: 800, fontSize: "11px", color: "#34d399" }}>🏗 {name}</span>
          <span style={{
            fontSize: "9px", fontWeight: 700, padding: "1px 4px", borderRadius: "4px",
            background: "rgba(16, 185, 129, 0.2)", color: "#10b981", border: "1px solid rgba(16, 185, 129, 0.4)"
          }}>
            {availableCapacity.toLocaleString()} cap
          </span>
        </div>
      </Tooltip>

      <Popup minWidth={230} className="dark-popup">
        <div style={{ fontFamily: "system-ui, sans-serif", fontSize: "12px", color: "#f8fafc" }}>
          <div style={{
            background: "#059669", color: "#ffffff",
            padding: "8px 12px", borderRadius: "8px 8px 0 0",
            margin: "-10px -14px 10px", fontWeight: 800, fontSize: "13px"
          }}>
            🏗 {name}
          </div>
          <div style={{ lineHeight: 1.8, color: "#cbd5e1" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
              <span style={{ color: "#94a3b8" }}>Suitability Match:</span>
              <b style={{ color: "#34d399", fontFamily: "monospace" }}>{suitabilityScore.toFixed(1)}%</b>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
              <span style={{ color: "#94a3b8" }}>Available Capacity:</span>
              <b style={{ color: "#ffffff" }}>{availableCapacity.toLocaleString()} people</b>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "#94a3b8" }}>Site Hazard Risk:</span>
              <b style={{ color: "#34d399" }}>{hazardRisk.toFixed(1)}% (Low)</b>
            </div>
          </div>
          <Link
            to={`/dashboard/relocation/${id}`}
            style={{
              display: "block", marginTop: "12px", textAlign: "center",
              background: "#059669", color: "#ffffff", padding: "7px 10px",
              borderRadius: "8px", textDecoration: "none", fontWeight: 700,
              fontSize: "12px", boxShadow: "0 4px 12px rgba(5,150,105,0.4)"
            }}
          >
            Inspect Site & Allocate →
          </Link>
        </div>
      </Popup>
    </Marker>
  );
};

export default RelocationSiteMarker;
