import React, { useState } from "react";
import {Marker, Popup, useMapEvents } from "react-leaflet";


const AddMarkers = ({onOpen, info}) => {
  const [markers, setMarkers] = useState([]);

  const map = useMapEvents({
    click: (e) => {
      setMarkers([...markers, e.latlng]);
      console.log(e.latlng);
      onOpen();
    }
  });
  
  return (
    <div>
      {markers.map((marker, i) => (
        <Marker key={`marker-${i}`} position={marker}>
            <Popup>
               Información del Pozo<br/> 
               Latitud: {marker.lat}<br/> 
               Longitud:{marker.lng}<br/> 
               Código: {info[i].id}<br/> 
               Tipo:{info[i].tipo} 
            </Popup>
        </Marker>
      ))} 
    </div>
  );
};

export default AddMarkers;