import './App.css';
import Map from './components/Map.js'
import SidePanel from './components/SidePanel.js'

function App() {
  return (
    <div style={{ display: "flex" }}>
      <Map/>
      <SidePanel/>
    </div>
  );
}

export default App;
