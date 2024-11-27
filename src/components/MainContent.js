// src/components/MainContent.js
import React, { useState } from "react";
import Card from "./Sections";

const MainContent = ({ activeItem }) => {

const [showExtraCard, setShowExtraCard] = useState(false);
const handleButtonClick = () => {
    setShowExtraCard(true); // Show the extra card when the button is clicked
  };

  return (
    <div className="p-4">
      {/* Conditional Rendering based on active item */}
      {activeItem === "Dashboard" && (
          <>
          {/* First Row */}
          <div className="flex flex-row space-x-4 mb-4">
            <Card height="h-[220px]" width="w-[377px]" />
            <Card height="h-[220px]" width="w-[450px]" />
          </div>
      
          {/* Second Row */}
          <div className="flex flex-row space-x-4">
            {/* First Card in Row */}
            <Card height="h-[370px]" width="w-[470px]" />
      
            {/* Column with two cards */}
            <div className="flex flex-col "> {/* Column container */}
              <Card height="h-[175px]" width="w-[357px]" />
              <Card height="h-[175px]" width="w-[357px]" /> {/* Card underneath */}
            </div>
          </div>
        </>
      
      )}




    {activeItem === "Applications" && (
        <div className="flex flex-row space-x-4">
          {/* Main Card with Button */}
          <Card height="h-[calc(100vh-99px)]" width="w-[510px]">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={handleButtonClick}
            >
              APPLICATION PRESS CHECK
            </button>
          </Card>

          {/* Conditionally Rendered Extra Card */}
          {showExtraCard && (
            <Card
            width="w-[500px]">
              <p>New Card Content!</p>
            </Card>
          )}
        </div>
      )}
      
      {activeItem === "Logs" && (
        <>
            < Card height="h-[calc(100vh-99px)]" width="w-[1000px]"/>
            
        </>
        )}
      {activeItem === "Status" && (
        <>
            < Card />
            < Card />
        </>
        )}

      {/* Default message if no item is selected */}
      {activeItem === "" && <h1>Please select a menu item</h1>}
    </div>
  );
};

export default MainContent;
