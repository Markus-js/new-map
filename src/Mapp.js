import React, { Component } from "react";
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


class Mapp extends Component {
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

  // rad = (x) => {
  //   return x * Math.PI / 180;
  // };
  
  //  getDistance = (p1, p2) => {
  //   var R = 6378137; // Earth’s mean radius in meter
  //   var dLat = rad(p2.lat() - p1.lat());
  //   var dLong = rad(p2.lng() - p1.lng());
  //   var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
  //     Math.cos(rad(p1.lat())) * Math.cos(rad(p2.lat())) *
  //     Math.sin(dLong / 2) * Math.sin(dLong / 2);
  //   var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  //   var d = R * c;
  //   return d; // returns the distance in meter
  // };
  
  
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

export default Mapp;