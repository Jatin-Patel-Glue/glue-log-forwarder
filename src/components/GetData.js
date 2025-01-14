import { useEffect } from "react";

const GetData = (URL, setData, filter) => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(URL, {
          method: "GET", // or "POST", depending on your request
          headers: {
            "Content-Type": "application/json", // Optional if you're working with JSON
            "Authorization": "Basic QWRtaW5pc3RyYXRvcjptYW5hZ2U=" // Your Basic Auth token here
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        let filteredData = [];
        if (filter === "fileNames") {
            filteredData = data.filesByGroup.map(group => ({
                groupName: group.groupName,
                lastModified: group.files[0]?.lastModified || "N/A",
            }));
        } 
        else if (filter === "logFiles") {
            filteredData = data.filesByGroup.map(group => ({
                groupName: group.groupName,
                files: group.files,
            }));
        }
        else if (filter === "Logs") {
            filteredData = data.results?.map(result => ({
              line: result.line,
             
            })) || [];// Fallback to an empty array if results is undefined
        }
    
        else {
          filteredData = data; // Default behavior if no specific filter is provided
        }


        setData(filteredData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (URL) {
      fetchData();
    }
  }, [URL, setData, filter]); // Include `filter` in the dependency array
};

export default GetData;
