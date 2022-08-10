import React from 'react';
import './app.css';


function AstroListOther(props){
    return (
      <div>
        <h3>People Currently in Space:</h3>
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