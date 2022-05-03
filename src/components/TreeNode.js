import React, { useContext } from "react";
import { MapContext } from "../services/MapProvider";
import editIcon from "../assets/svgIcons/editIcon.svg";

const TreeNode = ({ nodeInformation }) => {
  const { showNodeInformationHandler } = useContext(MapContext);
  const { id, nodeLabel, nodePosition, Rules } = nodeInformation;

  const renderRuleBadges = Rules?.map((rule, index) => (
    <span key={index} className={`badge product-badge ${rule.RuleType}-Badge`}>
      {rule.RuleType}
    </span>
  ));

  return (
    <div className="NodeContainer" id={id}>
      {Rules && <div className="BadgeContainer">{renderRuleBadges}</div>}
      <div className="NodeContainer-Name">
        {/* <img src={nodeIcon} alt="node icon.svg" /> */}
        <p># {nodeLabel}</p>
      </div>
      {nodePosition !== "1" && (
        <div className="NodeContainer-PositionContainer">
          <hr className="NodeContainer-Divider" />
          <div className="NodeContainer-Position">
            <span>{nodePosition}</span>
            <button type="button" onClick={showNodeInformationHandler}><img src={editIcon} alt="editIcon.svg" /></button>
          </div>
        </div>
      )}
    </div>
  );
};

TreeNode.defaultProps = {
  hasProducts: false,
  showNodePositions: false,
};

export default TreeNode;
