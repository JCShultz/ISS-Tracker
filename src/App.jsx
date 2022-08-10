import React from 'react';
import axios from 'axios';
import { MapContainer, Marker, Popup, TileLayer, LayerGroup, Circle } from 'react-leaflet';
import L from 'leaflet';
import { useMap } from 'react-leaflet';

import AstroListISS from './AstroListISS.jsx';
import AstroListOther from './AstroListOther.jsx';
import './app.css';
import pic from "./kisspng-international-space-station-space-shuttle-program-space-5ac0cd972b79a4.0453170315225849831781.png";


class App extends React.Component {
  constructor(props) {
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
        <div className="clickInfo">click ISS icon view the current crew</div>
        <div className="flex-box">
          <div className="list-container">
            <div className="title">ISS Tracker</div>
            <AstroListOther astros={astronauts} />
          </div>
          <MapContainer className="leaflet-container " center={[51.505, -0.09]} zoom={5} scrollWheelZoom={true}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MyComponent />
            <Marker position={[lat, long]} icon={issIcon}>
              <Popup>
                {"latitude: " + lat + ", longitiude: " + long} <br /> <AstroListISS astros={issAstros} />
              </Popup>
            </Marker>
            <LayerGroup>
              <Circle
                center={[lat, long]}
                pathOptions={{ fillColor: 'green' }}
                radius={500000}
                stroke={true}
                weight={10}
                color={'green'}
                opacity={0.20}
              />
            </LayerGroup>
          </MapContainer>
          <div className="c3">
            <div className="stats">
            Statistics:
            </div>
            <div>
            Average Speed: 28000 km/hr
            </div>
            <div>
            Size: 108 meters
            </div>
            <div>
            Average Altitude: 108 meters
            </div>
            <div>
            Orbits the Earth: 19 times/ day
            </div>
          </div>
        </div>
        <div className="haloInfo">green halo is 1,000,000 meters in diameter</div>
      </div>
    )
  }
}

export default App;