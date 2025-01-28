import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/form.css";

export default function Form() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nome: "",
    cargo: "",
    pais: "",
    email: "",
  });

  const [agendamentoData, setAgendamentoData] = useState({
    data: "",
    hora: "",
    descricao: "",
  });

  const [error, setError] = useState("");

  const paises = [
    { name: "Argentina", code: "ARG", tld: ".ar" },
    { name: "Australia", code: "AUS", tld: ".au" },
    { name: "Brazil", code: "BRA", tld: ".br" },
    { name: "Canada", code: "CAN", tld: ".ca" },
    { name: "China", code: "CHN", tld: ".cn" },
    { name: "France", code: "FRA", tld: ".fr" },
    { name: "Germany", code: "DEU", tld: ".de" },
    { name: "India", code: "IND", tld: ".in" },
    { name: "Indonesia", code: "IDN", tld: ".id" },
    { name: "Italy", code: "ITA", tld: ".it" },
    { name: "Japan", code: "JPN", tld: ".jp" },
    { name: "Mexico", code: "MEX", tld: ".mx" },
    { name: "Russia", code: "RUS", tld: ".ru" },
    { name: "Saudi Arabia", code: "SAU", tld: ".sa" },
    { name: "South Africa", code: "ZAF", tld: ".za" },
    { name: "South Korea", code: "KOR", tld: ".kr" },
    { name: "Turkey", code: "TUR", tld: ".tr" },
    { name: "United Kingdom", code: "GBR", tld: ".uk" },
    { name: "United States", code: "USA", tld: ".us" },
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAgendamentoChange = (e) => {
    setAgendamentoData({
      ...agendamentoData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const selectedCountry = paises.find((pais) => pais.code === formData.pais);
    const expectedTld = selectedCountry ? selectedCountry.tld : "";

    if (!expectedTld) {
      setError("Por favor, selecione um país válido.");
      return;
    }

    const emailRegex = new RegExp(
      `^[a-zA-Z0-9._%+-]+@gmail\\.com${expectedTld.replace(".", "\\.")}$`
    );

    if (!emailRegex.test(formData.email)) {
      setError(`Faltou o TLD "${expectedTld}".`);
      return;
    }

    setError("");

    const storedAuthorities =
      JSON.parse(localStorage.getItem("authorities")) || [];
    storedAuthorities.push(formData);
    localStorage.setItem("authorities", JSON.stringify(storedAuthorities));

    navigate(`/pais/${formData.pais}`, { state: formData });
  };

  const handleAgendamentoSubmit = (e) => {
    e.preventDefault();

    const storedAgendamentos =
      JSON.parse(localStorage.getItem("agendamentos")) || [];
    storedAgendamentos.push(agendamentoData);
    localStorage.setItem("agendamentos", JSON.stringify(storedAgendamentos));

    console.log("Agendamento submetido:", agendamentoData);
  };

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div>
      <button id="btnVoltar" onClick={handleBack}>
        Voltar
      </button>
      <div className="formulario1">
        <form name="meu_form" onSubmit={handleSubmit}>
          <h2>Cadastro de Autoridade</h2> <br />
          <label htmlFor="nome">Autoridade</label>
          <input
            type="text"
            id="nomeid"
            placeholder="autoridade"
            required="required"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
          />
          <label htmlFor="cargo">Cargo</label>
          <br />
          <select name="cargo" value={formData.cargo} onChange={handleChange}>
            <option value="">Selecione o cargo</option>
            <option value="Chefe de estado">Chefe de estado</option>
            <option value="Ministro">Ministro</option>
            <option value="Presidente do banco">Presidente do banco</option>
          </select>
          <br />
          <label htmlFor="fone">País</label>
          <br />
          <select
            id="foneid"
            name="pais"
            value={formData.pais}
            onChange={handleChange}
            required
          >
            <option value="">Selecione o país</option>
            {paises.map((pais) => (
              <option key={pais.code} value={pais.code}>
                {pais.name}
              </option>
            ))}
          </select>
          <br />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="emailid"
            required="required"
            placeholder="lula@gmail.com"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {error && <p style={{ color: "red" }}>{error}</p>}
          <input
            type="submit"
            className="enviar"
            value="Cadastrar Autoridade"
          />
        </form>
      </div>

      <div className="formulario2">
        <form name="agendamento_form" onSubmit={handleAgendamentoSubmit}>
          <h2>Agendamento</h2>
          <br />
          <label htmlFor="data">Data</label>
          <input
            type="date"
            id="dataid"
            required="required"
            name="data"
            value={agendamentoData.data}
            onChange={handleAgendamentoChange}
          />
          <br />
          <label htmlFor="hora">Hora</label>
          <input
            type="time"
            id="horaid"
            required="required"
            name="hora"
            value={agendamentoData.hora}
            onChange={handleAgendamentoChange}
          />
          <br />
          <label htmlFor="descricao">Descrição</label>
          <textarea
            id="descricaoid"
            required="required"
            placeholder="Descrição uau"
            name="descricao"
            value={agendamentoData.descricao}
            onChange={handleAgendamentoChange}
          />
          <br />
          <input type="submit" className="enviar" value="Agendar" />
        </form>
      </div>
    </div>
  );
}
