import io from 'socket.io-client';
import React from 'react';
import ReactDOM from 'react-dom';
import { useEffect, useState } from 'react';
import styled from "styled-components";
import GaugeChart from 'react-gauge-chart';
import mqtt from 'mqtt';
import { b2d, d2b, flip, query, bit_set, bit_clear, bit_toggle, bit_test } from '../utils';

var options = {
	protocol: 'ws',
	//clientId: 'b0908853' 	
};
var client  = mqtt.connect('mqtt://134.122.115.93:9001', options);

// preciouschicken.com is the MQTT topic
client.subscribe('MEASURE:SP1:ALL');
client.subscribe('MEASURE:CONVERTER:ALL');
client.subscribe('MEASURE:GEN:ALL');
client.subscribe('CONFIGURATION:ALL');

function Asea() {
  const [shore, setShore] = useState([]);
  const [converter, setConverter] = useState([]);
  const [gens, setGens] = useState([]);
  const [pms, setPMS] = useState(0);
  const [conf, setConf] = useState();

  useEffect(() => {
    client.on('message', function (topic, message) {
      if(topic === 'MEASURE:SP1:ALL') {
        let shore = message.toString();
        shore  = shore.split(' ');
        setShore(current => shore)
      }
      if(topic === 'MEASURE:CONVERTER:ALL') {
        let converter = message.toString();
        converter  = converter.split(' ');
        setShore(current => shore)
      }
      if(topic === 'MEASURE:GEN:ALL') {
        let gens = message.toString();
        gens  = gens.split(' ');
        setGens(current => gens)
      }
      if(topic === 'CONFIGURATION:ALL') {
        let conf = message.toString();
        conf  = conf.split(' ');
        setConf(current => conf);
        console.log(conf)
      }
    });

    }, []);
  

      return ( 
          <Screen>
            {}
            <Meters>
            <GaugesRowWrapper>
              <GaugesRow>
                <GaugeChart 
                  padding='20px'
                  id="l1"
                  arcsLength={[0.9, 0.2, 0.1]} 
                  animate={false} 
                  percent={parseInt(shore[0]) / 600} 
                  formatTextValue={value => (shore[0] ? Math.round(shore[0]) : 0) + `V`}
                />
             </GaugesRow>
             <GaugesRow>
		          <GaugeChart 
                padding='20px' 
                id="l2" 
                arcsLength={[0.9, 0.2, 0.1]}
                animate={false} 
                percent={parseInt(shore[1]) / 600} 
                formatTextValue={value => (shore[1] ? Math.round(shore[1]) : 0) + `V`}
              />             
            </GaugesRow>
            <GaugesRow>
              <GaugeChart 
                padding='20px' 
                id="l3" 
                arcsLength={[0.9, 0.2, 0.1]}
                animate={false} 
                percent={parseInt(shore[2]) / 600} 
                formatTextValue={value => (shore[2] ? Math.round(shore[2]) : 0) + `V`}
              />
             
	          </GaugesRow>
          </GaugesRowWrapper>
          <GaugesRowWrapper>
            <GaugesRow>
              <GaugeChart 
                id="a1" 
                arcsLength={[0.8, 0.3, 0.2]}
                animate={false} 
                percent={parseInt(shore[3]) / 200} 
                formatTextValue={value => (shore[3] ? Math.round(shore[3]) : 0) + `A`}
              />             
             </GaugesRow>
            <GaugesRow>
              <GaugeChart 
                id="a2" 
                arcsLength={[0.8, 0.3, 0.2]}
                animate={false} 
                percent={parseInt(shore[4]) / 200} 
                formatTextValue={value => (shore[4] ? Math.round(shore[4]) : 0) + `A`}
              />
             
            </GaugesRow>
            <GaugesRow>
              <GaugeChart 
                id="a3" 
                arcsLength={[0.8, 0.3, 0.2]}
                animate={false} 
                percent={parseInt(shore[5]) / 200} 
                formatTextValue={value => (shore[5] ? Math.round(shore[5]) : 0) + `A`}
              />             
             </GaugesRow>
          </GaugesRowWrapper>
          <GaugesRowWrapper>
          <GaugesRow>
            <GaugeChart 
              id="a1" 
              arcsLength={[0.8, 0.3, 0.2]}
              animate={false} 
              percent={parseInt(shore[6]) / 50} 
              formatTextValue={value => (shore[6] ? Math.round(shore[6]) : 0) + `Kw`}
            />             
           </GaugesRow>
          <GaugesRow>
            <GaugeChart 
              id="a2" 
              arcsLength={[0.8, 0.3, 0.2]}
              animate={false} 
              percent={parseInt(shore[7]) / 50} 
              formatTextValue={value => (shore[7] ? Math.round(shore[7]) : 0) + `Kw`}
            />
           
          </GaugesRow>
          <GaugesRow>
            <GaugeChart 
              id="a3" 
              arcsLength={[0.8, 0.3, 0.2]}
              animate={false} 
              percent={parseInt(shore[8]) / 50} 
              formatTextValue={value => (shore[8] ? Math.round(shore[8]) : 0) + `Kw`}
            />             
           </GaugesRow>
        </GaugesRowWrapper>
            </Meters>
          <Controller>
              {!query(conf, 1) ? <BTN onClick={() => client.publish('SHORE:ON')}>ON</BTN> : null}
              {query(conf, 1) ? <BTN onClick={() => client.publish('SHORE:OFF')}>OFF</BTN> : null}
              {!query(conf, 2) ? <BTN onClick={() => client.publish('TRANSFER:CONV')}>TO SHORE</BTN> : null}
              {query(conf, 2) ? <BTN onClick={() => client.publish('TRANSFER:GEN')}>TO GEN</BTN> : null}
          </Controller>
         </Screen>
      );
    };

    const Screen = styled.div`
      display: flex;
      flex-direction: column;
      height: 100vh;

    `;

    const Meters = styled.div`
      flex: 1;
    `;

    const Controller = styled.div`
       background-color: black;
       height: calc(100vh / 6.1);
       margin-bottom: 0;

       display: flex;
       justify-content: flex-end;
       items-align: center;
    `;

    const BTN = styled.button`
      border-radius: 20px;
      color: wheat;
      background-color: green;
      width: calc(100vw / 6);
      height: 80px;
      font-size: 2.2rem;
      font-weight: bold;
      margin: 20px 10px 010px 10px;
    `;

    const GaugesRowWrapper = styled.div`
      display: flex;
      flex-direction: row;
      align-items: center;
    `;

    const GaugesRow = styled.div`
      display: flex;
      justify-content: center;

      background-color: rgba(0, 0, 0, 1);
      color: green;
      width: calc(100vw / 3.9);
      margin: 20px;
      padding-top: 16px;
      border-radius: 20px;
      height: calc(100vh / 4.6);
    `;

    const GaugeWrapper = styled.h1`
      font-size: 5rem;
      text-shadow: 1px 1px 1px white;
    `

export default Asea;
