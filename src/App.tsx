import { useEffect, useState } from "react";
import "./App.css";
import { countries_url, holidays_url } from "./common/consts";
import { Country } from "./domain/models/country";
import { Holiday } from "./domain/models/holiday";
import { HolidayTable } from "./presentation/holiday-table/holiday-table";
import { SearchField } from "./presentation/search-field/search-field";

function App() {
  // have a state that saves the result of the search
  const [search, setSearch] = useState("");

  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [countries, setCountries] = useState<Country[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(countries_url);
        const data = await response.json();
        setCountries(data.response.countries);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch countries.");
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (search === "") return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(holidays_url(search));
        if (!response.ok) {
          throw new Error(`Failed to fetch holidays: ${response.statusText}`);
        }
        const data = await response.json();
        setHolidays(data.response.holidays);
        setLoading(false);
        console.log(data);
      } catch (e: any) {
        console.error(e);
        setError(e.message || "An error occurred while fetching holidays.");
        setLoading(false);
      }
    };

    fetchData();
  }, [search]);

  return (
    <div className="App">
      <SearchField
        countries={countries}
        onSearch={(search) => setSearch(search)}
      />
      <HolidayTable holidays={holidays} loading={loading} error={error} />
    </div>
  );
}

export default App;
