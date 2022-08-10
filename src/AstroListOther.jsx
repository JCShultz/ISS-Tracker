import React from 'react';
import './app.css';


function AstroListOther(props){
    return (
      <div>
        <div className="currinspac">Currently in Space:</div>
        {props.astros.map((astro)=>{
          return <div key={Math.random()}>
            <div className="astroName">{astro.name}</div>
            <div className="craftName">aboard the: {astro.craft}</div>
          </div>
        })}
      </div>
    )
}

export default AstroListOther;