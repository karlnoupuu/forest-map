import './App.css';
import { useState, useRef, useEffect } from 'react';
import { useMap } from './hooks/useMap';
import { useCountyLayer } from './hooks/useCountyLayer';
import TimeScrubber from './components/TimeScrubber';
import GraphPanel from './components/GraphPanel';

import type { ForestryData } from './types/ForestryData';

function App() {
  const [selectedCounty, setSelectedCounty] = useState<{ id : string, name : string} | null>(null);
  const [selectedYear, setSelectedYear] = useState<number>(2015);
  const [containerRef, mapRef]        = useMap();

  useCountyLayer(containerRef, mapRef, selectedCounty, setSelectedCounty);

  const forestryData = useRef<ForestryData | null>(null);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    fetch('/data/data.json')
      .then(res => res.json())
      .then(data => {
        forestryData.current = data;
        setDataLoaded(true);
      });
  }, []);

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
      <div className = "graph-container">
        <GraphPanel
          graphIds = {[]}
          graphData = {forestryData.current}
          selectedCounty = {selectedCounty}
          selectedYear = {selectedYear}
        ></GraphPanel>
      </div>
    </main>
  )
}

export default App
