import React from "react";


type ButtonProps = {
    disabled: boolean;
    handleClick: Function;
};

const Button: React.FC<ButtonProps> = ({handleClick, children, disabled}) => {

    const _handleClick = (e: React.FormEvent) => {
        e.preventDefault();

        if (disabled) {
            return
        }

        handleClick();
    }

    return (
        <button
            disabled={disabled}
            onClick={(e) => _handleClick(e)}
            className="disabled:opacity-50 bg-blue-600 text-gray-100 border-0 px-4 py-2 rounded w-full hover:bg-blue-800 focus:outline-none text-sm font-semibold">
            {children}
        </button>
    );
};

export default Button;