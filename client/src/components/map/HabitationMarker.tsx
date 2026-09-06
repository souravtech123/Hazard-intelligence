import { Marker, Popup, Tooltip } from "react-leaflet";
import { divIcon } from "leaflet";
import { Link } from "react-router-dom";

interface HabitationMarkerProps {
  id: string;
  name: string;
  population: number;
  riskScore: number;
  riskLevel: string;
  relocationPriority: string;
  latitude: number;
  longitude: number;
}

function getRiskColor(level: string): string {
  switch (level) {
    case "CRITICAL": return "#ef4444";
    case "VERY_HIGH": return "#f97316";
    case "HIGH": return "#f59e0b";
    case "MODERATE": return "#eab308";
    case "LOW": return "#10b981";
    default: return "#6b7280";
  }
}

function getRiskBadge(level: string): string {
  switch (level) {
    case "CRITICAL": return "🚨 CRITICAL";
    case "VERY_HIGH": return "⚠️ VERY HIGH";
    case "HIGH": return "⚡ HIGH";
    case "MODERATE": return "🟡 MODERATE";
    case "LOW": return "✅ LOW";
    default: return level;
  }
}

const HabitationMarker = ({
  id,
  name,
  population,
  riskScore,
  riskLevel,
  relocationPriority,
  latitude,
  longitude,
}: HabitationMarkerProps) => {
  const color = getRiskColor(riskLevel);

  const icon = divIcon({
    className: "",
    html: `<div style="
      width:18px;height:18px;border-radius:50%;
      background:${color};border:2px solid #ffffff;
      box-shadow:0 0 12px ${color};
      ${riskLevel === "CRITICAL" || riskLevel === "VERY_HIGH"
        ? `animation:pulse 1.5s infinite;`
        : ""}
    "></div>`,
    iconSize: [18, 18],
    iconAnchor: [9, 9],
  });

  return (
    <Marker position={[latitude, longitude]} icon={icon}>
      {/* Permanent place name label visible on map */}
      <Tooltip permanent direction="top" offset={[0, -10]} className="dark-map-label">
        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <span style={{
            width: "8px", height: "8px", borderRadius: "50%",
            background: color, display: "inline-block"
          }} />
          <span style={{ fontWeight: 800, fontSize: "11px", color: "#ffffff" }}>{name}</span>
          <span style={{
            fontSize: "9px", fontWeight: 700, padding: "1px 4px", borderRadius: "4px",
            background: `${color}33`, color: color, border: `1px solid ${color}66`
          }}>
            {riskScore.toFixed(0)}
          </span>
        </div>
      </Tooltip>

      <Popup minWidth={230} className="dark-popup">
        <div style={{ fontFamily: "system-ui, sans-serif", fontSize: "12px", color: "#f8fafc" }}>
          <div style={{
            background: color, color: "#ffffff",
            padding: "8px 12px", borderRadius: "8px 8px 0 0", margin: "-10px -14px 10px",
            fontWeight: 800, fontSize: "13px"
          }}>
            {name}
          </div>
          <div style={{ lineHeight: 1.8, color: "#cbd5e1" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
              <span style={{ color: "#94a3b8" }}>Risk Level:</span>
              <b style={{ color }}>{getRiskBadge(riskLevel)}</b>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
              <span style={{ color: "#94a3b8" }}>Risk Score:</span>
              <b style={{ color: "#ffffff", fontFamily: "monospace" }}>{riskScore.toFixed(1)} / 100</b>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
              <span style={{ color: "#94a3b8" }}>Population:</span>
              <b style={{ color: "#ffffff" }}>{population.toLocaleString()} residents</b>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "#94a3b8" }}>Priority:</span>
              <b style={{ color: relocationPriority === "IMMEDIATE" ? "#f87171" : "#34d399" }}>{relocationPriority}</b>
            </div>
          </div>
          <Link
            to={`/dashboard/habitations/${id}`}
            style={{
              display: "block", marginTop: "12px", textAlign: "center",
              background: "#dc2626", color: "#ffffff", padding: "7px 10px",
              borderRadius: "8px", textDecoration: "none", fontWeight: 700,
              fontSize: "12px", boxShadow: "0 4px 12px rgba(220,38,38,0.4)"
            }}
          >
            Inspect Details & Relocate →
          </Link>
        </div>
      </Popup>
    </Marker>
  );
};

export default HabitationMarker;