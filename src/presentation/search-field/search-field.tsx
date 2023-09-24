import { ChangeEvent, FC, useRef, useState } from "react";
import "./search-field.css";

interface Props {
  countries: any[];
  onSearch: (search: string) => void;
}

export const SearchField: FC<Props> = ({ countries, onSearch }) => {
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    if (value) {
      const regex = new RegExp(`^${value.replace(/ /g, "\\s")}`, "i"); // updated this line to handle spaces
      const suggestions = countries.filter((country) =>
        regex.test(country.country_name)
      );
      setSuggestions(suggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Tab" && suggestions.length > 0) {
      e.preventDefault();
      const firstSuggestion = suggestions[0];
      const searchIsIso = /^[a-zA-Z0-9]+\s?[a-zA-Z0-9]*$/i.test(search);
      const completion = searchIsIso
        ? firstSuggestion.country_name
        : firstSuggestion["iso-3166"];
      setSearch(completion);
      setSuggestions([]);
    }
    if (e.key === "Enter" && search) {
      e.preventDefault();
      const selectedCountry = countries.find(
        (country) =>
          country.country_name.toLowerCase() === search.toLowerCase() ||
          country["iso-3166"].toLowerCase() === search.toLowerCase()
      );
      onSearch(selectedCountry ? selectedCountry["iso-3166"] : search);
    }
  };

  const getAutocompleteText = () => {
    if (suggestions.length > 0) {
      const firstSuggestion = suggestions[0];
      const searchIsIso = /^[a-zA-Z0-9]+\s?[a-zA-Z0-9]*$/i.test(search);
      const completion = searchIsIso
        ? firstSuggestion.country_name
        : firstSuggestion["iso-3166"];
      return completion.slice(search.length);
    }
    return "";
  };

  return (
    <div className="search-field">
      <input
        type="text"
        id="search"
        placeholder="Search for a country"
        value={search}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        ref={inputRef}
      />
      <span className="autocomplete-text">{getAutocompleteText()}</span>
    </div>
  );
};
