export default function Filter({ searchCountries, searchInput, setCountries }) {
  const regions = ["Oceania", "Europe", "Asia", "Africa", "Americas"];

  const fetchCountryByRegion = async (region) => {
    try {
      const regionName = region.toLowerCase(); // Convert the region name to lowercase
      const res = await fetch(`http://api.countrylayer.com/v3.1/region/${regionName}?access_key=${process.env.REACT_APP_ACCESS_KEY}`);
      const data = await res.json();
  
      if (Array.isArray(data)) {
        searchCountries(""); // Clear the search input if a region is selected
        setCountries(data);
      } else {
        console.error("Unexpected response format:", data);
        setCountries([]); // Reset countries if the response is not as expected
      }
    } catch (error) {
      console.error("Failed to fetch countries by region", error);
      setCountries([]); // Reset countries on error
    }
  };

  return (
    <div className="flex items-start justify-between flex-col md:flex-row md:items-center md:justify-between 2xl:container 2xl:mx-auto">
      <input
        type="search"
        name="search"
        id="search"
        placeholder="Search by country name"
        value={searchInput}
        onChange={(e) => searchCountries(e.target.value)}
        className="py-2 px-4 rounded shadow placeholder-gray-900 ml-5 lg:w-1/2 w-full"
        autoComplete="off"
      />

      <select
        name="select"
        id="select"
        className="py-2 px-4 rounded shadow ml-5 md:mr-5 md:ml-0"
        onChange={(e) => fetchCountryByRegion(e.target.value)}
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