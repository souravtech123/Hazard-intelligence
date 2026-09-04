export const toLatLng = (lat: number, lng: number): [number, number] => [lat, lng];

export const getMapBounds = (
  points: Array<{ latitude: number; longitude: number }>
): [[number, number], [number, number]] | null => {
  if (points.length === 0) return null;

  const lats = points.map((p) => p.latitude);
  const lngs = points.map((p) => p.longitude);

  return [
    [Math.min(...lats), Math.min(...lngs)],
    [Math.max(...lats), Math.max(...lngs)],
  ];
};
