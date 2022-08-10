import React from 'react';
import './app.css';


function AllAstros(props){
    return (
      <div>
        {props.astros.map((astro)=>{
          return <div className="astroname" key={Math.random()}>{astro}</div>
        })}
      </div>
    )
}

export default AllAstros;