import React from 'react';
import axios from 'axios';
import { MapContainer, Marker, Popup, TileLayer, LayerGroup, Circle } from 'react-leaflet';
import L from 'leaflet';
import { useMap } from 'react-leaflet';

import AstroListISS from './AstroListISS.jsx';
import AstroListOther from './AstroListOther.jsx';
import AllAstros from './AllAstros.jsx';
import './app.css';
import pic from "./kisspng-international-space-station-space-shuttle-program-space-5ac0cd972b79a4.0453170315225849831781.png";


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      astronauts: [],
      issAstros: [],
      otherAstros: [],
      allAstros: [],
      long: 0,
      lat: 0
    };
  }

  componentDidMount = () => {
    this.fetchLocation();
    this.fetchAstronauts();
    this.fetchAllAstronauts();
  }

  fetchLocation = () => {
    axios.get('/location')
      .then((body) => {
        //console.log('client', body)
        this.setState({
          long: body.data.iss_position.longitude,
          lat: body.data.iss_position.latitude
        })
        setTimeout(this.fetchLocation, 1000);
      })
      .catch((err) => {
        console.log('There was an error in fetching location: ', err);
      })
  }

  fetchAstronauts = () => {
    axios.get('/astronauts')
      .then((body) => {
        //console.log("client ", body)
        body.data.people.forEach((astro) => {
          if (astro.craft === 'ISS') {
            this.state.issAstros.push(astro.name);
            this.state.astronauts.push(astro);
          } else {
            this.state.astronauts.push(astro);
          }
        })

      })
      .catch((err) => {
        console.log('There was an error in fetching astronauts: ', err);
      })
  }

  fetchAllAstronauts = () => {
    axios.get('/allastros')
      .then((body) => {
        console.log("client ", body.data)
        body.data.forEach((astro) => {
          if (astro.name) {
            this.state.allAstros.push(astro.name);
          }
        })

      })
      .catch((err) => {
        console.log('There was an error in fetching all astronauts: ', err);
      })
  }



  render() {
    let { lat, long, issAstros, otherAstros, astronauts } = this.state;

    let issIcon = L.icon({
      iconUrl: pic,
      iconSize: [100, 100]
    })

    function MyComponent() {
      const map = useMap()
      map.setView([lat, long])
    }

    return (
      <div className="background">
        <div className="flex-box">
          <div className="list-container">
            <div className="title">ISS Tracker</div>
            <div className="fs10pt">longitude: {long}</div>
            <div className="fs10pt">latitude: {lat}</div>
            <AstroListOther astros={astronauts} />
          </div>
          <MapContainer className="leaflet-container " center={[51.505, -0.09]} zoom={5} scrollWheelZoom={true} zoomControl={false}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy;<a href="https://carto.com/attributions">CARTO</a>'
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            />
            <MyComponent />
            <Marker className="icon" position={[lat, long]} icon={issIcon}>
              <Popup>
                {"latitude: " + lat + ", longitiude: " + long} <br /> <AstroListISS astros={issAstros} />
              </Popup>
            </Marker>
            <LayerGroup>
              <Circle
                className="circle4"
                center={[lat, long]}
                pathOptions={{ fillColor: 'rgb(116, 255, 35)' }}
                radius={500000}
                stroke={true}
                weight={10}
                color={'rgb(116, 255, 35)'}
                opacity={0.10}
              />
              <Circle
                className="circle2"
                center={[lat, long]}
                pathOptions={{ fillColor: 'rgb(116, 255, 35)' }}
                radius={250000}
                stroke={true}
                weight={10}
                color={'rgb(116, 255, 35)'}
                opacity={0.10}
              />
              <Circle
                className="circle3"
                center={[lat, long]}
                pathOptions={{ fillColor: 'rgb(116, 255, 35)' }}
                radius={370000}
                stroke={true}
                weight={10}
                color={'rgb(116, 255, 35)'}
                opacity={0.10}
              />
                <Circle
                className="circle1"
                center={[lat, long]}
                pathOptions={{ fillColor: 'rgb(116, 255, 35)' }}
                radius={130000}
                stroke={true}
                weight={10}
                color={'rgb(116, 255, 35)'}
                opacity={0.10}
              />
            </LayerGroup>
          </MapContainer>
          <div className="c3">
            <div className="stats">
              Statistics:
            </div>
            <div className="statslist">
              Average Speed: 28000 km/hr
            </div>
            <div className="statslist">
              Size: 108 meters
            </div>
            <div className="statslist">
              Average Altitude: 420 km
            </div>
            <div className="statslist">
              Orbits/24hrs: 19
            </div>
            <div className="numberserved">
              {this.state.allAstros.length}
            </div>
            <div className="astrosserved">
              Visitors to the ISS:
            </div>
            <div className="allastros">
              <AllAstros astros={this.state.allAstros} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App;