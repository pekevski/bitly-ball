import React, { useState } from 'react';

type TextInputProps = {
  loading: boolean;
  handleSubmit: (text: string) => void;
};

const TextInput: React.FC<TextInputProps> = (props) => {
  const [textInput, setTextInput] = useState<string>('');

  const onSubmit = (event: React.FormEvent, text: string) => {
    event.preventDefault();
    text.trim();

    if (text && text.length) {
      props.handleSubmit(text);
    }
  };

  return (
    <form onSubmit={(e) => onSubmit(e, textInput)}>
      <div className="flex w-full sm:flex-nowrap flex-wrap items-stretch border border-gray-300 bg-white rounded-lg">
        <label
          htmlFor="inline-url"
          className="font-bitlyTitle text-2xl text-center bg-transparent items-center justify-center p-3 sm:border-r sm:border-b-0 border-b w-full sm:w-32"
        >
          bit.ly/
        </label>

        <input
          id="inline-url"
          type="text"
          placeholder="Aa"
          className="p-3 placeholder-gray-500 text-blueGray-600 w-full bg-transparent focus:outline-none"
          value={textInput}
          autoComplete="off"
          onChange={(e) => setTextInput(e.target.value)}
        />

        <button
          className="disabled:opacity-50 bg-blue-500 hover:bg-blue-400 text-white font-bold p-3 sm:rounded-r-lg sm:rounded-bl-none rounded-b-lg sm:border-l sm:border-t-0 border-t w-full sm:w-32"
          disabled={props.loading || textInput.length === 0}
        >
          {props.loading ? 'Loading...' : 'Submit'}
        </button>
      </div>
    </form>
  );
};

export default TextInput;
