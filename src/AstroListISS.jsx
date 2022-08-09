import React from 'react';
import './app.css';


function AstroListISS(props){
    return (
      <div>
        <h3>Astronauts Aboard:</h3>
        {props.astros.map((astro)=>{
          return <div key={Math.random()}>{astro}</div>
        })}
      </div>
    )
}

export default AstroListISS;