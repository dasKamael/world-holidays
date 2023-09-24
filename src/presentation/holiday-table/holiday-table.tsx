import { FC, useEffect, useState } from "react";
import "./holiday-table.css";

interface Props {
  holidays: any;
  loading: boolean;
  error: string | null; // Add error prop
}

export const HolidayTable: FC<Props> = ({ holidays, loading, error }) => {
  const [types, setTypes] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState<string>("All");
  const [filteredHolidays, setFilteredHolidays] = useState<any[]>([]);

  useEffect(() => {
    if (selectedType === "All") {
      setFilteredHolidays(holidays);
    } else {
      setFilteredHolidays(
        holidays.filter((holiday: any) => holiday.type.includes(selectedType))
      );
    }
  }, [holidays, selectedType]);

  useEffect(() => {
    if (!holidays) return;
    const types: string[] = [];
    types.push("All");
    holidays.forEach((holiday: any) => {
      holiday.type.forEach((type: string) => {
        if (!types.includes(type)) types.push(type);
      });
    });
    setTypes(types);
  }, [holidays]);

  if (loading)
    return (
      <div className="loading">
        <h1>Loading...</h1>
      </div>
    );

  if (error)
    return (
      <div className="error">
        <h1>Error: {error}</h1>
      </div>
    );

  if (!holidays || holidays.length === 0)
    return (
      <div className="empty">
        <h1>No Country found</h1>
      </div>
    );

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Date</th>
            <th>Description</th>
            <th>
              <select
                id="type"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
              >
                {types.map((type: string) => (
                  <option value={type} key={type}>
                    {type}
                  </option>
                ))}
              </select>
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredHolidays &&
            filteredHolidays.map((holiday: any) => (
              <tr key={holiday.date.iso}>
                <td>{holiday.name}</td>
                <td>{holiday.date.iso}</td>
                <td>{holiday.description}</td>
                <td>{holiday.type.join(", ")}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};
