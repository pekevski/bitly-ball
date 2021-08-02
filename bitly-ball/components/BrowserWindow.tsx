import React from "react";

type BrowserWindowProps = {}

const BrowserWindow: React.FC<BrowserWindowProps> = (props) => {
    return (
        <>
            <div className="border border-b-0 rounded-b-none border-gray-200 rounded-lg">
                <div className="flex p-1">
                <div className="flex">
                    <div className="rounded-full m-0.5 bg-red-500 w-3 h-3"></div>
                    <div className="rounded-full m-0.5 bg-yellow-500 w-3 h-3"></div>
                    <div className="rounded-full m-0.5 bg-green-500 w-3 h-3"></div>
                </div>
                </div>
            </div>
            <div className="border border-gray-200 rounded-lg rounded-t-none">
               {props.children}
            </div>
        </>
    )
}

export default BrowserWindow; 