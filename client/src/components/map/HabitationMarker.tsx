import { Marker, Popup } from "react-leaflet";
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
    case "CRITICAL": return "#7f1d1d";
    case "VERY_HIGH": return "#dc2626";
    case "HIGH": return "#ea580c";
    case "MODERATE": return "#ca8a04";
    case "LOW": return "#16a34a";
    default: return "#6b7280";
  }
}

function getRiskLabel(level: string): string {
  switch (level) {
    case "CRITICAL": return "🔴 CRITICAL";
    case "VERY_HIGH": return "🟠 VERY HIGH";
    case "HIGH": return "🟡 HIGH";
    case "MODERATE": return "🟢 MODERATE";
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
      width:14px;height:14px;border-radius:50%;
      background:${color};border:2px solid white;
      box-shadow:0 0 6px ${color};
      ${riskLevel === "CRITICAL" || riskLevel === "VERY_HIGH"
        ? `animation:pulse 1.5s infinite;`
        : ""}
    "></div>`,
    iconSize: [14, 14],
    iconAnchor: [7, 7],
  });

  return (
    <Marker position={[latitude, longitude]} icon={icon}>
      <Popup minWidth={220}>
        <div style={{ fontFamily: "sans-serif", fontSize: "13px" }}>
          <div style={{
            background: color, color: "white",
            padding: "6px 10px", borderRadius: "4px 4px 0 0", margin: "-5px -5px 8px",
            fontWeight: 700
          }}>
            {name}
          </div>
          <div style={{ lineHeight: 1.8 }}>
            <b>Risk Level:</b> {getRiskLabel(riskLevel)}<br />
            <b>Risk Score:</b> {riskScore.toFixed(1)} / 100<br />
            <b>Population:</b> {population.toLocaleString()}<br />
            <b>Priority:</b> {relocationPriority}<br />
          </div>
          <Link
            to={`/habitations/${id}`}
            style={{
              display: "block", marginTop: "8px", textAlign: "center",
              background: color, color: "white", padding: "5px",
              borderRadius: "4px", textDecoration: "none", fontWeight: 600
            }}
          >
            View Details & Relocate →
          </Link>
        </div>
      </Popup>
    </Marker>
  );
};

export default HabitationMarker;