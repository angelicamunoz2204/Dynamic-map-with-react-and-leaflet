import React from "react";
import { useState, useEffect, useContext} from "react";
import { MapContainer, TileLayer,FeatureGroup, Polyline, Marker} from "react-leaflet";
import AddMarkers from "./AddMarkers";
import { EditControl} from "react-leaflet-draw";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import L from "leaflet";
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Well from './images/pozo.png';
import Sewer from './images/sumidero.png';
import Line from './images/tramo.png';
import "./App.css";
import { Popup } from "react-leaflet";
import { act } from "@testing-library/react";
import ModalLine from "./ModalLine";
import MapContext from "./context/map/MapContext";

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

function Map ({onOpen,info}){

  const [markerrs, setMarkers] = useState([]);
  const [actualObject, setActualObject] = useState({lat:null,lng:null});
  const [line, setLine] = useState([]);
  const [showML, setShowML] = useState(false);
  const handleClose = () => setShowML(false);
  const [validation, setValidation] = useState([]);
  
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

  const onLineClick = (e) =>{
    setShowML(true);
  }

  const onCreatedObject = (e) => {
    const h = [markerrs.push(e.layer._latlng)]
    setMarkers(markerrs);
    setActualObject(e.layer._latlng)
    onOpen();   
    //console.log("h",markerrs);
    if(markerrs.length> 0)
    {
      const v = [validation.push([markerrs[markerrs.length-1].lat,markerrs[markerrs.length-1].lng])]
      setValidation(validation)
    }
    console.log("v inicial", validation);
  }

  const onValidateClick = () =>{
    const _validation = [...validation];

    for (var i=0; i<_validation.length; i++)
    {
      for (var j=0; j<line.length; j++)
      {
        if(line[j][0].toString() === _validation[i].toString() || line[j][1].toString() === _validation[i].toString())
        {
          console.log("same",_validation[i]);
          _validation.splice(i, 1);   
        }
      }
    }

    if(_validation.length != 0)
    {
      alert("No es válido, los objetos con coordenadas "+ _validation + " están sueltos");
    }
    else
    {
      alert("Topología correcta")
    }
    //console.log("v",validation);
    console.log("_v final", _validation)
    //console.log("l",line);
  }
  
  return (
    <MapContainer
      doubleClickZoom={false}
      id="mapId"
      zoom={16}
      center={{
        lat: 7.11392,
        lng: -73.1198
      }}
    >
    {line.map((lin,i) => (
      <Polyline key={i} positions={lin}/>
    ))} 
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
        <img src={Line} className='Icon' onClick={(e)=> {onLineClick(e)}}/>
      </IconButton>
      <ModalLine show = {showML} onClose={handleClose} objects={markerrs} info={info} createLine={setLine} lines={line}/>
      </div>
    </div>
   <FeatureGroup>  
      <div className={POSITION_CLASSES.bottomright}>
        <div className='leaflet-control leaflet-bar ButtonValidate'> 
          <Button onClick={onValidateClick}>
              Validar topología
          </Button>
        </div>
      </div>
      <EditControl 
      position="topright" 
      onCreated={(e)=>{onCreatedObject(e)
      }}
      draw={{rectangle:false, circle:false, circlemarker:false, polyline:false, polygon:false}}/>
    {markerrs.map((marker, i) => (
        <Marker key={`marker-${i}`} position={marker}>
            <Popup>
               Información del objeto<br/> 
               Latitud: {marker.lat}<br/> 
               Longitud:{marker.lng}<br/> 
               Código: {info[i].id}<br/> 
               Tipo:{info[i].tipo} 
            </Popup>
        </Marker>
    ))} 
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