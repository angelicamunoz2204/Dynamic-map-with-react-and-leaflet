import React from "react";
import { useEffect } from "react";
import Modal from "react-modal";
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import './App.css';


export default function ModalLine({show, onClose, objects, info, createLine, lines}) {
  const [object1, setObject1] = React.useState('');
  const [object2, setObject2] = React.useState('');

  const handleChangeO1 = (event) => {
    setObject1(event.target.value);
  };

  const handleChangeO2 = (event) => {
    setObject2(event.target.value);
  };

  const onClick = () =>{
    //console.log(object1,object2);
    lines.push([[object1.lat,object1.lng], [object2.lat,object2.lng]]);
    createLine(lines);
    onClose();
    setObject1("");
    setObject2("");
  }
  return (
    <div>
      <Modal isOpen={show} toggle={onClose} className='Modal' overlayClassName='Overlay' onRequestClose={onClose} ariaHideApp={false}>
        <h1>
          Crear tuberia 
        </h1>
        <div style={{marginTop:40}}>
          <FormControl style={{justifyContent:"left"}}>
          <InputLabel shrink id="tiPozo">
            Objeto inicial
          </InputLabel>
          <Select 
            labelId="tiPozo"
            id="tiPozo"
            value={object1}
            onChange={handleChangeO1}
          >
            {info.map((marker,i) => (
            <MenuItem key={marker.id} value={objects[i]}>
              {marker.id}
            </MenuItem>
            ))}           
          </Select>
          </FormControl>
        </div>
        <div style={{marginTop:40}}>
          <FormControl style={{justifyContent:"left"}}>
          <InputLabel shrink id="tiPozo">
            Objeto final
          </InputLabel>
          <Select 
            labelId="tiPozo"
            id="tiPozo"
            value={object2}
            onChange={handleChangeO2}
          >
            {info.map((marker,i) => (
            <MenuItem key={marker.id} value={objects[i]}>
              {marker.id}
            </MenuItem>
            ))}    
          </Select>
          </FormControl>
        </div>
        <div style={{marginTop:100}}>
          <Button variant="contained" color="primary" onClick={onClick}>
              Aceptar
          </Button>
        </div>
      </Modal>
    </div>
  );
}