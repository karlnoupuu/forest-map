import './App.css';
import { useState } from 'react';

// Layouts
import {DesktopLayout, MobileLandscapeLayout, MobileLayout} from './layouts/Layouts';

// Components
import TimeScrubber from './components/blob-panel/TimeScrubber';
import BlobPanel from './components/blob-panel/BlobPanel';
import InteractiveMap from './components/map/InteractiveMap';
import SidePanel from './components/side-panel/SidePanel';
import LoadingScreen from './components/loading-screen/LoadingScreen';
import MobileHeader from './components/MobileHeader';
import MobileLandscapeHeader from './components/MobileLandscapeHeader';

// Hooks
import { useData } from './hooks/useData';
import useOrientation from './hooks/useOrientation';

// Types
import type { County } from './types';

// Config constants
import { DEFAULT_COUNTY, DEFAULT_YEAR } from './config/general';


function App() {

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
      />}
    panel   = {<SidePanel
        selectedYear      = {selectedYear}
        selectedCounty    = {selectedCounty}
        graphData         = {[forestryData.current, deforestData.current]}
      />}
  />
}

export default App