import React from 'react';
import './app.css';


//  http://api.open-notify.org/astros.json
//  http://api.open-notify.org/iss-now.json

class AstroListOther extends React.Component {
  constructor(props){
    super(props);
    this.state = {

    };
  }

  render(){
    return (
      <div>
        <h3>Other Astronauts in Space:</h3>
        {this.props.astros.map((astro)=>{
          return <div key={Math.random()}>
            <div>On board the: {astro.craft}</div>
            <div>{astro.name}</div>
          </div>
        })}
      </div>
    )
  }
}

export default AstroListOther;