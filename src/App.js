import React, { useState } from "react";
import "./assets/styles/App.scss";
import { MapProvider } from "./services/MapProvider";
import MapRenderer from "./components/MapRenderer";
import Papa from "papaparse";

function App() {
  const [nodesToRender, setNodesToRender] = useState();

  const onChangeFileHandler = (evt) => {
    const files = evt.target.files;
    
    if (files) {
      Papa.parse(files[0], {
        escapeFormulae: true,
        header: true,
        complete: function(results) {
          setNodesToRender(results.data);
          console.log('results.data', results.data)
        }}
      )

    }
  }

  return (
    <div className="App position-relative">
      <input type="file" onChange={onChangeFileHandler}/>
      <MapProvider>
        {nodesToRender && <MapRenderer nodesToRender={nodesToRender} />}
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
