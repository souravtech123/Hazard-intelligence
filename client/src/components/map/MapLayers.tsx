import HazardLayer from "./HazardLayer";
import HabitationMarker from "./HabitationMarker";
import RelocationSiteMarker from "./RelocationSiteMarker";

const MapLayers = () => {
  return (
    <>
      <HazardLayer />

      <HabitationMarker
        latitude={23.3441}
        longitude={85.3096}
        name="Sample Habitation"
        riskScore={72}
      />

      <RelocationSiteMarker
        latitude={23.3615}
        longitude={85.3347}
        name="Sample Relocation Site"
        capacity={500}
      />
    </>
  );
};

export default MapLayers;
