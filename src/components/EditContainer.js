import React, { useContext, useState, useEffect } from 'react'
import { MapContext } from "../services/MapProvider";

const EditContainer = ({node, setNodeName}) => {
  const { showDiv, showDivHandler } = useContext(MapContext);
  const { id, nodeLabel, nodePosition, hasProducts } = node[0]
  const [nodeInfo, setNodeInfo] = useState({
    id, nodeLabel, nodePosition, hasProducts
  })
  
  const [nodeInfoName, setNodeInfoName] = useState(nodeInfo.nodeLabel)

  useEffect(() => { 
    if (showDiv) setNodeInfo(node)
  }, [showDiv, node])
  
  const onValueChangeHandler = ({ target: { value } }) => {
    setNodeInfoName(value)
    console.log('value', value)
  }
  
  const onSubmitHandler = (evt) => {
    evt.preventDefault()
    setNodeInfo((prevState) => ({ ...prevState, nodeLabel: nodeInfoName}))
    setNodeName(nodeInfo)
    console.log('nodeInfoName', nodeInfoName)
  }

  return (
    <div className={!showDiv ? "d-none" : "showNodeSetup"}>
        <div className="darkedBackground" onClick={()=> showDivHandler() } />
      <div className="nodeContainer">
        <form onSubmit={onSubmitHandler}>
            <label>Node Label:</label>
          <input value={nodeInfoName} onChange={onValueChangeHandler} />
          
          <button type='submit'>Save</button>
        </form>
        </div>
      </div>
  )
}

export default EditContainer