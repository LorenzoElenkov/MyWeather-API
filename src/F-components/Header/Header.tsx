import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';

import styled, { keyframes } from 'styled-components';

interface IMenuClicked {
    menuClicked: boolean;
};



const Header = () => {

    const [menuClicked, setMenuClicked] = useState(false);

  return (
    <StyledHeader>
        <StyledLogo>
            <Link to='/'>MyWeather</Link>
        </StyledLogo>
        <StyledHamburger onClick={() => setMenuClicked(!menuClicked)} menuClicked={menuClicked}>
            <div className='topLine' />
            <div className='leftTiltedLine' />
            <div className='midLine'/>
            <div className='rightTiltedLine'/>
            <div className='botLine'/>
        </StyledHamburger>
        <StyledMobileMenu menuClicked={menuClicked}>
            <Link to='/' onClick={() => setMenuClicked(false)}>Home</Link>
            <Link to='/about' onClick={() => setMenuClicked(false)}>About</Link>
            <Link to='/faq' onClick={() => setMenuClicked(false)}>FAQ</Link>
        </StyledMobileMenu>
    </StyledHeader>
  )
}

export default Header;

const StyledHeader = styled.header`
    position: relative;
    grid-column: 1/4;
    grid-row: 1/1;
    background: white;
    box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.5);
    height: 7.5vh;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 15px 0 25px;
    z-index: 9999;
    backdrop-filter: blur(2px);
`;

const StyledLogo = styled.button`
    cursor: pointer;
    border: none;
    background: none;
    
    a {
        text-decoration: none;
        font-size: 1.25rem;
        color: black;
        font-family: 'Main';
    }
`;

const StyledHamburger = styled.button<IMenuClicked>`
    width: 50px;
    height: 100%;
    background: none;
    border: none;
    cursor: pointer;

    div {
        width: 80%;
        height: 3px;
        background: black;
        transform: translateX(4px) translateY(0px);
    }

    .topLine {
        transform: ${props => props.menuClicked ? 'translateX(4px) translateY(5px)' : 'translateX(4px) translateY(-2px)'};
        opacity: ${props => props.menuClicked ? '0' : '1'};
        transition: transform 0.1s linear, opacity 0.1s ease-in-out;
    }

    .midLine {
        width: 80%;
        opacity: ${props => props.menuClicked ? '0' : '1'};
        transition: opacity 0.01s ease-in-out 0.25s;
    }

    .botLine {
        transform: ${props => props.menuClicked ? 'translateX(4px) translateY(-5px)' : 'translateX(4px) translateY(2px)'};
        opacity: ${props => props.menuClicked ? '0' : '1'};
        transition: transform 0.1s linear, opacity 0.1s ease-in-out;
    }

    .leftTiltedLine, .rightTiltedLine {
        opacity: ${props => props.menuClicked ? '1' : '0'};
        transition: transform 0.5s ease-in-out 0.25s;
    }

    .leftTiltedLine {
        transform: ${props => props.menuClicked ? 'rotate(45deg) translateX(5px) translateY(0px)' : 'translateX(4px) translateY(2px)'};
    }
    .rightTiltedLine {
        transform: ${props => props.menuClicked ? 'rotate(-45deg) translateX(5px) translateY(0px)' : 'translateX(4px) translateY(-2px)'};
    }
    
`;

const StyledMobileMenu = styled.nav<IMenuClicked>`
    position: absolute;
    top: 7.6vh;
    left: ${props => props.menuClicked ? '0' : '-110vw'};
    width: calc(100% - 2px);
    height: 40vh;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    border: 1px solid black;
    transition: left 0.5s ease-in-out;
    background: white;

    a {
        text-decoration: none;
        color: black;
        font-size: 1.2rem;
        font-family: 'Secondary';
    }
`;
