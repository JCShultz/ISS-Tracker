import React from 'react';
import axios from 'axios';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
//import { Icon } from 'leaflet';
import L from 'leaflet';
import { useMap } from 'react-leaflet';

import AstroListISS from './AstroListISS.jsx';
import AstroListOther from './AstroListOther.jsx';
import './app.css';
import pic from "./kisspng-international-space-station-space-shuttle-program-space-5ac0cd972b79a4.0453170315225849831781.png";


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
          this.state.astronauts.push(astro);
        }else{
          this.state.astronauts.push(astro);
        }
      })

    })
    .catch((err)=>{
      console.log('There was an error in fetching astronauts: ', err);
    })
  }

  render(){
    let { lat, long, issAstros, otherAstros, astronauts } = this.state;

    let issIcon = L.icon({
      iconUrl: pic,
      iconSize: [ 100, 100]
    })

    function MyComponent() {
      const map = useMap()
      map.setView([lat,long])
    }

    return (
      <div>
         <div className="clickInfo">click ISS icon view the current crew</div>
      <div className="flex-box">
        <div className="list-container">
          <div className="title">ISS Tracker</div>

          <h3>Number of Visitors to the ISS:</h3>
          <AstroListOther astros={astronauts}/>
        </div>
        <MapContainer className="leaflet-container "center={[51.505, -0.09]} zoom={7} scrollWheelZoom={true}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MyComponent/>
          <Marker position={[lat, long]} icon={issIcon}>
            <Popup>
              {"latitude: "+ lat + ", longitiude: " + long} <br /> <AstroListISS astros={issAstros}/>
            </Popup>
          </Marker>
        </MapContainer>
      </div>

      </div>
    )
  }
}

export default App;