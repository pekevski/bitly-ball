import React from 'react';

type NumberCounterProps = {
    id: string;
    min: number;
    max: number;
    value: number;
    onValueChange: (number: number) => void;
}

const NumberCounter: React.FC<NumberCounterProps> = ({id, min, max, value, onValueChange}) => {

    const handleIncrement = (e: React.MouseEvent) => {
        e.preventDefault();

        if (value < max) {
            onValueChange(value + 1);
        }
    }

    const handleDecrement = (e: React.MouseEvent) => {
        e.preventDefault();

        if (value > min) {
            onValueChange(value - 1);
        }
    }

    return (
        <div id={id} className="w-32">
            <div className="flex flex-row w-full rounded-lg">
                <button onClick={handleDecrement} className="px-4 py-1 bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none">
                    <span className="m-auto text-2xl">&#8722;</span>
                </button>
                <h5 className="px-2 bg-gray-300 font-semibold text-center text-md hover:text-black focus:text-black md:text-basecursor-default flex items-center justify-center text-center text-gray-700 w-20">{value}</h5>
                <button onClick={handleIncrement} className="px-4 py-1 bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 w-20 rounded-r cursor-pointer">
                    <span className="m-auto text-2xl">&#43;</span>
                </button>
            </div>
        </div>
    )

}

export default NumberCounter;