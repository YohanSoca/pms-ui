import React from 'react';
import { Link } from "react-router-dom";
import styled from "styled-components";

import Clock from './Clock';

const Header = () => {

  return (
   <SideBar>
     <Logo src='https://nauti-tech.com/sites/default/files/inline-images/logo-dark.png'/>
       <Nav>
            <StyleLink to="/asea">SHORE POWER</StyleLink>
            <StyleLink to="/port">PORT GEN</StyleLink>
            <StyleLink to="/stbd">STBD GEN</StyleLink>
            <StyleLink to="/alarms">ALARMS</StyleLink>
            <StyleLink to="/seamless">TRANSFER</StyleLink>
            <StyleLink to="/ventilation">FANS BLOWERS</StyleLink>
            <StyleLink to="/tanks">TANK LEVELS</StyleLink>
            <StyleLink to="/thruster">THRUSTER</StyleLink>
            <StyleLink to="/logs">LOGS HISTORY</StyleLink>
       </Nav>
       <Clock />
   </SideBar>
  )
}

const SideBar = styled.div`
    background-color: black;
    width: calc(100vw / 7);

    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const StyleLink = styled(Link)`
    color: wheat,
    fontSize: 150%;
    padding: 20px;
    marginLeft: 40px;
    text-align: center;

    &:hover, &:visited, &:link {
        text-decoration: none;
        color: wheat;
    }
    &:active, &:focus {
        text-decoration: underline;
        text-underline-offset: 5px;
        font-size: 180%;
        color: white;
    }
`;

const Nav = styled.nav`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const Logo = styled.img`
    margin: 20px;
`;



export default Header;
