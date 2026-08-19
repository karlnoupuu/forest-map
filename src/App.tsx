import './App.css';
import { useState } from 'react';
import { useMap } from './hooks/useMap';
import { useCountyLayer } from './hooks/useCountyLayer';
import * as maplibregl from 'maplibre-gl';

function App() {
  const [_selectedCounty, setSelectedCounty] = useState<{ id : string, feature : maplibregl.MapGeoJSONFeature } | null>(null);
  const [containerRef, mapRef] = useMap();

  useCountyLayer(containerRef, mapRef, _selectedCounty, setSelectedCounty);

  return(
    <main className = "app">
      <div className = "map-container" ref = {containerRef}></div>
      <div className = "graph-container"></div>
    </main>
  )
}

export default App
