import React from "react";
import nodeIcon from "../assets/svgIcons/nodeIcon.svg";
import editIcon from "../assets/svgIcons/editIcon.svg";

const TreeNode = ({ nodeInformation }) => {
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
        <img src={nodeIcon} alt="node icon.svg" />
        <p>{nodeLabel}</p>
      </div>
      {nodePosition !== "1" && (
        <>
          <hr className="NodeContainer-Divider" />
          <div className="NodeContainer-Position">
            <span>{nodePosition}</span>
            <img src={editIcon} alt="editIcon.svg" />
          </div>
        </>
      )}
    </div>
  );
};

TreeNode.defaultProps = {
  hasProducts: false,
};

export default TreeNode;
