import './App.css';
import { useMap } from './hooks/useMap';

function App() {
  const [containerRef, _] = useMap();

  return(
    <main className = "app">
      <div className = "map-container" ref = {containerRef}></div>
      <div className = "graph-container"></div>
    </main>
  )
}

export default App
