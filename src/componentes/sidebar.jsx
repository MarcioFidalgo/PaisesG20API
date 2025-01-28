import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/sidebar.css";
import Detalhes from "../componentes/paises";

export default function Sidebar() {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [continentFilters, setContinentFilters] = useState({
    Africa: false,
    America: false,
    Asia: false,
    Europa: false,
    Oceania: false,
  });
  const navigate = useNavigate();

  const g20Countries = [
    "Argentina",
    "Australia",
    "Brazil",
    "Canada",
    "China",
    "France",
    "Germany",
    "India",
    "Indonesia",
    "Italy",
    "Japan",
    "Mexico",
    "Russia",
    "Saudi Arabia",
    "South Africa",
    "South Korea",
    "Turkey",
    "United Kingdom",
    "United States",
  ];

  const filterCountries = () => {
    let filtered = countries.filter((country) =>
      g20Countries.includes(country.name.common)
    );

    const selectedContinents = Object.keys(continentFilters).filter(
      (continent) => continentFilters[continent]
    );

    if (selectedContinents.length > 0) {
      filtered = filtered.filter((country) =>
        selectedContinents.includes(getRegionMapping(country.region))
      );
    }

    if (searchTerm) {
      filtered = filtered.filter((country) =>
        country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    filtered = filtered.sort((a, b) => {
      if (a.name.common < b.name.common) {
        return -1;
      }
      if (a.name.common > b.name.common) {
        return 1;
      }
      return 0;
    });

    setFilteredCountries(filtered);
  };

  const getRegionMapping = (region) => {
    const regionMap = {
      Africa: "Africa",
      Americas: "America",
      Asia: "Asia",
      Europe: "Europa",
      Oceania: "Oceania",
    };
    return regionMap[region] || "";
  };

  const handleCountryClick = (country) => {
    setSelectedCountry(country.cca3);
    navigate(`/pais/${country.cca3}`);
  };

  const Pesquisar = (e) => {
    setSearchTerm(e.target.value);
  };

  // const handleCountryClick = (country) => {
  //   navigate(`/pais/${country.cca3}`);
  // };

  const handleContinentChange = (continent) => {
    setContinentFilters((prevFilters) => ({
      ...prevFilters,
      [continent]: !prevFilters[continent],
    }));
  };

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => {
        const g20Data = data.filter((country) =>
          g20Countries.includes(country.name.common)
        );
        setCountries(g20Data);
        setFilteredCountries(g20Data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao buscar dados da API:", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    filterCountries();
  }, [continentFilters, searchTerm, countries]);

  return (
    <div className="sidebar1">
      <div id="eastereeg">
        <input
          id="meuinput"
          placeholder="Pesquise aqui"
          type="text"
          value={searchTerm}
          onChange={Pesquisar}
        />
      </div>

      {Object.keys(continentFilters).map((continent) => (
        <div key={continent}>
          <input
            id="button"
            type="checkbox"
            checked={continentFilters[continent]}
            onChange={() => handleContinentChange(continent)}
          />{" "}
          {continent}
        </div>
      ))}

      {loading ? (
        <p>Carregando...</p>
      ) : (
        <ul id="lista">
          {filteredCountries.map((country, index) => (
            <li
              id="li"
              key={index}
              onClick={() => handleCountryClick(country)}
              className={selectedCountry === country.cca3 ? "selected" : ""}
            >
              <img
                id="bandeiras"
                src={country.flags.png}
                alt={`${country.name.common} flag`}
              />
              {country.name.common}
              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
