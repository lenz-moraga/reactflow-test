import "./assets/styles/App.scss";
import { MapProvider } from "./services/MapProvider";
import MapRenderer from "./components/MapRenderer";

function App() {
  return (
    <div className="App position-relative">
      <MapProvider>
        <MapRenderer />
      </MapProvider>
      {/* <iframe
        title="asd"
        class="clickup-embed"
        src="https://sharing.clickup.com/mm/h/c0nbw-56/6fe3bbb7200671e"
        onwheel=""
        width="100%"
        height="700px"
      ></iframe> */}
    </div>
  );
}

export default App;
