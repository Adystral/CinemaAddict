import { useState, useEffect, useRef } from "react";
import { API_BASE_URL, API_OPTIONS } from "../../services/API_VARIABLES";
import InputItem from "../ui/InputItem";
import Dropdown from "./Dropdown";

export default function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [error, setError] = useState("");

  const searchContainerRef = useRef(null);

  // close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setIsDropdownVisible(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // debounced search
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (!searchQuery) {
        setSearchResults([]);
        return;
      }
      fetchSearchResults();
    }, 700);

    async function fetchSearchResults() {
      try {
        const endpoint = `${API_BASE_URL}/search/movie?query=${encodeURIComponent(searchQuery)}`;
        const response = await fetch(endpoint, API_OPTIONS);
        const data = await response.json();

        const sortedMovies = data.results.sort((a, b) => b.popularity - a.popularity);
        setSearchResults(sortedMovies);
      } catch (error) {
        console.error("Error fetching search page results:  ", error);
      }
    }

    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  // clears the error the moment the user types anything
  function handleQueryChange(newValue) {
    setSearchQuery(newValue);
    if (newValue.trim()) {
      setError("");
    }
  }

  // called when the user clicks Search with an empty field
  function handleEmptySearch() {
    setError("Please enter a movie name to search.");
    setIsDropdownVisible(false);
  }

  return (
    <div className="mb-12 w-full flex justify-center px-4">
      <div className="w-full md:w-auto flex flex-col items-center">
        <label className="flex text-slate-400 text-sm mb-2 text-left w-full md:hidden font-semibold tracking-wider justify-center">
          Explore Movies
        </label>

        <div className="relative w-full md:w-lg" ref={searchContainerRef}>
          <InputItem
            type="text"
            placeholder="Search movies (e.g. Batman)..."
            inputClassName="w-full shadow-inner bg-slate-800/50"
            btnChildren="Search"
            btnClassName="hover:bg-slate-700 transition"
            searchQuery={searchQuery}
            setSearchQuery={handleQueryChange}
            onFocus={() => setIsDropdownVisible(true)}
            onEmptySearch={handleEmptySearch}
          />

          {error && (
            <p className="mt-2 ml-4 text-sm text-red-400 text-left w-full">
              {error}
            </p>
          )}

          <Dropdown
            searchResults={searchResults}
            searchQuery={searchQuery}
            isDropdownVisible={isDropdownVisible}
            setIsDropdownVisible={setIsDropdownVisible}
          />
        </div>
      </div>
    </div>
  );
}