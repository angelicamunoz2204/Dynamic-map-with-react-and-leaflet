import React from "react";
import Modal from "react-modal";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import './App.css';


export default function CustomModal({ show, onClose, setInfo}) {
  const [tipoPozo, setTipoPozo] = React.useState('');
  const [id, setId] = React.useState('');

  const handleChange = (event) => {
    setTipoPozo(event.target.value);
  };

  const handleTFChange = (event) =>{
    setId(event.target.value);
  }

  const onClick = () =>{
    onClose();
    setInfo(id,tipoPozo)
    setTipoPozo("")
  }
  return (
    <div>
      <Modal isOpen={show} toggle={onClose} className='Modal' overlayClassName='Overlay' onRequestClose={onClose}>
        <h1>
          Información del pozo
        </h1>
        <div>
          <TextField id="standard-basic" label="Código" onChange={handleTFChange}/>  
        </div>
        <div style={{marginTop:40}}>
          <FormControl style={{justifyContent:"left"}}>
          <InputLabel shrink id="tiPozo">
            Tipo
          </InputLabel>
          <Select 
            labelId="tiPozo"
            id="tiPozo"
            value={tipoPozo}
            onChange={handleChange}
          >
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
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