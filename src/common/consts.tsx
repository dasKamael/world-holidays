export const api_key = "NW34qMPiqlmctzxwUN38z1fD0in8XGqX";

export const countries_url = `https://calendarific.com/api/v2/countries?api_key=${api_key}`;

export const holidays_url = (countryCode: string) =>
  `https://calendarific.com/api/v2/holidays?api_key=${api_key}&country=${countryCode}&year=2023`;
