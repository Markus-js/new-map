import React, { Component } from "react";
import { render } from "react-dom";
import MapGL, {
  Marker,
  Popup,
  GeolocateControl
} from "react-map-gl";

import Lokation from "./lokation-position";
import LokationsInfo from "./lokation-information";

import PLACERINGER from "./placering.json";

const TOKEN =
  "pk.eyJ1IjoibWFya3VzLWpzIiwiYSI6ImNrbWs0ZXR5ZzB4bGEydm5hbXdoN2RodmEifQ.5mEM5omxU7izIaFBIHpOlQ";

  // Styling af locations knap
  const geolocateControlStyle= {
    right: 10,
    top: 10
  };


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        // Aalborg
        latitude: 57.048,
        longitude: 9.9187,
        zoom: 13,
        bearing: 0,
        pitch: 0,
      },
      popupInfo: null,
    };

    window.test = () => {
      this.setState({
        ...this.state,
        viewport: {
          ...this.state.viewport,
          zoom: this.state.viewport.zoom === 5 ? 1 : 5,
        },
      });
    };
  }

  
  _updateViewport = (viewport) => {
    this.setState({ viewport });
  };

  _renderCityMarker = (placering, index) => {
    return (
      <Marker
        key={`marker-${index}`}
        longitude={placering.longitude}
        latitude={placering.latitude}
      >

        <Lokation size={20} onClick={() => this.setState({ popupInfo: placering })} />
      </Marker>
    );
  };


  _renderPopup() {
    const { popupInfo } = this.state;

    return (
      popupInfo && (
        <Popup
          anchor="top"
          longitude={popupInfo.longitude}
          latitude={popupInfo.latitude}
          closeOnClick={true}
          onClose={() => this.setState({ popupInfo: null })}
        >
          <LokationsInfo info={popupInfo} />
        </Popup>
      )
    );
  }

  render() {
    const { viewport } = this.state;

    return (
      <MapGL
        {...viewport}
        width="100vw"
        height="100vh"
        mapStyle="mapbox://styles/mapbox/dark-v9"
        onViewportChange={this._updateViewport}
        mapboxApiAccessToken={TOKEN}
      >
        {PLACERINGER.map(this._renderCityMarker)}

        {this._renderPopup()}
      
        <GeolocateControl
        style={geolocateControlStyle}
        positionOptions={{enableHighAccuracy: true}}
        trackUserLocation={true}
        auto
      />
        
      </MapGL>
    );
  }
}

render(<App />, document.body.appendChild(document.createElement("div")));
