import React, { useState } from 'react';
import './index.css';
import './App.css';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent'; // Import MainContent

function App() {
  const [activeItem, setActiveItem] = useState('Dashboard'); // Default to Dashboard

  // Handle the click on sidebar item to change content
  const handleMenuItemClick = (item) => {
    setActiveItem(item);
  };

  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="h-16 bg-blue-500 text-white flex items-center justify-center">
        <h1 className="text-2xl font-bold">Header Banner</h1>
      </div>
    
      {/* Main Content and Sidebar */}
      <div className="flex">
        {/* Sidebar */}
        <Sidebar onMenuItemClick={handleMenuItemClick} activeItem={activeItem} />

        {/* Main Content Area */}
        <div className="ml-40 w-full">
          {/* Render MainContent based on the activeItem */}
          <MainContent activeItem={activeItem} />
        </div>
      </div>
    </div>
  );
}

export default App;
