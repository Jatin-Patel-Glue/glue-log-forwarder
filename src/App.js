import React, { useState } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import Header from './components/Header'

function App() {
  const [activeItem, setActiveItem] = useState('Dashboard');
  const [showSubMenu, setShowSubMenu] = useState(false);  

  const handleMenuItemClick = (item) => {
    setActiveItem(item);
    if (item === 'Logs' || item === 'Status') {
      setShowSubMenu(true);   
    } else if (item === 'Applications') {
      setShowSubMenu(false);  
    }
  };

  return (
    <div className="flex flex-col">
        <Header />

      <div className="flex flex-grow overflow-hidden">
        <Sidebar 
          onMenuItemClick={handleMenuItemClick} 
          activeItem={activeItem} 
          showSubMenu={showSubMenu}  
        />
        <div className="ml-5 w-[85vw]">
          <MainContent 
            activeItem={activeItem} 
            onMenuItemClick={handleMenuItemClick} 
          />
        </div>
      </div>
    </div>
  );
}

export default App;
