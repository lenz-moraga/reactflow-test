import React, { useState, createContext } from "react";

const MapContext = createContext();

const MapProvider = ({ children }) => {
  const [showDiv, setShowDiv] = useState(false);
  const [showNodePosition, setShowNodePosition] = useState("");
  const [nodeInfo, setNodeInfo] = useState({});

  const showDivHandler = () => {
    setShowDiv((prevState) => !prevState);
  };

  return (
    <MapContext.Provider
      value={{
        showDiv,
        showDivHandler,
        nodeInfo,
        showNodePosition,
        setShowNodePosition,
      }}
    >
      {children}
    </MapContext.Provider>
  );
};

export { MapProvider, MapContext };
