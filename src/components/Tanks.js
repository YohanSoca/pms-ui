import io from 'socket.io-client';
import React from 'react';
import { useEffect, useState } from 'react';
import styled, { keyframes, css } from "styled-components";
import LiquidFillGauge from 'react-liquid-gauge';
import { color } from 'd3-color';
import { interpolateRgb } from 'd3-interpolate';
import mqtt from 'mqtt';
import { b2d, d2b, flip, query, bit_set, bit_clear, bit_toggle, bit_test } from '../utils';

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

const Tanks = () => {
  const [value, setValue] = useState(50);
  let startColor = '#008b8b'; //'#6495ed'; // cornflowerblue
  let endColor = '#1e90ff';///'#dc143c'; // crimson
  const radius = 150;
  const interpolate = interpolateRgb(startColor, endColor);
  const fillColor = interpolate(value / 100);
  const gradientStops = [
    {
        key: '0%',
        stopColor: color(fillColor).darker(0.5).toString(),
        stopOpacity: 1,
        offset: '0%'
    },
    {
        key: '50%',
        stopColor: fillColor,
        stopOpacity: 0.75,
        offset: '50%'
    },
    {
        key: '100%',
        stopColor: color(fillColor).brighter(0.5).toString(),
        stopOpacity: 0.5,
        offset: '100%'
    }
];

    return (
        <Screen>
        <TankTitle>Waters Tanks</TankTitle>
            <TankWrapperRow>
            <TankWrapper>
            <LiquidFillGauge
                style={{ margin: '0 auto' }}
                width={radius * 2}
                height={radius * 2}
                value={value}
                percent="%"
                textSize={1}
                textOffsetX={0}
                textOffsetY={0}
                textRenderer={(props) => {
                    const value = Math.round(props.value);
                    const radius = Math.min(props.height / 2, props.width / 2);
                    const textPixels = (props.textSize * radius / 2);
                    const valueStyle = {
                        fontSize: textPixels
                    };
                    const percentStyle = {
                        fontSize: textPixels * 0.6
                    };
    
                    return (
                        <tspan>
                            <tspan className="value" style={valueStyle}>{value}</tspan>
                            <tspan style={percentStyle}>{props.percent}</tspan>
                        </tspan>
                    );
                }}
                riseAnimation
                waveAnimation
                waveFrequency={2}
                waveAmplitude={1}
                gradient
                gradientStops={gradientStops}
                circleStyle={{
                    fill: fillColor
                }}
                waveStyle={{
                    fill: fillColor
                }}
                textStyle={{
                    fill: color('#444').toString(),
                    fontFamily: 'Arial'
                }}
                waveTextStyle={{
                    fill: color('#fff').toString(),
                    fontFamily: 'Arial'
                }}
                onClick={() => {
                    
                }}
            />
            <div
                style={{
                    margin: '20px auto',
                    width: 120
                }}
            >
                
            </div>
            <TankName>Fresh Water</TankName>
            </TankWrapper>
            <TankWrapper>
           <LiquidFillGauge
               style={{ margin: '0 auto' }}
               width={radius * 2}
               height={radius * 2}
               value={value}
               percent="%"
               textSize={1}
               textOffsetX={0}
               textOffsetY={0}
               textRenderer={(props) => {
                   const value = Math.round(props.value);
                   const radius = Math.min(props.height / 2, props.width / 2);
                   const textPixels = (props.textSize * radius / 2);
                   const valueStyle = {
                       fontSize: textPixels
                   };
                   const percentStyle = {
                       fontSize: textPixels * 0.6
                   };
    
                   return (
                       <tspan>
                           <tspan className="value" style={valueStyle}>{value}</tspan>
                           <tspan style={percentStyle}>{props.percent}</tspan>
                       </tspan>
                   );
               }}
               riseAnimation
               waveAnimation
               waveFrequency={2}
               waveAmplitude={1}
               gradient
               gradientStops={gradientStops}
               circleStyle={{
                   fill: fillColor
               }}
               waveStyle={{
                   fill: fillColor
               }}
               textStyle={{
                   fill: color('#444').toString(),
                   fontFamily: 'Arial'
               }}
               waveTextStyle={{
                   fill: color('#fff').toString(),
                   fontFamily: 'Arial'
               }}
               onClick={() => {
                   
               }}
           />
           <div
               style={{
                   margin: '20px auto',
                   width: 120
               }}
           >
           </div>
           <TankName>Grey Water</TankName>
            </TankWrapper>
            <TankWrapper>
          <LiquidFillGauge
              style={{ margin: '0 auto' }}
              width={radius * 2}
              height={radius * 2}
              value={value}
              percent="%"
              textSize={1}
              textOffsetX={0}
              textOffsetY={0}
              textRenderer={(props) => {
                  const value = Math.round(props.value);
                  const radius = Math.min(props.height / 2, props.width / 2);
                  const textPixels = (props.textSize * radius / 2);
                  const valueStyle = {
                      fontSize: textPixels
                  };
                  const percentStyle = {
                      fontSize: textPixels * 0.6
                  };
    
                  return (
                      <tspan>
                          <tspan className="value" style={valueStyle}>{value}</tspan>
                          <tspan style={percentStyle}>{props.percent}</tspan>
                      </tspan>
                  );
              }}
              riseAnimation
              waveAnimation
              waveFrequency={2}
              waveAmplitude={1}
              gradient
              gradientStops={gradientStops}
              circleStyle={{
                  fill: fillColor
              }}
              waveStyle={{
                  fill: fillColor
              }}
              textStyle={{
                  fill: color('#444').toString(),
                  fontFamily: 'Arial'
              }}
              waveTextStyle={{
                  fill: color('#fff').toString(),
                  fontFamily: 'Arial'
              }}
              onClick={() => {
                  
              }}
          />
          <div
              style={{
                  margin: '20px auto',
                  width: 120
              }}
          >
          </div>
          <TankName>Seawage</TankName>
            </TankWrapper>
            <TankWrapper>
         <LiquidFillGauge
             style={{ margin: '0 auto' }}
             width={radius * 2}
             height={radius * 2}
             value={value}
             percent="%"
             textSize={1}
             textOffsetX={0}
             textOffsetY={0}
             textRenderer={(props) => {
                 const value = Math.round(props.value);
                 const radius = Math.min(props.height / 2, props.width / 2);
                 const textPixels = (props.textSize * radius / 2);
                 const valueStyle = {
                     fontSize: textPixels
                 };
                 const percentStyle = {
                     fontSize: textPixels * 0.6
                 };
    
                 return (
                     <tspan>
                         <tspan className="value" style={valueStyle}>{value}</tspan>
                         <tspan style={percentStyle}>{props.percent}</tspan>
                     </tspan>
                 );
             }}
             riseAnimation
             waveAnimation
             waveFrequency={2}
             waveAmplitude={1}
             gradient
             gradientStops={gradientStops}
             circleStyle={{
                 fill: fillColor
             }}
             waveStyle={{
                 fill: fillColor
             }}
             textStyle={{
                 fill: color('#444').toString(),
                 fontFamily: 'Arial'
             }}
             waveTextStyle={{
                 fill: color('#fff').toString(),
                 fontFamily: 'Arial'
             }}
             onClick={() => {
                 
             }}
         />
         <div
             style={{
                 margin: '20px auto',
                 width: 120
             }}
         >
         </div>
         <TankName>Bilge Water</TankName>
            </TankWrapper>
            </TankWrapperRow>
            <HLine />
            <TankTitle>Fuel Tanks</TankTitle>    
            <TankWrapperRow>
            <TankWrapper>
            <LiquidFillGauge
                style={{ margin: '0 auto' }}
                width={radius * 2}
                height={radius * 2}
                value={value}
                percent="%"
                textSize={1}
                textOffsetX={0}
                textOffsetY={0}
                textRenderer={(props) => {
                    const value = Math.round(props.value);
                    const radius = Math.min(props.height / 2, props.width / 2);
                    const textPixels = (props.textSize * radius / 2);
                    const valueStyle = {
                        fontSize: textPixels
                    };
                    const percentStyle = {
                        fontSize: textPixels * 0.6
                    };
    
                    return (
                        <tspan>
                            <tspan className="value" style={valueStyle}>{value}</tspan>
                            <tspan style={percentStyle}>{props.percent}</tspan>
                        </tspan>
                    );
                }}
                riseAnimation
                waveAnimation
                waveFrequency={2}
                waveAmplitude={1}
                gradient
                gradientStops={gradientStops}
                circleStyle={{
                    fill: fillColor
                }}
                waveStyle={{
                    fill: fillColor
                }}
                textStyle={{
                    fill: color('#444').toString(),
                    fontFamily: 'Arial'
                }}
                waveTextStyle={{
                    fill: color('#fff').toString(),
                    fontFamily: 'Arial'
                }}
                onClick={() => {
                    
                }}
            />
            <div
                style={{
                    margin: '20px auto',
                    width: 120
                }}
            >
                
            </div>
            <TankName>Main Fuel 1</TankName> 
           </TankWrapper>
           <TankWrapper>
           <LiquidFillGauge
               style={{ margin: '0 auto' }}
               width={radius * 2}
               height={radius * 2}
               value={value}
               percent="%"
               textSize={1}
               textOffsetX={0}
               textOffsetY={0}
               textRenderer={(props) => {
                   const value = Math.round(props.value);
                   const radius = Math.min(props.height / 2, props.width / 2);
                   const textPixels = (props.textSize * radius / 2);
                   const valueStyle = {
                       fontSize: textPixels
                   };
                   const percentStyle = {
                       fontSize: textPixels * 0.6
                   };
    
                   return (
                       <tspan>
                           <tspan className="value" style={valueStyle}>{value}</tspan>
                           <tspan style={percentStyle}>{props.percent}</tspan>
                       </tspan>
                   );
               }}
               riseAnimation
               waveAnimation
               waveFrequency={2}
               waveAmplitude={1}
               gradient
               gradientStops={gradientStops}
               circleStyle={{
                   fill: fillColor
               }}
               waveStyle={{
                   fill: fillColor
               }}
               textStyle={{
                   fill: color('#444').toString(),
                   fontFamily: 'Arial'
               }}
               waveTextStyle={{
                   fill: color('#fff').toString(),
                   fontFamily: 'Arial'
               }}
               onClick={() => {
                   
               }}
           />
           <div
               style={{
                   margin: '20px auto',
                   width: 120
               }}
           >
           </div>
           <TankName>Main Fuel 2</TankName>
          </TankWrapper>
          <TankWrapper>
          <LiquidFillGauge
              style={{ margin: '0 auto' }}
              width={radius * 2}
              height={radius * 2}
              value={value}
              percent="%"
              textSize={1}
              textOffsetX={0}
              textOffsetY={0}
              textRenderer={(props) => {
                  const value = Math.round(props.value);
                  const radius = Math.min(props.height / 2, props.width / 2);
                  const textPixels = (props.textSize * radius / 2);
                  const valueStyle = {
                      fontSize: textPixels
                  };
                  const percentStyle = {
                      fontSize: textPixels * 0.6
                  };
    
                  return (
                      <tspan>
                          <tspan className="value" style={valueStyle}>{value}</tspan>
                          <tspan style={percentStyle}>{props.percent}</tspan>
                      </tspan>
                  );
              }}
              riseAnimation
              waveAnimation
              waveFrequency={2}
              waveAmplitude={1}
              gradient
              gradientStops={gradientStops}
              circleStyle={{
                  fill: fillColor
              }}
              waveStyle={{
                  fill: fillColor
              }}
              textStyle={{
                  fill: color('#444').toString(),
                  fontFamily: 'Arial'
              }}
              waveTextStyle={{
                  fill: color('#fff').toString(),
                  fontFamily: 'Arial'
              }}
              onClick={() => {
                  
              }}
          />
          <div
              style={{
                  margin: '20px auto',
                  width: 120
              }}
          >
              
          </div>
          <TankName>Daily Fuel</TankName>
         </TankWrapper>
         <TankWrapper>
         <LiquidFillGauge
             style={{ margin: '0 auto' }}
             width={radius * 2}
             height={radius * 2}
             value={value}
             percent="%"
             textSize={1}
             textOffsetX={0}
             textOffsetY={0}
             textRenderer={(props) => {
                 const value = Math.round(props.value);
                 const radius = Math.min(props.height / 2, props.width / 2);
                 const textPixels = (props.textSize * radius / 2);
                 const valueStyle = {
                     fontSize: textPixels
                 };
                 const percentStyle = {
                     fontSize: textPixels * 0.6
                 };
    
                 return (
                     <tspan>
                         <tspan className="value" style={valueStyle}>{value}</tspan>
                         <tspan style={percentStyle}>{props.percent}</tspan>
                     </tspan>
                 );
             }}
             riseAnimation
             waveAnimation
             waveFrequency={2}
             waveAmplitude={1}
             gradient
             gradientStops={gradientStops}
             circleStyle={{
                 fill: fillColor
             }}
             waveStyle={{
                 fill: fillColor
             }}
             textStyle={{
                 fill: color('#444').toString(),
                 fontFamily: 'Arial'
             }}
             waveTextStyle={{
                 fill: color('#fff').toString(),
                 fontFamily: 'Arial'
             }}
             onClick={() => {
                 
             }}
         />
         <div
             style={{
                 margin: '20px auto',
                 width: 120
             }}
         >
         </div>
         <TankName>Reserve Fuel</TankName>
        </TankWrapper>
            </TankWrapperRow>
        </Screen>
      );
  
}

    const bladeSpin = keyframes`
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    `;

    const Screen = styled.div`
      height: calc(100vh / 1.003);
      border: 1px solid red;
      display: flex;
      flex-direction: column;
    `;

    const TankTitle = styled.h2`
       margin-left: 30px;
    `;

    const TankName = styled.h3`
      text-align: center;
    `;

    const HLine = styled.div`
      background-color: black;
      height: 3px;
      width: calc(100vw / 1.1);
    `;
    
    const TankWrapper = styled.div`
      margin: 20px;
      background-color: ;
    `;

    const TankWrapperRow = styled.div`
      display: flex;
    `;

export default Tanks;
