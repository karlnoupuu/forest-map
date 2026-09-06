import './App.css';
import { useEffect, useState } from 'react';
import TimeScrubber from './components/blob-panel/TimeScrubber';
import BlobPanel from './components/blob-panel/BlobPanel';
import InteractiveMap from './components/map/InteractiveMap';
import SidePanel from './components/side-panel/SidePanel';
import LoadingScreen from './components/loading-screen/LoadingScreen';
import MobileHeader from './components/MobileHeader';

import {DesktopLayout, MobileLandscapeLayout, MobileLayout} from './layouts/Layouts';
import MobileLandscapeHeader from './components/MobileLandscapeHeader';

import { useData } from './hooks/useData';
import useOrientation from './hooks/useOrientation';

import type { County } from './types';

export const DEFAULT_COUNTY : County = { id : '0000', name : 'Eesti'};
export const DEFAULT_YEAR   = 2019;

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

  const isMobile = ('ontouchstart' in window || navigator.maxTouchPoints > 0) && window.innerWidth < 800;
  const isLandscape = useOrientation();

  const Layout = isMobile ? isLandscape ? MobileLandscapeLayout : MobileLayout : DesktopLayout;
  const Header = isMobile ? isLandscape ? MobileLandscapeHeader : MobileHeader : BlobPanel;

  return <Layout
    loadModal = {<LoadingScreen isLoaded = {isLoaded}/>}
    header  = {
      <Header timeScrubber = {<TimeScrubber selectedYear = {selectedYear} setSelectedYear = {setSelectedYear}/>}/>
    }
    map     = {<InteractiveMap 
        selectedYear      = {selectedYear} 
        selectedCounty    = {selectedCounty} 
        setSelectedCounty = {setSelectedCounty}
        onMapReady        = {setMapReady} 
        darkMode          = {darkMode}
      />}
    panel   = {<SidePanel
        selectedYear      = {selectedYear}
        selectedCounty    = {selectedCounty}
        graphData         = {[forestryData.current, deforestData.current]}
      />}
  />
}

export default App