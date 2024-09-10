import { useState, useEffect } from "react";

export default function Filter({ searchCountries, searchInput, setCountries }) {
  const regions = ["Oceania", "Europe", "Asia", "Africa", "Americas"];
  const [selectedRegion, setSelectedRegion] = useState(""); // Track selected region

  useEffect(() => {
    if (selectedRegion) {
      fetchCountryByRegion(selectedRegion);
    }
  }, [selectedRegion]);

  const fetchCountryByRegion = async (region) => {
    try {
      const res = await fetch(`https://restcountries.com/v3.1/region/${region}`);
      const data = await res.json();

      if (Array.isArray(data)) {
        setCountries(data); // Set countries based on region
        searchCountries(""); // Clear the search input if a region is selected
      } else {
        console.error("Unexpected response format:", data);
        setCountries([]); // Reset countries if response isn't as expected
      }
    } catch (error) {
      console.error("Failed to fetch countries by region", error);
      setCountries([]); // Reset countries on error
    }
  };

  const handleRegionChange = (event) => {
    const region = event.target.value;
    setSelectedRegion(region); // Update the selected region state
  };

  return (
    <div className="flex items-start justify-between flex-col md:flex-row md:items-center md:justify-between 2xl:container 2xl:mx-auto">
      <input
        type="search"
        name="search"
        id="search"
        placeholder="Search by country name"
        value={searchInput}
        onChange={(e) => {
          searchCountries(e.target.value);
        }}
        className="py-2 px-4 rounded shadow placeholder-gray-900 ml-5 lg:w-1/2 w-full"
        autoComplete="off"
      />

      <select
        name="select"
        id="select"
        className="py-2 px-4 rounded shadow ml-5 md:mr-5 md:ml-0"
        value={selectedRegion}
        onChange={handleRegionChange}
      >
        <option value="" disabled>Select a region</option>
        {regions.map((region) => (
          <option key={region} value={region}>
            {region}
          </option>
        ))}
      </select>
    </div>
  );
}