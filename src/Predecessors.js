import React, { useState } from 'react';

const Predecessors = (props) => {

    const handlerChange = (text, rowIndex, colIndex, e)=>{
        let temp = props.state;
        if(rowIndex===0){
            temp.pozitia[colIndex] = parseInt(text);
        }
        else{
            temp.predecesori[colIndex] = parseInt(text);
        
        }
        props.onChange(temp);
    }

    const renderPredecessors = () => {
        if (props.state !== undefined) {
            if(props.state.pozitia.length!==0)
                return (
                    <div>
                        <p>
                        <span>Poz: </span>
                        {props.state.pozitia.map((item,index)=>(<input onChange={(text)=>handlerChange(text,0,index)} type="text" style={{ width: 35 }}  placeholder={item}/>))}
                        </p>
                        <p>
                        <span>Pred: </span>
                        {props.state.predecesori.map((item,index)=>(<input onChange={(text)=>handlerChange(text,1,index)} type="text" style={{ width: 35 }} placeholder={item}/>))}
                        </p>
                    </div>
                )
        }
    }

      
    return (
        <div style={{ paddingTop: 60, width: '50%' }}>
            <span>Predecesori</span>
            {renderPredecessors()}
        </div>
    )
}

export default Predecessors;