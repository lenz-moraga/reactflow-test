import React, { useState } from 'react';
import ReactFlow, {
  removeElements,
  addEdge,
  MiniMap,
  Controls,
  Background,
  isNode,
} from 'react-flow-renderer';
import dagre from 'dagre';
import TreeNode from './TreeNode';

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 172;
const nodeHeight = 36;

const getLayoutedElements = (elements, direction = 'LR') => {
  const isHorizontal = direction === 'LR';
  dagreGraph.setGraph({ rankdir: direction });

  elements.forEach((el) => {
    if (isNode(el)) {
      dagreGraph.setNode(el.id, { width: nodeWidth, height: nodeHeight });
    } else {
      dagreGraph.setEdge(el.source, el.target);
    }
  });

  dagre.layout(dagreGraph);

  return elements.map((el) => {
    if (isNode(el)) {
      const nodeWithPosition = dagreGraph.node(el.id);
      el.targetPosition = isHorizontal ? 'left' : 'top';
      el.sourcePosition = isHorizontal ? 'right' : 'bottom';

      // unfortunately we need this little hack to pass a slightly different position
      // to notify react flow about the change. Moreover we are shifting the dagre node position
      // (anchor=center center) to the top left so it matches the react flow node anchor point (top left).
      el.position = {
        x: nodeWithPosition.x - nodeWidth / 2 + Math.random() / 1000,
        y: nodeWithPosition.y - nodeHeight / 2,
      };
    }

    return el;
  });
};

const initialElements = [
  { id: '1', data: { label: 'Node 1' }, position: { x: 250, y: 50 } },
  // you can also pass a React component as a label
  {
    id: '2',
    data: { label: <TreeNode /> },
    position: { x: 100, y: 100 },
  },
  {
    id: '3',
    data: { label: <TreeNode /> },
    position: { x: 100, y: 100 },
  },
  {
    id: '4',
    data: { label: <TreeNode /> },
    position: { x: 100, y: 100 },
  },
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e1-3', source: '1', target: '3' },
  { id: 'e1-4', source: '1', target: '4' },
];
const layoutedElements = getLayoutedElements(initialElements);

const MapRenderer = () => {
  const [elements, setElements] = useState(layoutedElements);

  const onLoad = (reactFlowInstance) => {
    reactFlowInstance.fitView();
    console.log(reactFlowInstance.getElements());
  };
  const onElementsRemove = (elementsToRemove) =>
    setElements((els) => removeElements(elementsToRemove, els));
  const onConnect = (params) => setElements((els) => addEdge(params, els));

  return (
    <ReactFlow
      style={{ width: '100vw', height: '100vh' }}
      elements={elements}
      onLoad={onLoad}
      onElementsRemove={onElementsRemove}
      onConnect={onConnect}
      minZoom={0.2}
    >
      <MiniMap />
      <Controls />
      <Background />
    </ReactFlow>
  );
};

export default MapRenderer;
