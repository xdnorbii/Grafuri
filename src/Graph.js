import React, { Component } from "react";
import ReactDOM from "react-dom";
import {
    GraphView // required
} from "react-digraph";
import Modal from "./Modal";
import {
    default as nodeConfig,
    EMPTY_EDGE_TYPE,
    CUSTOM_EMPTY_TYPE,
    NODE_KEY,
    POLY_TYPE,
    SPECIAL_CHILD_SUBTYPE,
    SPECIAL_EDGE_TYPE,
    SPECIAL_TYPE,
    SKINNY_TYPE
} from "./config";

import { A_to_All }from './graphFunctions';

import "./styles.css";

const sample = {
    edges: [
    ],
    nodes: [
    ]
};

export default class Graph extends Component {
    constructor(props) {
        super(props);
        this.customNodeRef = React.createRef();
        this.state = {
            graph: sample,
            selected: {}
        };
    }

    componentDidUpdate(prevProps) {
        if(this.props.state!==prevProps.state) // Check if it's a new user, you can also use some unique property, like the ID  (this.props.user.id !== prevProps.user.id)
        {
            this.setState(this.props.state);
        }
      }

    renderNode = (nodeRef, data, id, selected, hovered) => {
        return (
            <g x="0" y="0" className={`shape`}>
                {!selected ? null : (
                    <foreignObject
                        style={{ pointerEvents: "all" }}
                        width="100"
                        height="50"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                    >
                        <Modal
                            id={`${id}-text`}
                            onClick={() => {
                                console.log("onClick text");
                            }}
                        />
                    </foreignObject>
                )}
                <use
                    className={`node ${hovered ? "hovered" : ""} ${selected ? "selected" : ""
                        }`}
                    x="-77"
                    y="-77"
                    width="154"
                    height="154"
                    xlinkHref={`#${data.type}`}
                >
                    <svg viewBox="-27 0 154 154" id={data.type} width="154" height="154">
                        <rect
                            transform="translate(50) rotate(45)"
                            width="109"
                            height="109"
                        />
                    </svg>
                </use>
            </g>
        );
    };

    // onSelectEdge = (node, event) => {
    //   //console.log("test select edge");
    // };

    // onUpdateNode = () => true;

    // onDeleteNode = (...args) => {
    //   this.setState({});
    // };

    getNodeIndex(searchNode) {
        return this.state.graph.nodes.findIndex(node => {
            return node[NODE_KEY] === searchNode[NODE_KEY];
        });
    }

    // Helper to find the index of a given edge
    getEdgeIndex(searchEdge) {
        return this.state.graph.edges.findIndex(edge => {
            return (
                edge.source === searchEdge.source && edge.target === searchEdge.target
            );
        });
    }

    // Given a nodeKey, return the corresponding node
    getViewNode(nodeKey) {
        const searchNode = {};

        searchNode[NODE_KEY] = nodeKey;
        const i = this.getNodeIndex(searchNode);

        return this.state.graph.nodes[i];
    }

    addStartNode = e => {
        const graph = this.state.graph;

        // using a new array like this creates a new memory reference
        // this will force a re-render
        graph.nodes = [...this.state.graph.nodes,
            {
                id: Date.now(),
                title: (this.state.graph.nodes.length+1).toString(),
                type: CUSTOM_EMPTY_TYPE,
                x: e ? e.screenX : 0, //Figure out the correct coordinates to drop
                y: e ? e.screenY : 0
            },
        ];
        this.setState({
            graph
        });
        
        this.props.onChange(this.state);
    };

    deleteStartNode = () => {
        const graph = this.state.graph;

        graph.nodes.splice(0, 1);
        // using a new array like this creates a new memory reference
        // this will force a re-render
        graph.nodes = [...this.state.graph.nodes];
        this.setState({
            graph
        });
    };

    handleChange = event => {
        this.setState(
            {
                totalNodes: parseInt(event.target.value || "0", 10)
            },
            this.makeItLarge
        );
        
        this.props.onChange(this.state);
    };

    /*
     * Handlers/Interaction
     */

    // Called by 'drag' handler, etc..
    // to sync updates from D3 with the graph
    onUpdateNode = viewNode => {
        const graph = this.state.graph;
        const i = this.getNodeIndex(viewNode);

        graph.nodes[i] = viewNode;
        this.setState({ graph });
        
        this.props.onChange(this.state);
    };

    // Node 'mouseUp' handler
    onSelectNode = (viewNode, event) => {
        const { id = "" } = event?.target ? event.target : { id: '' };
        if (id.includes("text")) {
            document.getElementById(event.target.id).click();
        }

        // Deselect events will send Null viewNode
        this.setState({ selected: viewNode });
        
        this.props.onChange(this.state);
    };

    // Edge 'mouseUp' handler
    onSelectEdge = viewEdge => {
        this.setState({ selected: viewEdge });
        
        this.props.onChange(this.state);
    };

    // Updates the graph with a new node
    onCreateNode = (x, y) => {
        const graph = this.state.graph;

        // This is just an example - any sort of logic
        // could be used here to determine node type
        // There is also support for subtypes. (see 'sample' above)
        // The subtype geometry will underlay the 'type' geometry for a node
        const type = Math.random() < 0.25 ? SPECIAL_TYPE : CUSTOM_EMPTY_TYPE;

        const viewNode = {
            id: Date.now(),
            title: "",
            text: '',
            type,
            x,
            y
        };

        graph.nodes = [...graph.nodes, viewNode];
        this.setState({ graph });
        
        this.props.onChange(this.state);
    };

    // Deletes a node from the graph
    onDeleteNode = (viewNode, nodeId, nodeArr) => {
        const graph = this.state.graph;
        // Delete any connected edges
        const newEdges = graph.edges.filter((edge, i) => {
            return (
                edge.source !== viewNode[NODE_KEY] && edge.target !== viewNode[NODE_KEY]
            );
        });

        graph.nodes = nodeArr;
        graph.edges = newEdges;

        this.setState({ graph, selected: null });
        
        this.props.onChange(this.state);
    };

    // Creates a new node between two edges
    onCreateEdge = (sourceViewNode, targetViewNode) => {
        const graph = this.state.graph;
        // This is just an example - any sort of logic
        // could be used here to determine edge type
        const type =
            sourceViewNode.type === SPECIAL_TYPE
                ? SPECIAL_EDGE_TYPE
                : EMPTY_EDGE_TYPE;

        const viewEdge = {
            source: sourceViewNode[NODE_KEY],
            target: targetViewNode[NODE_KEY],
            type
        };

        // Only add the edge when the source node is not the same as the target
        if (viewEdge.source !== viewEdge.target) {
            graph.edges = [...graph.edges, viewEdge];
            this.setState({
                graph,
                selected: viewEdge
            });
            
        this.props.onChange(this.state);
        }
    };

    // Called when an edge is reattached to a different target.
    onSwapEdge = (sourceViewNode, targetViewNode, viewEdge) => {
        const graph = this.state.graph;
        const i = this.getEdgeIndex(viewEdge);
        const edge = JSON.parse(JSON.stringify(graph.edges[i]));

        edge.source = sourceViewNode[NODE_KEY];
        edge.target = targetViewNode[NODE_KEY];
        graph.edges[i] = edge;
        // reassign the array reference if you want the graph to re-render a swapped edge
        graph.edges = [...graph.edges];

        this.setState({
            graph,
            selected: edge
        });
        
        this.props.onChange(this.state);
    };

    // Called when an edge is deleted
    onDeleteEdge = (viewEdge, edges) => {
        const graph = this.state.graph;

        graph.edges = edges;
        this.setState({
            graph,
            selected: null
        });
        
        this.props.onChange(this.state);
    };

    onUndo = () => {
        // Not implemented
        console.warn("Undo is not currently implemented in the example.");
        // Normally any add, remove, or update would record the action in an array.
        // In order to undo it one would simply call the inverse of the action performed. For instance, if someone
        // called onDeleteEdge with (viewEdge, i, edges) then an undelete would be a splicing the original viewEdge
        // into the edges array at position i.
    };

    onCopySelected = () => {
        if (this.state.selected.source) {
            console.warn("Cannot copy selected edges, try selecting a node instead.");

            return;
        }

        const x = this.state.selected.x + 10;
        const y = this.state.selected.y + 10;

        this.setState({
            copiedNode: { ...this.state.selected, x, y }
        });
        
        this.props.onChange(this.state);
    };

    onPasteSelected = () => {
        if (!this.state.copiedNode) {
            console.warn(
                "No node is currently in the copy queue. Try selecting a node and copying it with Ctrl/Command-C"
            );
        }

        const graph = this.state.graph;
        const newNode = { ...this.state.copiedNode, id: Date.now() };

        graph.nodes = [...graph.nodes, newNode];
        this.forceUpdate();
    };

    handleChangeLayoutEngineType = event => {
        this.setState({
            layoutEngineType: event.target.value
        });
        
        this.props.onChange(this.state);
    };

    onSelectPanNode = event => {
        if (this.GraphView) {
            this.GraphView.panToNode(event.target.value, true);
        }
    };

    /* Define custom graph editing methods here */

   
    render() {
        const nodes = this.state.graph.nodes;
        const edges = this.state.graph.edges;
        const selected = this.state.selected;

        return (
            <div id="graph" style={{display:'flex',flex:1}}>
                <div style={{ height: "35rem", width:'100%' }}>
                    <button onClick={this.addStartNode}>Creeaza nod</button>
                    <GraphView
                        showGraphControls={true}
                        gridSize="100rem"
                        gridDotSize={1}
                        renderNodeText={false}
                        ref="GraphView"
                        nodeKey={NODE_KEY}
                        nodes={nodes}
                        edges={edges}
                        selected={selected}
                        nodeTypes={nodeConfig.NodeTypes}
                        nodeSubtypes={nodeConfig.NodeSubtypes}
                        edgeTypes={nodeConfig.NodeTypes}
                        onSelectNode={this.onSelectNode}
                        onCreateNode={this.onCreateNode}
                        onUpdateNode={this.onUpdateNode}
                        onDeleteNode={this.onDeleteNode}
                        onSelectEdge={this.onSelectEdge}
                        onCreateEdge={this.onCreateEdge}
                        onSwapEdge={this.onSwapEdge}
                        onDeleteEdge={this.onDeleteEdge}
                        readOnly={false}
                    //renderNode={this.renderNode}
                    />
                </div>
                
            </div>
        );
    }
}