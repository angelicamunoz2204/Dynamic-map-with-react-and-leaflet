import React from "react";
import Map from './Map';
import './App.css';
import ModalF from './ModalForm';
import { useState } from "react";

export default function App() {
  const [show, setShow] = useState(false);
  const [info, setInfo] = useState([{id:'',tipo:0}]);

  const handleClose = () => setShow(false);
  const handleOpen = () => setShow(true);
  const setInformation = (id,tipo) => 
  {
    info.pop();
    setInfo([...info, {id:id,tipo:tipo}, {id:'',tipo:0}]);
  
  }

  return (
    <div className="App" >
      <Map onOpen = {handleOpen} info={info}/>  
      <ModalF show = {show} onClose = {handleClose} setInfo={setInformation}/>
    </div> 
  );
}