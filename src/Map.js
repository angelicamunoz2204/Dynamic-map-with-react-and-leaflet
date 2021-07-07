import React from "react";
import { MapContainer, TileLayer,FeatureGroup } from "react-leaflet";
import AddMarkers from "./AddMarkers";
import { EditControl, } from "react-leaflet-draw";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import L from "leaflet";
import Button from '@material-ui/core/Button';
import "./App.css";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png",
});

const Map = ({onOpen, info}) => {
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
    <FeatureGroup>
      <EditControl 
      position="topright" 
      draw={{rectangle:false, circle:false, circlemarker:false, polygon: false, polyline:false, marker:false}}/>
      <Button className="Buttom" variant="contained" color="primary">
        Holi
      </Button>
    </FeatureGroup>
    <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <AddMarkers onOpen = {onOpen} info={info}/>
    </MapContainer>
  );
};

export default Map;