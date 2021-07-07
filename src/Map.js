import React from "react";
import { useRef, useState } from "react";
import { MapContainer, TileLayer,FeatureGroup } from "react-leaflet";
import AddMarkers from "./AddMarkers";
import { EditControl, } from "react-leaflet-draw";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import L from "leaflet";
import IconButton from '@material-ui/core/IconButton';
import Well from './images/pozo.png';
import Sewer from './images/sumidero.png';
import Line from './images/tramo.png';
import "./App.css";
import { map } from "bluebird";

const POSITION_CLASSES = {
  bottomleft: 'leaflet-bottom leaflet-left',
  bottomright: 'leaflet-bottom leaflet-right',
  topleft: 'leaflet-top leaflet-left',
  topright: 'leaflet-top leaflet-right',
}

function setIcon (iconRet,icon){
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: iconRet,
      iconUrl: icon,
      shadowUrl: null,
    })
}

const Map =({onOpen, info}) => {

  const onWellClick = (e) => {
    var e = document.createEvent('Event');
    e.initEvent('click', true, true);
    var cb = document.getElementsByClassName('leaflet-draw-draw-marker');
    setIcon(Well,Well)
    return !cb[0].dispatchEvent(e);
    }

    const onSewerClick = (e) => {
      var e = document.createEvent('Event');
      e.initEvent('click', true, true);
      var cb = document.getElementsByClassName('leaflet-draw-draw-marker');
      setIcon(Sewer,Sewer)
      return !cb[0].dispatchEvent(e);
      }


  return (
    <MapContainer
      doubleClickZoom={false}
      id="mapId"
      zoom={14}
      center={{
        lat: 7.11392,
        lng: -73.1198
      }}
    >
    <div className= {POSITION_CLASSES.topright}>
      <div className="leaflet-control leaflet-bar IconButton">
      <IconButton  className='IconButton'   onClick={(e)=> {onWellClick(e)}}>
        <img src={Well} className='Icon'/>
      </IconButton>
      </div>
      <div className="leaflet-control leaflet-bar IconButton">
      <IconButton className='IconButton'  onClick={(e)=> {onSewerClick(e)}}>
        <img src={Sewer} className='Icon'/>
      </IconButton>
      </div>
      <div className="leaflet-control leaflet-bar IconButton">
      <IconButton className='IconButton'>
        <img src={Line} className='Icon'/>
      </IconButton>
      </div>
    </div>
   <FeatureGroup>
      
      <EditControl 
      position="topright" 
      draw={{rectangle:false, circle:false, circlemarker:false, polyline:false, polygon:false}}/>
    </FeatureGroup> 
    <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
   {/* <AddMarkers onOpen = {onOpen} info={info}/>*/}
    </MapContainer>
  );
};

export default Map;