import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../css/paises.css";

export default function Detalhes() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [country, setCountry] = useState(null);
  const location = useLocation();
  const formData = location.state; 

  useEffect(() => {
    fetch(`https://restcountries.com/v3.1/alpha/${id}`)
      .then((response) => response.json())
      .then((data) => setCountry(data[0]))
      .catch((error) => console.error("Erro ao buscar país:", error));
  }, [id]);

  if (!country) return <p>Carregando...</p>;

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div>
      <button id="btnVoltar" onClick={handleBack}>
        Voltar
      </button>
      <div id="base1">
        <h3 id="titulo">{country.name.common}</h3>
        <img
          id="bandeiraDetalhe"
          src={country.flags.png}
          alt={`Bandeira de ${country.name.common}`}
        />
        <br/>
        <p>
          <strong>Capital:</strong> {country.capital?.[0] || "N/A"}
        </p>
        <p>
          <strong>Região:</strong> {country.region}
        </p>
        <p>
          <strong>População:</strong> {country.population} habitantes
        </p>
        <p>
          <strong>Área:</strong> {country.area} km²
        </p>

        <div id="formData">
          <p>
            <strong>Autoridade:</strong> {formData?.nome}
          </p>
          <p>
            <strong>Cargo:</strong> {formData?.cargo}
          </p>
          <p>
            <strong>Email:</strong> {formData?.email}
          </p>
        </div>
      </div>
    </div>
  );
}
