import './App.css';
import { useState, useRef, useEffect } from 'react';
import { useMap } from './hooks/useMap';
import { useCountyLayer } from './hooks/useCountyLayer';
import TimeScrubber from './components/TimeScrubber';
import GraphPanel from './components/GraphPanel';
import type { ForestryData, DeforestData } from './types/ForestryData';
import BlobPanel from './components/BlobPanel';
import { useForestLayer } from './hooks/useForestLayer';
import InfoModal from './components/InfoModal';

export const DEFAULT_COUNTY = { id : '0000', name : 'Eesti'};
export const DEFAULT_YEAR   = 2026;

function App() {
  const [selectedCounty, setSelectedCounty] = useState<{ id : string, name : string}>(DEFAULT_COUNTY);
  const [selectedYear, setSelectedYear]     = useState<number>(DEFAULT_YEAR);
  const [mobileConfirmed, setMobileConfirmed] = useState<boolean>(localStorage.getItem('mobileConfirmed') === 'true');
  const [containerRef, mapRef, mapReady]    = useMap();

  const isMobile = ('ontouchstart' in window || navigator.maxTouchPoints > 0) && window.innerWidth < 768;
  
  const dismissModal = () => {
    setMobileConfirmed(true);
    localStorage.setItem('mobileConfirmed', 'true');
  };

  useCountyLayer(containerRef, mapRef, selectedCounty, setSelectedCounty);
  useForestLayer(mapRef, mapReady, selectedYear);

  const forestryData = useRef<ForestryData | null>(null);
  const deforestData = useRef<DeforestData | null>(null);
  const [_dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    Promise.all([
      fetch('/data/data.json').then(res => res.json()),
      fetch('/data/data_deforestation_reforestation.json').then(res => res.json()),
    ]).then(([forestry, deforest]) => {
      forestryData.current = forestry;
      deforestData.current = deforest;
      setDataLoaded(true);
    })
  }, []);

  return(
    <main className = "app">
      {!mobileConfirmed && isMobile && (
        <InfoModal
          infoText      = {'This webapp is optimised for browser use. \nFor the best user experience please switch to a desktop browser.'}
          mobileConfirm = {mobileConfirmed}
          onDismiss     = {dismissModal}
        />
      )}
      <BlobPanel
        timeScrubber = {<TimeScrubber selectedYear = {selectedYear} setSelectedYear = {setSelectedYear}/>}
      />
      <div className = "map-container" ref = {containerRef}>
      </div>
      <div className = "graph-container">
        <GraphPanel
          graphData = {[forestryData.current, deforestData.current]}
          selectedCounty = {selectedCounty}
          selectedYear = {selectedYear}
        ></GraphPanel>
      </div>
    </main>
  )
}

export default App
