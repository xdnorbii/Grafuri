import React, { useState } from 'react';

const AdjacencyMatrix = (props) => {

    const handlerChange = (text, rowIndex, colIndex, e)=>{
        if(text.target.value !== '')
        {
            let temp = props.state;
            temp[rowIndex][colIndex] = parseInt(text.target.value);
            props.onChange(temp);
        }
       
    }

    const renderAdjacencyMatrix = () => {
      
        if (props.state) {
            return props.state.map((row,rowIndex) => (
            <p>{row.map((el,colIndex) => (<input onChange={(text)=>handlerChange(text,rowIndex,colIndex)} type="text" style={{ width: 35 }} placeholder={el}></input>))}</p>
            ))
        }
    }

      
    return (
        <div style={{ paddingTop: 60, width: '50%' }}>
            <span>Matricea de adiacenta</span>
            {renderAdjacencyMatrix()}
        </div>
    )
}

export default AdjacencyMatrix;