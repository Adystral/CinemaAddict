import { useState } from "react";
import Button from './Button';

export default function InputItem({
  type = "",
  placeholder = "",
  inputClassName = "",
  btnChildren = "",
  btnClassName = "",
}) {
  const [inputText, setInputText] = useState("");
  
  function handleChange(e) {
    setInputText(e.target.value);
    console.log(inputText);
  }


  return (
    <div>
      <input
        type={type}
        placeholder={placeholder}
        className={`${inputClassName} bg-[#1e293b]/50 border border-slate-700 text-slate-200 placeholder-slate-500 rounded px-3 py-1.5 mx-2 focus:outline-none focus:border-slate-400 font-mono text-base transition-colors duration-200`}
      />

      <Button
        children={btnChildren}
        className={`${btnClassName} bg-[#1e293b]/50 border border-slate-700 text-slate-200 placeholder-slate-500 rounded px-3 py-1.5 mx-2 focus:outline-none focus:border-slate-400 font-mono text-base transition-colors duration-200`}
        onClick={handleChange}
      />
    </div>
  );
}
