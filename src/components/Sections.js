import React from 'react';

const Card = ({children, height, width}) => {
    return (
        <div 

//             className={`bg-sidebarBg rounded-lg shadow-lg p-6 ${height} ${width}`}>

            className={`bg-sidebarBg rounded-lg shadow-lg p-6 mb-4 ${height} ${width} flex-grow overflow-auto`}>

                {children}
        </div>
    )
}

export default Card;