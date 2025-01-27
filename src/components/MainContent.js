import React, { useState } from "react";
import Card from "./Sections";
import SearchBar from "./SearchBar";
import DatePicker from "react-datepicker";
import GetData from "./GetData";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect } from "react";
import { HiCheck } from "react-icons/hi";
import { HiXMark } from "react-icons/hi2";
 
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
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [numError, setNumErrors] = useState("");
  const [recurringErrors, setRecurringErrors] = useState([]); 

 
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

  useEffect(() => {
    analyzeRecurringErrors(logs);
  }, [logs]); // Run this effect whenever logs updates


  useEffect(() => {
    setFilteredLogs(logs); // Initialize filteredLogs with all logs when logs change
  }, [logs]); // Run this effect whenever logs updates
  
 
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
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
  
    const terms = query.split(/[\s,]+/).filter(Boolean);
  
    const filtered = logs.filter((log) => {
      const [date, time , logType, correlationId, packageName] = splitLogLine(log.line);
  
      return terms.every((term) =>
        logType.toLowerCase().includes(term) ||
        date.toLowerCase().includes(term) ||
        time.toLowerCase().includes(term) ||
        correlationId.toLowerCase().includes(term) ||
        packageName.toLowerCase().includes(term)
      );
    });
  
    setFilteredLogs(filtered);
  };
  
  
  
  
 
  // const handleDateChange = (date) => {
  //   setSelectedDate(date);
  // };
 
  const highlightSearch = (text, query) => {
    // Split the query into individual terms
    const terms = query.split(/[\s,]+/).filter(Boolean); // This will split by spaces or commas
  
    // Create a case-insensitive regex to search for the terms
    const regex = new RegExp(`(${terms.join('|')})`, 'gi');
  
    // Split the text by matching the query terms, and map over the parts to create JSX elements
    return text.split(regex).map((part, index) => {
      // If the part matches a query term, highlight it
      if (terms.some((term) => term.toLowerCase() === part.toLowerCase())) {
        return (
          <span key={index} style={{ color: 'blue', fontWeight: 'bold' }}>
            {part}
          </span>
        );
      } else {
        // Otherwise, just return the part as it is
        return <span key={index}>{part}</span>;
      }
    });
  };


  // Function to analyze recurring errors
  const analyzeRecurringErrors = (logList) => {
    const errorCount = {};

    logList.forEach((log) => {
      const message = splitLogLine(log.line)[5]; // Assume the log message is in `log.line`.
      if (!errorCount[message]) {
        errorCount[message] = 0;
      }
      errorCount[message]++;
    });

    // Filter errors that occur more than once
    const recurring = Object.entries(errorCount)
      .filter(([_, count]) => count > 1)
      .map(([message, count]) => ({ message, count }));

    setRecurringErrors(recurring);
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
 
 
  // const toggleDateTimeVisibility = () => {
  //   setIsDateTimeVisible((prevState) => !prevState);
  // };
 
  return (
    <div className="p-4" >
     
      {activeItem === "Dashboard" && (
        <>        
          <div className="flex flex-row space-x-4 mb-4 h-[40vh]">
            <Card height= "h-full" width="w-full">
              <div className="font-bold text-xl mb-2">Recurring Errors</div>
              <div className="flex flex-col space-y-2">
                {recurringErrors.length > 0 ? (
                  recurringErrors.map((error, index) => (
                    <div
                      key={index}
                      className="border border-gray-300 p-2 rounded"
                    >
                      <p>
                        <strong>Message:</strong> {error.message}
                      </p>
                      <p>
                        <strong>Occurrences:</strong> {error.count}
                      </p>
                    </div>
                  ))
                ) : (
                  <p>No recurring errors found.</p>
                )}
              </div>
          </Card>
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
                    className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-blue-600 text-center overflow-hidden"
                    onClick={() => {
                      setShowExtraCard(true);
                      handleGroupClick(item.groupName); // Call the handleGroupClick function with the group name
                    }}
                  >
                    {item.groupName}
                  </button>
 
                  {/* Status Icon */}
                  <div className="flex justify-center items-center">
                    {item.status ? (
                      <p className="text-3xl bg-green-500 rounded-full w-9 h-9 flex items-center justify-center">
                      <HiCheck />
                      </p>
                    ) : (
                      <p className="text-3xl bg-red-500 rounded-full w-9 h-9 flex items-center justify-center">
                        <HiXMark />
                      </p>
                    )
                    }
                    
                  </div>
 
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
                      className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-blue-600 text-left overflow-hidden w-auto"
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
                placeholder="Search Log type, Correltation ID, Package Name, Date..."
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
 
 
           
            {/* <div className="relative">
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
            </div> */}
          </div>
          <div className="p-4">
            {(searchQuery ? filteredLogs : logs).map((log, index) => {
              const [date, time , logType, correlationId, packageName, message] = splitLogLine(log.line);
             

              return (
                <div
                  key={index}
                  className="bg-white text-black border border-gray-300 px-4 py-2 rounded w-full text-left pb-3"
                >
                  <div className="flex flex-col p-2">
                    <div className="logType">
                      Log type:{" "}
                      {highlightSearch(logType, searchQuery)}
                    
                    </div>
                    <div className = "date">
                      Timestamp:{" "}
                      {highlightSearch(date, searchQuery)}{" "}{highlightSearch(time, searchQuery)}
                    </div>

                    <div className="correlationId">
                      Correlation ID:{" "}
                     {highlightSearch(correlationId, searchQuery)}  
                    
                    </div>
                    <div className="package">
                      Package name:{" "}
                      {highlightSearch(packageName, searchQuery)}
                      
                  
                    </div>
                    <div className="logMessage">Message:{message}</div>
                  </div>
                </div>
              );
            })}
          </div>

        </Card>
        </div>
        </>
      )}
    </div>
  );
};
 
export default MainContent;