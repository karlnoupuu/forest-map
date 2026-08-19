import './App.css';
import { useState } from 'react';
import { useMap } from './hooks/useMap';
import { useCountyLayer } from './hooks/useCountyLayer';
import * as maplibregl from 'maplibre-gl';
import TimeScrubber from './components/TimeScrubber';

function App() {
  const [_selectedCounty, setSelectedCounty] = useState<{ id : string, feature : maplibregl.MapGeoJSONFeature } | null>(null);
  const [selectedYear, setSelectedYear] = useState<number>(2000);
  const [containerRef, mapRef] = useMap();

  useCountyLayer(containerRef, mapRef, _selectedCounty, setSelectedCounty);

  return(
    <main className = "app">
      <div className = "map-container" ref = {containerRef}>
        <TimeScrubber
          selectedYear = {selectedYear}
          setSelectedYear = {setSelectedYear}
          minYear = {1950}
          maxYear = {2025}
        ></TimeScrubber>
      </div>
      <div className = "graph-container"></div>
    </main>
  )
}

export default App
