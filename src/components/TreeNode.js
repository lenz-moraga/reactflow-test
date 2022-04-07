import React from "react";
import nodeIcon from "../assets/nodeIcon.svg";

const TreeNode = ({ nodeName, hasProducts }) => {
  return (
    <div className="NodeContainer">
      {hasProducts && <span className="badge bg-secondary">FastLane</span>}
      <div className="NodeContainer-Information">
        <img src={nodeIcon} alt="node icon.svg" />
        <p>{nodeName}</p>
      </div>
    </div>
  );
};

TreeNode.defaultProps = {
  hasProducts: false,
};

export default TreeNode;
