import React from 'react';
import './header.css'
import GlueLogo from '../assets/GlueLogo.png'
import RefreshIcon from '../assets/refresh_icon.png'

const Header = () => {
    const handleHomeClick = () => {
        console.log("E")
    }
    return (
        <div class="header shadow-lg">
            <button class='glue-logo' onClick={handleHomeClick}>
                <img src={GlueLogo} />
            </button>
            <button onClick={handleHomeClick}><h1 class = "home-button">Glue Log Forwarder</h1></button>
            <button class="w-10 h-10 bg-white"><img src = {RefreshIcon} /></button>
        </div>
    )
};

export default Header;