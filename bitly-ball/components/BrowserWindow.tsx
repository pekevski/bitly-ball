import React, { PropsWithChildren } from 'react';

type BrowserWindowProps = {};

const BrowserWindow: React.FC<PropsWithChildren<BrowserWindowProps>> = (
  props
) => {
  return (
    <div className="flex flex-col shadow-xl h-full border border-gray-100 rounded-lg bg-gray-200 backdrop-filter backdrop-blur-lg bg-opacity-30 z-10">
      <div className="border-b w-full">
        <div className="flex p-1">
          <div className="flex">
            <div className="rounded-full m-0.5 bg-red-500 w-3 h-3"></div>
            <div className="rounded-full m-0.5 bg-yellow-500 w-3 h-3"></div>
            <div className="rounded-full m-0.5 bg-green-500 w-3 h-3"></div>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center w-full flex-grow overflow-hidden">
        {props.children}
      </div>
    </div>
  );
};

export default BrowserWindow;
