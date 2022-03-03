import React from 'react';
import nodeIcon from '../assets/nodeIcon.svg';

const TreeNode = () => {
  return (
    <div>
      <span className="badge bg-secondary">FastLane</span>
      <div>
        <img src={nodeIcon} alt="node icon.svg" />
        <p>1. Everything</p>
      </div>
    </div>
  );
};

export default TreeNode;
