import React, { useState } from 'react';
import logo from './logo.svg';
import Graph from './Graph';
import './App.css';
import AdjacencyMatrix from './AdjacencyMatrix';
import { A_to_all, B_to_all, U_to_all, Ls_to_all, Lp_to_all } from './graphFunctions';
import IncidenceMatrix from './IncidenceMatrix';
import Arcs from './Arcs';
import Predecessors from './Predecessors';
import Successors from './Successors';
function App() {
  const [graphState, setGraphState] = useState();
  const [adjacencyState, setAdjacencyState] = useState();
  const [incidenceState, setIncidenceState] = useState();
  const [arcsState, setArcsState] = useState();
  const [predecessorsState, setPredecessorsState] = useState();
  const [successorsState, setSuccessorsState] = useState();


  const A_to_graph = (data) => {
    let copy = JSON.parse(JSON.stringify(graphState));
    copy.graph.nodes = data.map((item, index) => ({
      id: index + 1,
      title: index + 1,
      type: 'customEmpty',
      x: copy.graph.nodes[index].x,
      y: copy.graph.nodes[index].y 
    }));
    copy.graph.edges = [];
    data.map((row, rowIndex) => {
      row.map((item, colIndex) => {
       if(item===1 )
        copy.graph.edges.push({
          source: rowIndex + 1,
          target: colIndex + 1
        })
      }
      )
    });
    setGraphState(copy);
  }

  const graph_to_A = (data) => {
    setGraphState(data);
    let ad = Array.from({
      // generate array of length m
      length: data.graph.nodes?.length
      // inside map function generate array of size n
      // and fill it with `0`
    }, () => new Array(data.graph.nodes.length).fill(0));
    data.graph.edges.map(edge => {
      let source, target;
      data.graph.nodes.map((node, index) => {
        if (edge.source === node.id) {
          source = index;
        }
        if (edge.target === node.id) {
          target = index;
        }
      })
      ad[source][target] = 1;
    })
    const tr = A_to_all(ad);
    console.log(tr);
    setAdjacencyState(ad);
    setIncidenceState(tr.incidenta);
    setArcsState(tr.arce);
    setPredecessorsState(tr.predecesori);
    setSuccessorsState(tr.succesori);
  }

  const adjacency_to_A = (ad) => {
    const tr = A_to_all(ad);
    setAdjacencyState(ad);
    A_to_graph(ad);
    setIncidenceState(tr.incidenta);
    setArcsState(tr.arce);
    setPredecessorsState(tr.predecesori);
    setSuccessorsState(tr.succesori);
  }

  const incidence_to_A = (data) => {
    const tr = B_to_all(data);
    setIncidenceState(data);
    A_to_graph(tr.adiacenta);
    setAdjacencyState(tr.adiacenta);
    setArcsState(tr.arce);
    setPredecessorsState(tr.predecesori);
    setSuccessorsState(tr.succesori);
  }

  const arcs_to_A = (data) => {
    const tr = U_to_all(data,adjacencyState.length);
    setArcsState(data);
    A_to_graph(tr.adiacenta);
    setAdjacencyState(tr.adiacenta);
    setIncidenceState(tr.incidenta);
    setPredecessorsState(tr.predecesori);
    setSuccessorsState(tr.succesori);
  }

  const predecessors_to_A = (data) => {
    const tr = Lp_to_all(data);
    setArcsState(data);
    A_to_graph(tr.adiacenta);
    setAdjacencyState(tr.adiacenta);
    setIncidenceState(tr.incidenta);
    setPredecessorsState(tr.predecesori);
    setSuccessorsState(tr.succesori);
  }

  const succesors_to_A = (data) => {
    const tr = Ls_to_all(data,adjacencyState.length);
    setArcsState(data);
    A_to_graph(tr.adiacenta);
    setAdjacencyState(tr.adiacenta);
    setIncidenceState(tr.incidenta);
    setPredecessorsState(tr.predecesori);
    setSuccessorsState(tr.succesori);
  }

  console.log(graphState);
  return (
    <div className="App">
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <Graph onChange={graph_to_A} state={graphState} />
        <div style={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
          <div style={{ display: 'flex', flexDirection: 'row', flex: 1 }}>
            <AdjacencyMatrix onChange={adjacency_to_A} state={adjacencyState} />
            <IncidenceMatrix onChange={incidence_to_A} state={incidenceState} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'row', flex: 1 }}>
            <Arcs onChange={arcs_to_A} state={arcsState} />
            <Predecessors onChange={predecessors_to_A} state={predecessorsState} />
          </div>

          <Successors onChange={succesors_to_A} state={successorsState} />
        </div>
      </div>

    </div>
  );
}

export default App;
