import React, { useState } from "react";

type TextInputProps = {
  handleSubmit: (text: string) => void;
};

const TextInput: React.FC<TextInputProps> = (props) => {
  const [textInput, setTextInput] = useState<string>("");

  const onSubmit = (event: React.FormEvent, text: string) => {
    event.preventDefault();
    text.trim();

    if (text && text.length) {
      props.handleSubmit(text);
    }
  };


  return (
    <form onSubmit={(e) => onSubmit(e, textInput)}>
      <div className="flex w-full flex-nowrap items-stretch border border-gray-200 rounded-lg">
        <label
          htmlFor="inline-url"
          className="font-bitlyTitle text-2xl text-center bg-transparent items-center justify-center p-3 border-r"
        >
          bit.ly/
        </label>

        <input
          id="inline-url"
          type="text"
          placeholder="Aa"
          className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white bg-white focus:outline-none w-full"
          value={textInput}
          autoComplete="off"
          onChange={(e) => setTextInput(e.target.value)}
        />

        <button className="disabled:opacity-50 bg-blue-500 hover:bg-blue-400 text-white font-bold p-3 rounded-r-lg " disabled={textInput.length === 0}>
          Submit
        </button>
      </div>
    </form>
  );
};

export default TextInput;
