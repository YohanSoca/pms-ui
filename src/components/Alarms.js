import io from 'socket.io-client';
import React from 'react';
import ReactDOM from 'react-dom';
import { useEffect, useState } from 'react';
import styled from "styled-components";
import GaugeChart from 'react-gauge-chart';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

const socket = io('http://localhost:4000', {
  transports: ['websocket', 'polling']
});

function Alarms() {

  const [shore, setShore] = useState([]);
  const [converter, setConverter] = useState([]);
  const [gens, setGens] = useState([]);
  const [pms, setPMS] = useState(0);

  useEffect(() => {
    socket.on('asea', asea => {
      console.log(asea)
      if(asea[`MEASURE:SP1:ALL`].length > 0) {
        setShore(current => asea[`MEASURE:SP1:ALL`].slice(0, 9));
      }
      if(asea[`MEASURE:CONVERTER:ALL`].length > 0) {
        setConverter(current => asea[`MEASURE:CONVERTER:ALL`].slice(0, 9));
      }
      if(asea[`MEASURE:GEN:ALL`].length > 0) {
        if(asea[`MEASURE:GEN:ALL`].length > 12) {
          setGens(current => asea[`MEASURE:GEN:ALL`].slice(0, 18));
        } else {
          setGens(current => asea[`MEASURE:GEN:ALL`].slice(0, 9));
        }
      }
      
    });
  }, []);
  

      return ( 
          <Screen>
            <AlarmsWrapper>
              <Stack sx={{ width: '80%' }} spacing={2}>
                <Alert severity='warning' onClose={() => {}}>Shore MCB tripped : {new Date().toISOString()}</Alert>
                <Alert severity='warning' onClose={() => {}}>Blackout : {new Date().toISOString()}</Alert>
                <Alert severity='warning' onClose={() => {}}>Reverse power : {new Date().toISOString()}</Alert>
                <Alert severity='warning' onClose={() => {}}>Not allowed : {new Date().toISOString()}</Alert>
                <Alert action={<Button color="inherit" size="small">ACK</Button>}>
                  Transfer succesfull : {new Date().toISOString()}
                </Alert>
                <Alert action={<Button color="inherit" size="small">ACK</Button>}>
                  Thruster is on : {new Date().toISOString()}
                </Alert>
                <Alert action={<Button color="inherit" size="small">ACK</Button>}>
                  Generators in parallel : {new Date().toISOString()}
                </Alert>
              </Stack>
            </AlarmsWrapper>
         </Screen>
      );
    };

    const Screen = styled.div`
      display: flex;
      flex-direction: column;
      height: 100vh;
      justify-content: flex-start;
      align-items: center;
    `;

    const AlarmsWrapper = styled.div`
      width: 90%;
      margin-top: 10%;
    `;


export default Alarms;
