import React, { useState, createContext } from "react";

const MapContext = createContext();

const MapProvider = ({ children }) => {
  const [showDiv, setShowDiv] = useState(false);
  const [showNodePosition, setShowNodePosition] = useState(false);
  // const [nodeInfo, setNodeInfo] = useState({});

  const showNodeInformationHandler = () => setShowDiv((prevState) => !prevState);
  const showNodePositionHandler = () => setShowNodePosition((prevState) => !prevState);

  return (
    <MapContext.Provider
      value={{
        showDiv,
        showNodePosition,
        showNodeInformationHandler,
        showNodePositionHandler,
      }}
    >
      {children}
    </MapContext.Provider>
  );
};

export { MapProvider, MapContext };
