// #region imports 
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const urlConsultas = "http://localhost:3000/consultas";
import './ListarConsultas.css';
// #endregion

const ListarConsultas = () => {
  const [consultas, setConsultas] = useState([]);
  // #region GET para solicitar consultas
  const requisicaoConsultas = async () => {
    try {
      const response = await fetch(urlConsultas, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status}`);
      }

      const data = await response.json();
      setConsultas(data);
    } catch (error) {
      console.error('Erro ao obter consultas:', error);
    }
  };

  useEffect(() => {
    requisicaoConsultas();
  }, []);
  // #endregion

  //#region logica para transforamar o dia da semana em string
  const diasSemanas = ['Domingo', 'Segunda-Feira', 'Terça-Feira', 'Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira', 'Sábado'];
  const getDiaSemana = (diaSemana) => {
    return diasSemanas[diaSemana] || '';
  };
  // #endregion

  // #region navigate 
  const navigate = useNavigate();
  const redirectToSelecao = () => {
    navigate('/selecao');
  };
  // #endregion
  return (
    <div>
      <h1>Consultas</h1>
      <div>
        {Array.isArray(consultas) &&
          consultas.map((consulta) => (
            <div key={consulta.id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px', borderRadius: '5px' }}>
              <p><strong>Paciente:</strong> {consulta.nome}</p>
              <p><strong>Dia da Semana:</strong> {getDiaSemana(consulta.diaSemana)}</p>
              <p><strong>Médico:</strong> {consulta.medico}</p>
            </div>
          ))}
      </div>
      <button onClick={redirectToSelecao}>
        Voltar
      </button>
    </div>
  );
}

export default ListarConsultas;
