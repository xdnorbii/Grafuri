import React, { useState } from 'react';

const IncidenceMatrix = (props) => {

    const handlerChange = (text, rowIndex, colIndex, e)=>{
        let temp = props.state;
        temp[rowIndex][colIndex] = parseInt(text);
        props.onChange(temp);
    }

    const renderIncidenceMatrix = () => {
      
        if (props.state) {
            return props.state.map((row, rowIndex) => (
            <p>{row.map((el, colIndex) => (<input  onChange={(text)=>handlerChange(text,rowIndex,colIndex)} type="text" style={{ width: 35 }} placeholder={el}></input>))}</p>
            ))
        }
    }

      
    return (
        <div style={{ paddingTop: 60, width: '50%' }}>
            <span>Matricea de incidenta</span>
            {renderIncidenceMatrix()}
        </div>
    )
}

export default IncidenceMatrix;