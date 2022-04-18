import React, { useContext, useState, useEffect } from "react";
import { MapContext } from "../services/MapProvider";
import ReactFlow, {
  addEdge,
  MiniMap,
  Controls,
  useNodesState,
  useEdgesState,
  Position,
} from "react-flow-renderer";
import TreeNode from "./TreeNode";
import dagre from "dagre";
import EditContainer from "./EditContainer";
import dataNode from '../assets/nodeData/dataNode.json'

////////////////////////////////////////////////////////////////////////////

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 172;
const nodeHeight = 72;

const customNodes = [...dataNode]
const filteredNodes = customNodes.filter((nodeInfo) => (
  nodeInfo.from !== '' && nodeInfo.to !== ''
))
const initialEdges = filteredNodes.map((nodeInfo) => (
  {
    id: `edge-${nodeInfo.id}`,
    source: nodeInfo.from,
    target: nodeInfo.to,
    type: "default",
  }
))

const initialNodes = customNodes.map((customNode) => ({
  id: customNode.id,
  sourcePosition: "right",
  targetPosition: "left",
  data: {
    label: <TreeNode key={customNode.id} nodeInformation={customNode} />,
  },
}));

const getLayoutedElements = (nodes, edges, direction = "LR") => {
  const isHorizontal = direction === "LR";
  dagreGraph.setGraph({ rankdir: direction });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  nodes.forEach((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    node.targetPosition = isHorizontal ? Position.Left : Position.Top;
    node.sourcePosition = isHorizontal ? Position.Right : Position.Bottom;

    // We are shifting the dagre node position (anchor=center center) to the top left
    // so it matches the React Flow node anchor point (top left).
    node.position = {
      x: nodeWithPosition.x - nodeWidth / 2,
      y: nodeWithPosition.y - nodeHeight / 2,
    };

    return node;
  });

  return { nodes, edges };
};

const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
  initialNodes,
  initialEdges
);

//////////////////////////////////////////////////////////////////////////

const MapRenderer = () => {
  const { showDiv, showDivHandler } = useContext(MapContext);

  const [nodeName, setNodeName] = useState("");
  const [nodes, setNodes, onNodesChange] = useNodesState(layoutedNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(layoutedEdges);

  useEffect(() => { 
    
  }, [])

  const onNodeClick = (event, node) => {
    showDivHandler();
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
        <MiniMap />
        <Controls />
      </ReactFlow>
      {showDiv && <EditContainer node={nodeName} setNodeName={setNodeName} />}
    </>
  );
};

export default MapRenderer;
