import React from "react";


type ButtonProps = {
    handleClick: Function;
};

const Button: React.FC<ButtonProps> = ({handleClick, children}) => {

    const _handleClick = (e: React.FormEvent) => {
        e.preventDefault();
        handleClick();
    }

    return (
        <button 
            onClick={(e) => _handleClick(e)}
            className="bg-blue-600 text-gray-100 border-0 px-4 py-2 rounded w-full hover:bg-blue-300 focus:outline-none text-lg font-semibold">
            {children}
        </button>
    );
};

export default Button;