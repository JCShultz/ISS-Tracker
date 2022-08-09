import React from 'react';
import './app.css';


class AstroListOther extends React.Component {
  constructor(props){
    super(props);
    this.state = {

    };
  }

  render(){
    return (
      <div>
        <h3>People Currently in Space:</h3>
        {this.props.astros.map((astro)=>{
          return <div key={Math.random()}>
            <div className="astroName">{astro.name}</div>
            <div>aboard the: {astro.craft}</div>
          </div>
        })}
      </div>
    )
  }
}

export default AstroListOther;