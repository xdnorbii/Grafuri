import React, { useState } from 'react';

const Arcs = (props) => {

    const handlerChange = (text, rowIndex, colIndex, e) => {
        if (text.target.value !== '') {
            let temp = props.state;
            if (rowIndex === 0) {
                temp.from[colIndex] = parseInt(text.target.value);
            }
            else {
                temp.to[colIndex] = parseInt(text.target.value);

            }
            props.onChange(temp);
        }
    }

    const renderArcs = () => {
        if (props.state !== undefined) {
            if (props.state.from.length !== 0)
                return (
                    <div>
                        <p>
                            <span>From: </span>
                            {props.state.from.map((item, index) => (<input onChange={(text) => handlerChange(text, 0, index)} type="text" style={{ width: 35 }} placeholder={item} />))}
                        </p>
                        <p>
                            <span>To: </span>
                            {props.state.to.map((item, index) => (<input onChange={(text) => handlerChange(text, 1, index)} type="text" style={{ width: 35 }} placeholder={item} />))}
                        </p>
                    </div>
                )
        }
    }


    return (
        <div style={{ paddingTop: 60, width: '50%' }}>
            <span>Arce</span>
            {renderArcs()}
        </div>
    )
}

export default Arcs;