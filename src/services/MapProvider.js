import React, { useState, createContext } from "react";

const MapContext = createContext();

const MapProvider = ({ children }) => {
  const [showDiv, setShowDiv] = useState(false);
  const [nodeInfo, setNodeInfo] = useState({})

  const showDivHandler = () => {
    setShowDiv((prevState) => !prevState);
  };

  return (
    <MapContext.Provider value={{showDiv, showDivHandler, nodeInfo}}>
      {children}
    </MapContext.Provider>
  );
};

export { MapProvider, MapContext };
