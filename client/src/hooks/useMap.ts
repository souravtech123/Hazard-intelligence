import { useState } from "react";

export const useMap = () => {
  const [center, setCenter] = useState<[number, number]>([23.3441, 85.3096]);
  const [zoom, setZoom] = useState(10);
  const [selectedLocation, setSelectedLocation] = useState<[number, number] | null>(null);

  const moveToLocation = (latitude: number, longitude: number) => {
    setCenter([latitude, longitude]);
    setSelectedLocation([latitude, longitude]);
  };

  return { center, zoom, setZoom, selectedLocation, moveToLocation };
};
