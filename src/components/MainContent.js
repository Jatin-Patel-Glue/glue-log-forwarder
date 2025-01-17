import React, { useState } from "react";
import Card from "./Sections";
import SearchBar from "./SearchBar";
import DatePicker from "react-datepicker";
import GetData from "./GetData";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect } from "react";
 
const MainContent = ({ activeItem, toggleLogs, onMenuItemClick }) => {
  const [showExtraCard, setShowExtraCard] = useState(false);
  const [activeApplication, setActiveApplication] = useState(null);
  const [activeLog, setActiveLog] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [groupData, setGroupData] = useState([]);
  const [URL, setURL] = useState("");
  const [logFiles, setLogFiles] = useState([]);
  const [currentRequest, setCurrentRequest] = useState([]);
 
  const [logs, setLogs] = useState([]);
 
 
 
 
  useEffect(() => {
    if (activeItem === "Applications") {
      setURL("/glf/getLogFiles");
    } else if ((activeItem === "Logs") || activeLog) {
      console.log(activeLog)
      setURL(`/glf/filterContent?file=${activeLog}&search=.*&position=&displayOutput=asc&ignoreCase=true`
      );
    }
  }, [activeItem, activeLog]); // Ensure correct dependencies
 
  GetData(URL, setGroupData, "fileNames");
  GetData(URL, setLogFiles, "logFiles");
  GetData(URL, setLogs, "Logs");
 
 
  const [isDateTimeVisible, setIsDateTimeVisible] = useState(false);

  const splitLogLine = (line) => {
    const splitLine = line.split(" ");
    const log = splitLine.slice(5, (splitLine.length - 1)).join(" ");
    const finalLine = (splitLine.slice(0, 5));
    finalLine.push(log);

    return finalLine;
  }
 
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
 
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
 
 
  const handleGroupClick = (groupName) => {
    setActiveApplication(groupName);
    setShowExtraCard(true);
  };
 
   const handleLogFileClick = (logFile) => {
    setActiveLog(logFile);
 
   }
 
   const handlePackageChange = (updatedLogFile) => {
    setActiveLog(updatedLogFile); // Update activeLog with the selected file
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
           
            <Card height="h-full" width="w-2/3" />
     
           
            <div className="flex flex-col w-1/3 gap-4">
              <Card height="h-full" width="w-full" />
              <Card height="h-full" width="w-full" />
            </div>
          </div>
        </>
      )}
 
      {(activeItem === "Applications") && (
 
        <div className="flex flex-row space-x-4 h-[80vh]">
         
         <Card height="h-full" width="w-full">
            {/* Header Section */}
            <div className="grid grid-cols-3 gap-4 items-center font-bold border-b pb-2">
              <h1>Application Name</h1>
              <h1 className="text-center">Status</h1>
              <h1 className="text-right">Last Modified On</h1>
            </div>
 
            <br />
 
            {/* Content Section */}
            <div className="flex flex-col space-y-4">
              {groupData.map((item, index) => (
                <div key={index} className="grid grid-cols-3 gap-4 items-center">
                  {/* Application Name Button */}
                  <button
                    className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-blue-600 text-left"
                    onClick={() => {
                      setShowExtraCard(true);
                      handleGroupClick(item.groupName); // Call the handleGroupClick function with the group name
                    }}
                  >
                    {item.groupName}
                  </button>
 
                  {/* Empty Status Column */}
                  <div></div>
 
                  {/* Last Modified Date */}
                  <div className="text-right">
                    <p>{new Date(parseInt(item.lastModified, 10)).toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
 
         
 
          {showExtraCard && (
            <Card width="w-full" height="h-full">
            <div className="grid grid-cols-3 gap-4 items-center font-bold border-b pb-2">
              <h1>Logs</h1>
              <h1 className="text-center">Size</h1>
              <h1 className="text-right">Last Modified On</h1>
            </div>
            <br />
         
            {/* Log Files */}
            <div className="flex flex-col space-y-4">
              {logFiles
                .filter((log) => log.groupName === activeApplication)
                .flatMap((log) => log.files)
                .map((file, index) => (
                  <div key={index} className="grid grid-cols-3 gap-4 items-center">
                    {/* Log File Button */}
                    <button
                      className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-blue-600 text-center"
                      onClick={() => {
                        onMenuItemClick("Logs");
                        handleLogFileClick(file.filename);
                      }}
                    >
                      {file.filename}
                    </button>
         
                    {/* File Size */}
                    <div className="text-center">
                      <p>{file.sizeInBytes} bytes</p>
                    </div>
         
                    {/* Last Modified */}
                    <div className="text-right">
                      <p>{new Date(parseInt(file.lastModified, 10)).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
            </div>
          </Card>
          )}
        </div>
      )}
 
      {activeItem === "Logs" && (
 
        <>
        <div className="flex flex-grow h-[80vh]">
 
       
        <Card height="h-full" width="w-full">
          <div className="flex flex-row items-center space-x-8 mb-16">
           
            <p>{activeApplication}</p>
            <p className="text-red-500">Errors</p>
 
           
            <div className="flex-grow max-w-[65vw]">
              <SearchBar
                placeholder="Search Logs..."
                onChange={handleSearchChange}
              />
            </div>
 
           
            <div className="relative">
            <select
                value={activeLog || ""} // Bind the dropdown to activeLog state
                onChange={(e) => handlePackageChange(e.target.value)} // Update activeLog
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
              >
                {logFiles
                  .filter((log) => log.groupName === activeApplication) // Filter logs by active application
                  .flatMap((log) => log.files) // Extract files from the selected log
                  .map((file, index) => (
                    <option key={index} value={file.filename}>
                      {file.filename} {/* Display the filename in the dropdown */}
                    </option>
                  ))}
                {logFiles.length === 0 && <option>No files available</option>} {/* Handle no files available */}
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
          {logs.map((log, index) => (
          <div
            key={index}
            className="bg-white text-black border border-gray-300 px-4 py-2 rounded w-full text-left pb-3"
          >
            
            {/* {log.line} Render the log line */}
            <div className = "flex flex-col p-2">
              <div className = "errorType">
                Error type: {splitLogLine(log.line)[2]}
              </div>
              <div className = "date">
                Timestamp: {splitLogLine(log.line)[0] + " " + splitLogLine(log.line)[1]}
              </div>
              <div className = "correlationId">
                Correlation ID: {splitLogLine(log.line)[3]}
              </div>
              <div className = "package">
                Package name: {splitLogLine(log.line)[4]}
              </div>
              <div className = "logMessage">
                Message: {splitLogLine(log.line)[5]}
              </div>
            </div>
          </div>
        ))}
          </div>
        </Card>
        </div>
        </>
      )}
    </div>
  );
};
 
export default MainContent;