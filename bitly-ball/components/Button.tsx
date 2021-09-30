import React from "react";


type ButtonProps = {
    handleClick: () => void;
};

const Button: React.FC<ButtonProps> = ({handleClick, children}) => {

    return (
        <button 
            onClick={(e) => handleClick()}
            className="bg-blue-600 text-gray-100 border-0 px-4 py-2 rounded w-full hover:bg-blue-300 focus:outline-none">
            {children}
        </button>
    );
};

export default Button;