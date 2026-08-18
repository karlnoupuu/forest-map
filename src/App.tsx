import './App.css';
import { useMap } from './hooks/useMap';
import { useCountyLayer } from './hooks/useCountyLayer';

function App() {
  const [containerRef, mapRef] = useMap();

  useCountyLayer(mapRef);

  return(
    <main className = "app">
      <div className = "map-container" ref = {containerRef}></div>
      <div className = "graph-container"></div>
    </main>
  )
}

export default App
