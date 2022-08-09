import { createRoot } from "react-dom/client";
import React from 'react';
import axios from 'axios';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { Icon } from 'leaflet';
import L from 'leaflet';

import AstroListISS from './AstroListISS.jsx';
import AstroListOther from './AstroListOther.jsx';
import './app.css';


const root = createRoot(document.getElementById("root"));


//  http://api.open-notify.org/astros.json
//  http://api.open-notify.org/iss-now.json

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      astronauts: [],
      issAstros: [],
      otherAstros: [],
      long: 0,
      lat: 0
    };
  }

  componentDidMount = () => {
    this.fetchLocation();
    this.fetchAstronauts();
  }

  fetchLocation = () => {
    axios.get('http://api.open-notify.org/iss-now.json')
      .then((body)=>{
        console.log(body)
        this.setState({
          long: body.data.iss_position.longitude,
          lat: body.data.iss_position.latitude
        })
        setTimeout(this.fetchLocation, 1000);
      })
      .catch((err)=>{
        console.log('There was an error in fetching location: ', err);
      })
  }

  fetchAstronauts = () => {
    axios.get('http://api.open-notify.org/astros.json')
    .then((body)=>{
      console.log(body)
      body.data.people.forEach((astro)=>{
        if(astro.craft === 'ISS'){
          this.state.issAstros.push(astro.name);
        }else{
          this.state.otherAstros.push(astro);
        }
      })

    })
    .catch((err)=>{
      console.log('There was an error in fetching astronauts: ', err);
    })
  }

  render(){
    let { lat, long, issAstros, otherAstros } = this.state;

    var issIcon = new L.Icon({
      iconUrl: require("../public/images/kisspng-international-space-station-space-shuttle-program-space-5ac0cd972b79a4.0453170315225849831781.png"),
      //iconSize: [ , ],
    })

    //public/images/kisspng-international-space-station-space-shuttle-program-space-5ac0cd972b79a4.0453170315225849831781.png

    return (
      <div className="flex-box">
        <div className="list-container">
          <h1>ISS Tracker</h1>
          <h3>Current Count of Visitors to the ISS:</h3>
          <AstroListOther astros={otherAstros}/>
        </div>
        <MapContainer className="leaflet-container "center={[51.505, -0.09]} zoom={5} scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[lat, long]} icon={issIcon}>
            <Popup>
              {"latitude: "+ lat + ", longitiude: " + long} <br /> <AstroListISS astros={issAstros}/>
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    )
  }
}

root.render(<App />);

