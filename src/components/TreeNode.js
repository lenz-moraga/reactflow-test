import React from "react";
import nodeIcon from "../assets/svgIcons/nodeIcon.svg";
import editIcon from "../assets/svgIcons/editIcon.svg";

const TreeNode = ({ nodeName, hasProducts, nodePosition }) => {
  return (
    <div className="NodeContainer">
      {hasProducts && <span className="badge product-badge FastLane-Badge">FastLane</span>}
      <div className="NodeContainer-Name">
        <img src={nodeIcon} alt="node icon.svg" />
        <p>{nodeName}</p>
      </div>
      {nodePosition !== "0" && (
        <div className="NodeContainer-Position">
          <span>{nodePosition}</span>
          <img src={editIcon} alt="editIcon.svg" />
        </div>
      )}
    </div>
  );
};

TreeNode.defaultProps = {
  hasProducts: false,
};

export default TreeNode;
