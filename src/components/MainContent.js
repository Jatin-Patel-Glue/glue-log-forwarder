import React, { useState } from "react";
import Card from "./Sections"; 
import SearchBar from "./SearchBar";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const MainContent = ({ activeItem, toggleLogs, onMenuItemClick }) => {
  const [showExtraCard, setShowExtraCard] = useState(false);
  const [activeLog, setActiveLog] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedOption, setSelectedOption] = useState("");
  
  
  const [isDateTimeVisible, setIsDateTimeVisible] = useState(false);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
  };

  
  const toggleDateTimeVisibility = () => {
    setIsDateTimeVisible((prevState) => !prevState);
  };

  return (
    <div className="p-4" >
      
      {activeItem === "Dashboard" && (
        <>
          
          <div className="flex flex-row space-x-4 mb-4 h-[40vh]">
            <Card height= "h-full" width="w-full" />
            <Card height="h-full" width="w-full" />
          </div>
      
          
          <div className="flex flex-row space-x-4 h-[40vh]">
            
            <Card height="h-full" width="w-2/3 " />
      
            
            <div className="flex flex-col w-1/3 ">
              <Card height="h-full" width="w-full" />
              <Card height="h-full" width="w-full" /> 
            </div>
          </div>
        </>
      )}

      {activeItem === "Applications" && (
        <div className="flex flex-row space-x-4">
         
          <Card height="h-[calc(100vh-99px)]" width="w-[600px]">
            <div className="flex flex-row space-x-24">
                <h1>Application Name</h1>
                <h1>Status</h1>
                <h1>Last Modified On</h1>
            </div>

            <br></br>

            <div className="flex flex-col space-y-4">
            <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full text-left"
                onClick={() => setShowExtraCard(true)}
            >
                APPLICATION PRESS CHECK
            </button>

            <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full text-left"
                onClick={() => setShowExtraCard(true)} 
            >
                APPLICATION 2 PRESS CHECK
            </button>
            </div>
          </Card>

          {showExtraCard && (
            <Card width="w-[500px]">
              <div className="flex flex-row space-x-24">
                <h1>Logs</h1>
                <h1>Size</h1>
                <h1>Last Modified On</h1>
              </div>
              <br></br>

              <div className="flex flex-col space-y-4">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full text-left"
                  onClick={() => {
                                 
                    onMenuItemClick("Logs");  
                  }}
                >
                  LOG ENTRY 1
                </button>

                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full text-left"
                  onClick={() => {
                               
                    onMenuItemClick("Logs");  
                  }}
                >
                  LOG ENTRY 2
                </button>
              </div>
            </Card>
          )}
        </div>
      )}

      {activeItem === "Logs" && (

        <>
        <div className="flex flex-grow">

        
        <Card height="h-[calc(100vh-99px)]" width="w-[1000px]">
          <div className="flex flex-row items-center space-x-8 mb-16">
            
            <p>Advreservation</p>
            <p className="text-red-500">Errors</p>

            
            <div className="flex-grow max-w-[800px]">
              <SearchBar
                placeholder="Search Logs..."
                onChange={handleSearchChange}
              />
            </div>

            
            <div className="relative">
              <select
                value={selectedOption}
                onChange={handleSelectChange}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
              >
                <option value="package1">Package 1</option>
                <option value="pakcage2">Package 2</option>
                <option value="package3">Package 3</option>
                <option value="package4">Package 4</option>
              </select>
            </div>

            
            <div className="relative">
              <button
                onClick={toggleDateTimeVisibility}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
              >
                Set Date & Time
              </button>
            
             
              {isDateTimeVisible && (
                <div className="absolute top-0 right-0 mt-12">
                  <DatePicker
                    placeholderText="MM/DD/YYYY, HH:MM"
                    selected={selectedDate}
                    onChange={handleDateChange}
                    showTimeSelect
                    dateFormat="Pp"
                    className="border border-gray-300 p-2 rounded"
                  />
                </div>
              )}
            </div>
          </div>

          
          <div className="p-4">
            <p className="text-center text-gray-500">No logs available.</p>
          </div>
        </Card>
        </div>

        

        </>
      )}
    </div>
  );
};

export default MainContent;
