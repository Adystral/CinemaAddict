import { useNavigate } from "react-router-dom";
import Button from "./Button";

export default function InputItem({
  type = "",
  placeholder = "",
  inputClassName = "",
  btnChildren = "",
  btnClassName = "",
  searchQuery,
  setSearchQuery,
}) {
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault(); 

    if (searchQuery && searchQuery.trim() !== "") {
      navigate(`/search?q=${searchQuery}`);
    }
  };

  return (
    <form 
      onSubmit={handleSearchSubmit} 
      className="flex flex-row items-center w-full justify-center"
    >
      <input
        type={type}
        placeholder={placeholder}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className={`${inputClassName} cinematic-input min-w-0`}
      />

      <div className="hidden sm:block ml-2">
        <Button
          children={btnChildren}
          className={`${btnClassName} bg-[#1e293b]/50 border border-slate-700 text-slate-200 rounded-lg px-4 py-2 focus:outline-none focus:border-slate-400 font-mono text-base transition-colors duration-200 cursor-pointer`}

          type="submit" 
        />
      </div>
    </form>
  );
}