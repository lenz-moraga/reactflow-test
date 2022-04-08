import React, { useContext, useState, useEffect } from "react";
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
import EditContainer from "./EditContainer";

////////////////////////////////////////////////////////////////////////////

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 172;
const nodeHeight = 72;

const customNodes = [
  {
    id: 'horizontal-1',
    nodeLabel: '+1 888 222 3333',
    nodePosition: '0',
    hasProducts: false
  },
  {
    id: 'horizontal-2',
    nodeLabel: 'English',
    nodePosition: '1.1',
    hasProducts: true
  },
  {
    id: 'horizontal-3',
    nodeLabel: 'Spanish',
    nodePosition: '1.2',
    hasProducts: true
  },
  {
    id: 'horizontal-4',
    nodeLabel: 'Portuguese',
    nodePosition: '1.3',
    hasProducts: true
  },
  {
    id: 'horizontal-5',
    nodeLabel: 'Sales',
    nodePosition: '1.3.1',
    hasProducts: false
  },
  {
    id: 'horizontal-6',
    nodeLabel: 'Customer Support',
    nodePosition: '1.3.2',
    hasProducts: false
  },
  {
    id: 'horizontal-7',
    nodeLabel: 'Support',
    nodePosition: '1.3.3',
    hasProducts: false
  },
  {
    id: 'horizontal-8',
    nodeLabel: 'Agents',
    nodePosition: '1.2.1',
    hasProducts: false
  },
]

const initialNodes = customNodes.map((customNode) => (
  {
    id: customNode.id,
    sourcePosition: "right",
    targetPosition: "left",
    data: {
      label: <TreeNode nodeName={customNode.nodeLabel} nodePosition={customNode.nodePosition} hasProducts={customNode.hasProducts} />
    },
  }
));

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
  const { showDiv, showDivHandler } = useContext(MapContext);

  const [nodeName, setNodeName] = useState('');
  const [nodes, setNodes, onNodesChange] = useNodesState(layoutedNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(layoutedEdges);


  const onNodeClick = (event, node) => {
    showDivHandler();
    setNodeName(customNodes.filter((customNode) => node.id === customNode.id))
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
      {showDiv && <EditContainer node={nodeName} setNodeName={setNodeName} />}
    </>
  );
};

export default MapRenderer;
