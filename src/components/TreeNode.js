import React from "react";
import nodeIcon from "../assets/nodeIcon.svg";

const TreeNode = ({ nodeName, hasProducts, nodePosition }) => {
  return (
    <div className="NodeContainer">
      {hasProducts && <span className="badge bg-secondary">FastLane</span>}
      <div className="NodeContainer-Name">
        <img src={nodeIcon} alt="node icon.svg" />
        <p>{nodeName}</p>
      </div>
      {nodePosition !== '0' && <div className="NodeContainer-Position">
        <span>{nodePosition}</span>
      </div>}
    </div>
  );
};

TreeNode.defaultProps = {
  hasProducts: false,
};

export default TreeNode;
