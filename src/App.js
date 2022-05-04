import React, { useState } from "react";
import "./assets/styles/App.scss";
import { MapProvider } from "./services/MapProvider";
import MapRenderer from "./components/MapRenderer";
import Papa from "papaparse";
import { useCSVDownloader } from "react-papaparse";

function App() {
  const { CSVDownloader, Type } = useCSVDownloader();

  const [nodesToRender, setNodesToRender] = useState();

  const onChangeFileHandler = (evt) => {
    const files = evt.target.files;

    if (files) {
      Papa.parse(files[0], {
        escapeFormulae: true,
        header: true,
        skipEmptyLines: true,
        worker: true,
        complete: function (results) {
          setNodesToRender(results.data);
        },
      });
    }
  };

  return (
    <div className="App position-relative">
      <input type="file" onChange={onChangeFileHandler} />
      <CSVDownloader
        type={Type.Button}
        filename={"CallTree"}
        bom={true}
        config={{
          delimiter: ",",
        }}
        data={nodesToRender}
      >
        Download
      </CSVDownloader>
      <MapProvider>
        {nodesToRender && <MapRenderer nodesToRender={nodesToRender} />}
      </MapProvider>
    </div>
  );
}

export default App;
