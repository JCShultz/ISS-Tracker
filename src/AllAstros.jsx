import React from 'react';
import './app.css';


function AllAstros(props){
    return (
      <div>
        {props.astros.map((astro)=>{
          return <div key={Math.random()}>{astro}</div>
        })}
      </div>
    )
}

export default AllAstros;