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
      {/* <div className="h-16 bg-blue-500 text-white flex items-center justify-center">
        <h1 className="text-2xl font-bold">Header Banner</h1>
      </div> */}

      <div className="flex">
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
