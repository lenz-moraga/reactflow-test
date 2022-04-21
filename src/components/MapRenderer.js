import React, { useContext, useState, useEffect } from "react";
import { MapContext } from "../services/MapProvider";
import ReactFlow, {
  addEdge,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
} from "react-flow-renderer";
import TreeNode from "./TreeNode";

import { getLayoutedElements } from "../services/layOutNodes";

import EditContainer from "./EditContainer";
import dataNode from "../assets/nodeData/dataNode.json";

const MapRenderer = () => {
  const { showDiv, showNodePosition, setShowNodePosition } =
    useContext(MapContext);
  const [nodeName, setNodeName] = useState("");

  useEffect(() => {}, []);

  ////////////////////////////////////////////////////////////////////////////

  const customNodes = [...dataNode];
  const filteredNodes = customNodes.filter(
    (nodeInfo) => nodeInfo.from !== "" && nodeInfo.to !== ""
  );
  const initialEdges = filteredNodes.map((nodeInfo) => ({
    id: `edge-${nodeInfo.id}`,
    source: nodeInfo.from,
    target: nodeInfo.to,
    type: "default",
  }));

  const initialNodes = customNodes.map((customNode) => ({
    id: customNode.id,
    sourcePosition: "right",
    targetPosition: "left",
    data: {
      label: <TreeNode key={customNode.id} nodeInformation={customNode} />,
    },
  }));

  const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
    initialNodes,
    initialEdges
  );

  const [nodes, setNodes, onNodesChange] = useNodesState(layoutedNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(layoutedEdges);

  //////////////////////////////////////////////////////////////////////////

  const onNodeClick = (event, node) => {
    if(event.detail === 2) console.log('first')
    setShowNodePosition((prevState) => !prevState);
    setNodeName(customNodes.filter((customNode) => node.id === customNode.id));
  };

  const onConnect = (params) => setEdges((els) => addEdge(params, els));

  return (
    <>
      <ReactFlow
        style={{ width: "100vw", height: "100vh" }}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodesDraggable={false}
        onNodeClick={onNodeClick}
        fitView
      >
        <Background />
        <MiniMap />
        <Controls />
      </ReactFlow>
      {showDiv && <EditContainer node={nodeName} setNodeName={setNodeName} />}
    </>
  );
};

export default MapRenderer;
