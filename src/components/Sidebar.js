const Sidebar = ({ onMenuItemClick, activeItem, showSubMenu }) => {
    return (
      <div className="relative my-4 left-5 h-100 w-[15vw] bg-sidebarBg rounded-lg shadow-lg z-10">
        <ul className="text-sidebarText p-4">
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
  