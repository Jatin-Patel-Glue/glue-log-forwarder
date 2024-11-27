// src/components/Sidebar.js
import React, {useState} from 'react';


const Sidebar = ({onMenuItemClick, activeItem}) => {
    const [applicationsPress, setApplicationsPress] = useState(false);
    



    const toggleApplicationsMenu = () => {
        setApplicationsPress(!applicationsPress);
    };



    return (
        <div className="fixed top-[80px] left-5 h-[calc(100vh-99px)] w-30 bg-sidebarBg rounded-lg shadow-lg p-4">
        <ul className="text-sidebarText">
            <li 
                className={`mb-4 hover:text-black cursor-pointer ${activeItem === "Dashboard" ? "text-black" : ""}`}
                onClick={() => onMenuItemClick("Dashboard")}>Dashboard
            </li>

            <li
                className={`mb-4 hover:text-black cursor-pointer ${activeItem === "Applications" ? "text-black" : ""}`}
                onClick={() => {onMenuItemClick("Applications");
                toggleApplicationsMenu(); // Toggle submenu visibility
                }}>Applications
            </li>

            {applicationsPress && (
                <ul className="pl-6">
                    <li 
                        className={`mb-4 hover:text-black cursor-pointer ${activeItem === "Logs" ? "text-black" : ""}`}
                        onClick={() => onMenuItemClick("Logs")}
                    >
                        Logs
                    </li>

                    <li
                        className={`mb-4 hover:text-black cursor-pointer ${activeItem === "Status" ? "text-black" : ""}`}
                        onClick={() => onMenuItemClick("Status")}
                    >
                        Status
                    </li>
                </ul>
            )}
        </ul>

        

    </div>
    );
};

export default Sidebar;
