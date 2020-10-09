import React from 'react';
import { MapView } from 'expo';

const MapMarker = ({ coordinate, color, children }) => (
  <MapView.Marker
    coordinate={coordinate}
    pinColor={color}
  >
    {children}
  </MapView.Marker>
);

export default MapMarker;
