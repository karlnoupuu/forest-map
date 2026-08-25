import './App.css';
import { useState, useRef, useEffect } from 'react';
import TimeScrubber from './components/TimeScrubber';
import BlobPanel from './components/BlobPanel';
import InfoModal from './components/InfoModal';
import InteractiveMap from './components/InteractiveMap';
import SidePanel from './components/SidePanel';

import type { County } from './types';
import type { ForestryData, DeforestData } from './types/ForestryData';

export const DEFAULT_COUNTY : County = { id : '0000', name : 'Eesti'};
export const DEFAULT_YEAR   = 2026;

function App() {
  const [selectedCounty,  setSelectedCounty]  = useState<County>(DEFAULT_COUNTY);
  const [selectedYear,    setSelectedYear]    = useState<number>(DEFAULT_YEAR);
  const [mobileConfirmed, setMobileConfirmed] = useState<boolean>(localStorage.getItem('mobileConfirmed') === 'true');

  const isMobile = ('ontouchstart' in window || navigator.maxTouchPoints > 0) && window.innerWidth < 768;
  
  const dismissModal = () => {
    setMobileConfirmed(true);
    localStorage.setItem('mobileConfirmed', 'true');
  };

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
      <InteractiveMap 
        selectedYear      = {selectedYear}
        selectedCounty    = {selectedCounty} 
        setSelectedCounty = {setSelectedCounty} 
      />
      <SidePanel 
        selectedYear      = {selectedYear}
        selectedCounty    = {selectedCounty}
        graphData         = {[forestryData.current, deforestData.current]}
      />
    </main>
  )
}

export default App
