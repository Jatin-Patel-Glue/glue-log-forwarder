const Sidebar = ({ onMenuItemClick, activeItem, showSubMenu }) => {
    return (
      <div className="fixed top-[80px] left-5 h-[calc(100vh-99px-5px)] w-30 bg-sidebarBg rounded-lg shadow-lg p-4 z-10">
        <ul className="text-sidebarText">
          <li
            className={`mb-4 hover:text-black cursor-pointer ${activeItem === "Dashboard" ? "text-black" : ""}`}
            onClick={() => onMenuItemClick("Dashboard")}
          >
            Dashboard
          </li>
          <li
            className={`mb-4 hover:text-black cursor-pointer ${activeItem === "Applications" ? "text-black" : ""}`}
            onClick={() => onMenuItemClick("Applications")}
          >
            Applications
          </li>
  
         
          {showSubMenu && (
            <>
              <li
                className={`ml-6 mb-4 hover:text-black cursor-pointer ${activeItem === "Logs" ? "text-black" : ""}`}
                onClick={() => onMenuItemClick("Logs")}
              >
                Logs
              </li>
              <li
                className={`ml-6 mb-4 hover:text-black cursor-pointer ${activeItem === "Status" ? "text-black" : ""}`}
                onClick={() => onMenuItemClick("Applications")}  
              >
                Status
              </li>
            </>
          )}
        </ul>
      </div>
    );
  };
  
  export default Sidebar;
  