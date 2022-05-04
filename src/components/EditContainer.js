import React, { useContext, useEffect } from "react";
import { MapContext } from "../services/MapProvider";

const EditContainer = ({ node, setNodeName }) => {
  const { showDiv, showNodeInformationHandler } = useContext(MapContext);
  const { nodeId, nodeLabel, nodePosition } = node[0];
  // const [nodeInfo, setNodeInfo] = useState({
  //   nodeId,
  //   nodeLabel,
  //   nodePosition,
  // });

  // const [nodeName] = useState(nodeInfo.nodeLabel || '')
  // const [nodePositionInfo] = useState(nodeInfo.nodePosition || '')

  console.log('nodeId', nodeId)

  useEffect(() => {
    // if (showDiv && node) setNodeInfo(node);
  }, [showDiv, node]);

  // const onValueChangeHandler = ({ target: { name, value } }) => {
  //   setNodeInfo((prevState) => ({ ...prevState, [name]: value }));
  // };

  const onSubmitHandler = (evt) => {
    evt.preventDefault();
    // setNodeInfo((prevState) => ({ ...prevState, nodeLabel: nodeInfoName }));
    // setNodeName(nodeInfo);
    // console.log("nodeInfoName", nodeInfoName);
  };

  return (
    <div className={!showDiv ? "d-none" : "showNodeSetup"}>
      <div className="darkedBackground" onClick={() => showNodeInformationHandler()} />
      <div className="nodeContainer">
        <form onSubmit={onSubmitHandler} className="nodeContainer-Form">
          <div className="formbuilder-text form-group field-text-1650292239440">
            <label htmlFor="text-1650292239440" className="formbuilder-text-label">
              Node Name
            </label>
            <input
              type="text"
              className="form-control"
              name="nodeLabel"
              access="false"
              id="text-1650292239440"
              value={nodeLabel}
              // onChange={onValueChangeHandler}
              readOnly
            />
          </div>
          <div className="formbuilder-text form-group field-text-1650292242226">
            <label htmlFor="text-1650292242226" className="formbuilder-text-label">
              Node Position
            </label>
            <input
              type="text"
              className="form-control"
              name="nodePosition"
              access="false"
              id="text-1650292242226"
              value={nodePosition}
              // onChange={onValueChangeHandler}
              readOnly
            />
          </div>
          <div className="formbuilder-checkbox-group form-group field-checkbox-group-1650292285427">
            <label
              htmlFor="checkbox-group-1650292285427"
              className="formbuilder-checkbox-group-label"
            >
              Pricing Rules
            </label>
            <div className="checkbox-group">
              <div className="formbuilder-checkbox-inline">
                <input
                  name="checkbox-group-1650292285427[]"
                  access="false"
                  id="checkbox-group-1650292285427-0"
                  value="FastLane"
                  type="checkbox"
                />
                <label htmlFor="checkbox-group-1650292285427-0">FastLane</label>
              </div>
              <div className="formbuilder-checkbox-inline">
                <input
                  name="checkbox-group-1650292285427[]"
                  access="false"
                  id="checkbox-group-1650292285427-1"
                  value="PayPhone"
                  type="checkbox"
                />
                <label htmlFor="checkbox-group-1650292285427-1">PayPhone</label>
              </div>
            </div>
          </div>
          <div className="formbuilder-button form-group field-button-1650293800182">
            <button
              type="submit"
              className="btn-primary btn"
              name="button-1650293800182"
              access="false"
              id="button-1650293800182"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditContainer;
