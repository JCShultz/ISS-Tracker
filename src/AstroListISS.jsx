import React from 'react';
import './app.css';


//  http://api.open-notify.org/astros.json
//  http://api.open-notify.org/iss-now.json

class AstroListISS extends React.Component {
  constructor(props){
    super(props);
    this.state = {

    };
  }

  render(){
    return (
      <div>
        <h3>Astronauts Aboard:</h3>
        {this.props.astros.map((astro)=>{
          return <div key={Math.random()}>{astro}</div>
        })}
      </div>
    )
  }
}

export default AstroListISS;