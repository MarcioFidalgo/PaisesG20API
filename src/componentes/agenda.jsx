import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/agenda1.css";

export default function Agenda() {
  const navigate = useNavigate();
  const [authorities, setAuthorities] = useState([]);
  const [agendamentos, setAgendamentos] = useState([]);

  useEffect(() => {
    const storedAuthorities =
      JSON.parse(localStorage.getItem("authorities")) || [];
    setAuthorities(storedAuthorities);

    const storedAgendamentos =
      JSON.parse(localStorage.getItem("agendamentos")) || [];
    setAgendamentos(storedAgendamentos);
  }, []);

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div>
      <button id="btnVoltar" onClick={handleBack}>
        Voltar
      </button>


      <div className="agenda1">
        <h1>Autoridades</h1> <br />
        {authorities.length > 0 ? (
          <ul>
            {authorities.map((authority, index) => (
              <li key={index}>
                <strong>{authority.nome}</strong> - {authority.cargo} (
                {authority.pais}) <br />
                <em>{authority.email}</em> <br /> <br />
  
              </li>
              
            ))}
          </ul>
        ) : (
          <p>Nenhuma autoridade cadastrada.</p>
        )}

        
        <div className="agenda2">
          <h1>Agendamentos</h1> <br />
          {agendamentos.length > 0 ? (
            <ul>
              {agendamentos.map((agendamento, index) => (
                <li key={index}>
                  <strong>Data:</strong> {agendamento.data} <br />
                  <strong>Hora:</strong> {agendamento.hora} <br />
                  <strong>Descrição:</strong> {agendamento.descricao} <br />
                  <br />
                </li>
              ))}
            </ul>
          ) : (
            <p>Nenhum agendamento encontrado.</p>
          )}
        </div>
      </div>
    </div>
  );
}
