import React from 'react';

const Card = ({children, height, width}) => {
    return (
        <div 
            className={`bg-sidebarBg rounded-lg shadow-lg p-6 mb-4 ${height} ${width}`}>
                {children}
        </div>
    )
}

export default Card;