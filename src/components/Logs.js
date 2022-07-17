import io from 'socket.io-client';
import React from 'react';
import ReactDOM from 'react-dom';
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import { styled } from '@mui/material/styles';
import Alert from '@mui/material/Alert';

import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

import './ventilation.css';
import mqtt from 'mqtt';
import { b2d, d2b, flip, query, bit_set, bit_clear, bit_toggle, bit_test } from '../utils';
import { Screen } from './Screen';

var options = {
	protocol: 'ws',
	//clientId: 'b0908853' 	
};
var client  = mqtt.connect('mqtt://134.122.115.93:9001', options);

// preciouschicken.com is the MQTT topic
client.subscribe('portaftfan');
client.subscribe('portfwrfan');
client.subscribe('stbdaftfan');
client.subscribe('stbdfwrfan');

const actions = [
    { icon: <FileCopyIcon />, name: 'Copy' },
    { icon: <SaveIcon />, name: 'Save' },
    { icon: <PrintIcon />, name: 'Print' },
    { icon: <ShareIcon />, name: 'Share' },
  ];

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

function Logs() {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = (name) => {
        setOpen(false);
    };

  useEffect(() => {
    client.on('message', function (topic, message) {
      
      });
  }, []);
  

      return ( 
        <Screen>
        <h1>Logs HISTORY</h1>
          {
            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(val => (
                <div style={{width: '1000px', margin: 'autoq'}}>
                <Alert severity='warning' onClose={() => {}}>shore: 400, 400, 399, 22, 33, 23, 60; gen 1: 0, 0, 0, 0, 0, 0, 0 : {new Date().toISOString()}</Alert>
                <hr />
                </div>
            ))
          }
          <SpeedDial
          ariaLabel="SpeedDial controlled open example"
          sx={{ position: 'absolute', bottom: 26, right: 26 }}
          icon={<SpeedDialIcon />}
          onClose={handleClose}
          onOpen={handleOpen}
          open={open}
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={() => handleClose(action.name)}
            />
          ))}
        </SpeedDial>
       </Screen>
      );
    };

export default Logs;
