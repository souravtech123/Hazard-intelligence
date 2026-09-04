import {
  Circle,
  Popup,
} from "react-leaflet";

const HazardLayer = () => {
  return (
    <Circle
      center={[23.35, 85.32]}
      radius={5000}
    >
      <Popup>
        <div>
          <h3 className="font-semibold">
            Flood Hazard Zone
          </h3>

          <p className="text-sm text-gray-600">
            High-risk area
          </p>
        </div>
      </Popup>
    </Circle>
  );
};

export default HazardLayer;