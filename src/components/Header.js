import React from 'react';
import './header.css'
import GlueLogo from '../assets/GlueLogo.png'
import RefreshIcon from '../assets/refresh_icon.png'

const Header = () => {
    const handleHomeClick = () => {
        console.log("E")

    }
    return (
        <div className='header'>
            <button className='glue-logo' onClick={handleHomeClick}>
                <img src={GlueLogo} />
            </button>
            <button onClick={handleHomeClick}><h1 className = 'home'>Glue Log Forwarder</h1></button>
            <button className='refresh'>
                <img src = {RefreshIcon} />
            </button>
        </div>
    )
};

export default Header;