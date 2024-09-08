import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Filter from "./Filter";

export default function Countries() {
  const [countries, setCountries] = useState([]); // Initialize as an empty array
  const [filtered, setFiltered] = useState([]);   // Initialize as an empty array
  const [searchInput, setSearchInput] = useState(""); // Initialize as an empty string
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await fetch(`http://api.countrylayer.com/v3.1/all?access_key=${process.env.REACT_APP_ACCESS_KEY}`);
        const data = await res.json();

        if (Array.isArray(data)) { // Check if the data is an array
          setCountries(data);
          setFiltered(data); // Initialize filtered with all countries
        } else {
          console.error("Unexpected response format:", data);
        }

        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch countries data", error);
        setIsLoading(false);
      }
    };

    fetchCountries();
  }, []);

  const searchCountries = (searchValue) => {
    setSearchInput(searchValue);

    if (searchValue) {
      const filteredCountries = countries.filter((country) =>
        Object.values(country).join("").toLowerCase().includes(searchValue.toLowerCase())
      );
      setFiltered(filteredCountries);
    } else {
      setFiltered(countries);
    }
  };

  return (
    <>
      {isLoading ? (
        <h1 className="flex items-center justify-center h-screen text-4xl uppercase tracking-widest text-gray-900 dark:text-white lg:text-7xl font-bold">
          Loading...
        </h1>
      ) : (
        <>
          <div className="pt-32">
            <Filter searchCountries={searchCountries} searchInput={searchInput} setCountries={setCountries} />
          </div>
          <section className="grid grid-cols-1 gap-5 p-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 2xl:container 2xl:mx-auto">
            {filtered.map(({ name, capital, region }) => (
              <Link to={`/${capital}`} key={name}>
                <article className="bg-white rounded shadow p-5 dark:bg-gray-800 dark:hover:bg-gray-700 hover:bg-gray-100 transition-all duration-300">
                  <h2 className="font-bold text-gray-900 text-2xl mb-3 dark:text-white">{name}</h2>
                  <ul>
                    <li className="dark:text-white text-gray-900">Capital: {capital}</li>
                    <li className="dark:text-white text-gray-900">Region: {region}</li>
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