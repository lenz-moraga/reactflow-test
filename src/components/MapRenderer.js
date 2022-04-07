import React, { useContext } from "react";
import { MapContext } from "../services/MapProvider";
import ReactFlow, {
  addEdge,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  Position,
} from "react-flow-renderer";
import TreeNode from "./TreeNode";
import dagre from "dagre";

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 172;
const nodeHeight = 36;

const initialNodes = [
  {
    id: "horizontal-1",
    sourcePosition: "right",
    type: "input",
    className: "dark-node",
    data: { label: <TreeNode nodeName="+ 1 800 2224" /> },
    position: { x: 0, y: 80 },
  },
  {
    id: "horizontal-2",
    sourcePosition: "right",
    targetPosition: "left",
    data: { label: <TreeNode nodeName="1. Everything" hasProducts={true} /> },
    position: { x: 250, y: 0 },
  },
  {
    id: "horizontal-3",
    sourcePosition: "right",
    targetPosition: "left",
    data: { label: <TreeNode nodeName="1. Everything" hasProducts={true} /> },
    position: { x: 250, y: 160 },
  },
  {
    id: "horizontal-4",
    sourcePosition: "right",
    targetPosition: "left",
    data: { label: <TreeNode nodeName="1. Everything" hasProducts={true} /> },
    position: { x: 500, y: 0 },
  },
  {
    id: "horizontal-5",
    sourcePosition: "right",
    targetPosition: "left",
    data: { label: <TreeNode nodeName="1. Everything" /> },
    position: { x: 500, y: 100 },
  },
  {
    id: "horizontal-6",
    sourcePosition: "right",
    targetPosition: "left",
    data: { label: <TreeNode nodeName="1. Everything" /> },
    position: { x: 500, y: 230 },
  },
  {
    id: "horizontal-7",
    sourcePosition: "right",
    targetPosition: "left",
    data: { label: <TreeNode nodeName="1. Everything" /> },
    position: { x: 750, y: 50 },
  },
  {
    id: "horizontal-8",
    sourcePosition: "right",
    targetPosition: "left",
    data: { label: <TreeNode nodeName="1. Everything" /> },
    position: { x: 750, y: 300 },
  },
  {
    id: "horizontal-9",
    sourcePosition: "right",
    targetPosition: "left",
    data: { label: <TreeNode nodeName="1. Everything" /> },
    position: { x: 750, y: 300 },
  },
  {
    id: "horizontal-10",
    sourcePosition: "right",
    targetPosition: "left",
    data: { label: <TreeNode nodeName="1. Everything" /> },
    position: { x: 750, y: 300 },
  },
];

const initialEdges = [
  { id: "e1-2", source: "horizontal-1", target: "horizontal-2", type: "step" },
  { id: "e1-3", source: "horizontal-1", target: "horizontal-3", type: "step" },
  { id: "e1-4", source: "horizontal-1", target: "horizontal-4", type: "step" },
  { id: "e4-5", source: "horizontal-4", target: "horizontal-5", type: "step" },
  { id: "e4-6", source: "horizontal-4", target: "horizontal-6", type: "step" },
  { id: "e4-7", source: "horizontal-4", target: "horizontal-7", type: "step" },
  { id: "e3-5", source: "horizontal-3", target: "horizontal-8", type: "step" },
  { id: "e3-6", source: "horizontal-3", target: "horizontal-9", type: "step" },
  { id: "e3-7", source: "horizontal-3", target: "horizontal-10", type: "step" },
];

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
  const { showDiv, showDivHandler, nodeInfo } = useContext(MapContext);

  const [nodes, setNodes, onNodesChange] = useNodesState(layoutedNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(layoutedEdges);

  const onNodeClick = (event, node) => {
    showDivHandler();
    
    console.log("click node", event, node, "showDiv", showDiv);
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
        <Background />
      </ReactFlow>
      <div className={!showDiv ? "d-none" : "showNodeSetup"}>
        <input value={nodeInfo.name} />
      </div>
    </>
  );
};

export default MapRenderer;
