import React from 'react';

type NumberCounterProps = {
  id: string;
  min: number;
  max: number;
  value: number;
  onValueChange: (number: number) => void;
};

const NumberCounter: React.FC<NumberCounterProps> = ({
  id,
  min,
  max,
  value,
  onValueChange
}) => {
  const handleIncrement = (e: React.MouseEvent) => {
    e.preventDefault();

    if (value < max) {
      onValueChange(value + 1);
    }
  };

  const handleDecrement = (e: React.MouseEvent) => {
    e.preventDefault();

    if (value > min) {
      onValueChange(value - 1);
    }
  };

  return (
    <div id={id} className="w-32">
      <div className="flex flex-row w-full rounded-lg">
        <button
          onClick={handleDecrement}
          className="px-4 py-2 bg-white text-gray-600 hover:text-gray-700 hover:bg-gray-100 h-full w-18 rounded-l cursor-pointer border-gray-300 border"
        >
          <span className="m-auto">&#8722;</span>
        </button>
        <h5 className="px-2 bg-white border-gray-300 border-t border-b font-semibold text-center text-md hover:text-black focus:text-black md:text-basecursor-default flex items-center justify-center text-center text-gray-700 w-20">
          {value}
        </h5>
        <button
          onClick={handleIncrement}
          className="px-4 py-2 bg-white text-gray-600 hover:text-gray-700 hover:bg-gray-100 w-18 rounded-r cursor-pointer border-gray-300 border"
        >
          <span className="m-auto">&#43;</span>
        </button>
      </div>
    </div>
  );
};

export default NumberCounter;
