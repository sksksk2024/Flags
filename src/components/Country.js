import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

export default function Country() {
  const [country, setCountry] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { capital } = useParams();

  useEffect(() => {
    const fetchCountryData = async () => {
      try {
        const res = await fetch(`https://restcountries.com/v3.1/capital/${capital}`);
        const data = await res.json();

        if (data && Array.isArray(data)) {
          setCountry(data[0]);  // Select the first country from the response
        }
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to fetch country data', error);
        setIsLoading(false);
      }
    };

    if (capital) {
      fetchCountryData();
    }
  }, [capital]);

  return (
    <>
      {isLoading ? (
        <h1 className="flex items-center justify-center h-screen text-4xl uppercase tracking-widest text-gray-900 dark:text-white lg:text-7xl font-bold">
          Loading...
        </h1>
      ) : (
        <section className="pt-32 xl:max-w-7xl xl:mx-auto px-5 xl:px-0 h-screen">
          <Link to="/" className="bg-blue-500 pt-2 pb-3 pl-4 pr-6 rounded shadow text-white font-bold tracking-wide animate-pulse">
            &larr; Back
          </Link>
          {country && (
            <article>
              <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white mt-10 mb-5">
                {country.name.common}, <span className="font-light text-2xl lg:text-4xl">{country.capital}</span>
              </h2>
              <ul>
                <li className="text-gray-900 dark:text-white lg:text-lg">Region: {country.region}</li>
                <li className="text-gray-900 dark:text-white lg:text-lg">Top Level Domain: {country.tld}</li>
              </ul>
            </article>
          )}
        </section>
      )}
    </>
  );
}