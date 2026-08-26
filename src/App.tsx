import './App.css';
import { useEffect, useState } from 'react';
import TimeScrubber from './components/blob-panel/TimeScrubber';
import BlobPanel from './components/blob-panel/BlobPanel';
import InfoModal from './components/common/InfoModal';
import InteractiveMap from './components/map/InteractiveMap';
import SidePanel from './components/side-panel/SidePanel';
import LoadingScreen from './components/loading-screen/LoadingScreen';

import { useData } from './hooks/useData';

import type { County } from './types';

export const DEFAULT_COUNTY : County = { id : '0000', name : 'Eesti'};
export const DEFAULT_YEAR   = 2026;

function App() {
  // TODO: Implement dark mode?
  // const _prefersDark             = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [darkMode, _setDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
  }, [darkMode])

  const [selectedCounty,  setSelectedCounty]  = useState<County>(DEFAULT_COUNTY);
  const [selectedYear,    setSelectedYear]    = useState<number>(DEFAULT_YEAR);
  const [mapReady,        setMapReady]        = useState<boolean>(false);

  const { forestryData, deforestData, dataLoaded} = useData();
  const isLoaded : boolean = dataLoaded && mapReady;

  const [mobileConfirmed, setMobileConfirmed] = useState<boolean>(localStorage.getItem('mobileConfirmed') === 'true');
  const isMobile = ('ontouchstart' in window || navigator.maxTouchPoints > 0) && window.innerWidth < 768;
  
  const dismissModal = () => {
    setMobileConfirmed(true);
    localStorage.setItem('mobileConfirmed', 'true');
  };

  return(
    <main className = "app">
      <LoadingScreen isLoaded = {isLoaded}/>
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
        onMapReady        = {setMapReady}
        darkMode          = {darkMode} 
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
