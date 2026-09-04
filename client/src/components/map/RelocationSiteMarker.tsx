import { Marker, Popup } from "react-leaflet";
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
  if (score >= 85) return "#15803d";
  if (score >= 70) return "#16a34a";
  if (score >= 55) return "#65a30d";
  return "#ca8a04";
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
      width:16px;height:16px;
      border-radius:3px;
      transform:rotate(45deg);
      background:${color};
      border:2px solid white;
      box-shadow:0 0 6px ${color};
    "></div>`,
    iconSize: [16, 16],
    iconAnchor: [8, 8],
  });

  return (
    <Marker position={[latitude, longitude]} icon={icon}>
      <Popup minWidth={220}>
        <div style={{ fontFamily: "sans-serif", fontSize: "13px" }}>
          <div style={{
            background: color, color: "white",
            padding: "6px 10px", borderRadius: "4px 4px 0 0",
            margin: "-5px -5px 8px", fontWeight: 700
          }}>
            🏗 {name}
          </div>
          <div style={{ lineHeight: 1.8 }}>
            <b>Suitability:</b> {suitabilityScore.toFixed(1)}%<br />
            <b>Available Capacity:</b> {availableCapacity.toLocaleString()} people<br />
            <b>Hazard Risk:</b> {hazardRisk.toFixed(1)}% (low is good)<br />
          </div>
          <Link
            to={`/relocation/${id}`}
            style={{
              display: "block", marginTop: "8px", textAlign: "center",
              background: color, color: "white", padding: "5px",
              borderRadius: "4px", textDecoration: "none", fontWeight: 600
            }}
          >
            View Site & Allocate →
          </Link>
        </div>
      </Popup>
    </Marker>
  );
};

export default RelocationSiteMarker;
