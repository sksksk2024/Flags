import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import Filter from "./Filter";

export default function Countries() {
  const [countries, setCountries] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRegion, setSelectedRegion] = useState(""); // New state for selected region

  useEffect(() => {
    const fetchAllCountries = async () => {
      try {
        const res = await fetch("https://restcountries.com/v3.1/all");
        const data = await res.json();
        if (Array.isArray(data)) {
          setCountries(data);
          setFiltered(data); // Initialize filtered with all countries
        } else {
          console.error("Unexpected response format:", data);
        }
      } catch (error) {
        console.error("Failed to fetch countries data", error);
      } finally {
        setIsLoading(false); // Always set loading to false after fetch
      }
    };

    fetchAllCountries();
  }, []);

  const searchCountries = useCallback((searchValue) => {
    setSearchInput(searchValue);
    if (searchValue) {
      const filteredCountries = countries.filter((country) =>
        Object.values(country).join("").toLowerCase().includes(searchValue.toLowerCase())
      );
      setFiltered(filteredCountries);
    } else {
      setFiltered(countries);
    }
  }, [countries]);

  return (
    <>
      {isLoading ? (
        <h1 className="flex items-center justify-center h-screen text-4xl uppercase tracking-widest text-gray-900 dark:text-white lg:text-7xl font-bold">
          Loading...
        </h1>
      ) : (
        <>
          <div className="pt-32">
            <Filter
              searchCountries={searchCountries}
              searchInput={searchInput}
              setCountries={setCountries}
              selectedRegion={selectedRegion}
              setSelectedRegion={setSelectedRegion}
            />
          </div>
          <section className="grid grid-cols-1 gap-5 p-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 2xl:container 2xl:mx-auto">
            {filtered.map((country) => (
              <Link to={`/${country.capital}`} key={country.cca3}> {/* Unique key */}
                <article className="bg-white rounded shadow p-5 dark:bg-gray-800 dark:hover:bg-gray-700 hover:bg-gray-100 transition-all duration-300">
                  <h2 className="font-bold text-gray-900 text-2xl mb-3 dark:text-white">{country.name.common}</h2>
                  <ul>
                    <li className="dark:text-white text-gray-900">Capital: {country.capital ? country.capital : 'N/A'}</li>
                    <li className="dark:text-white text-gray-900">Region: {country.region}</li>
                  </ul>
                </article>
              </Link>
            ))}
          </section>
        </>
      )}
    </>
  );
}