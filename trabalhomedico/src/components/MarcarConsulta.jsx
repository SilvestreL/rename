//#region imports
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './MarcarConsulta.css';
//#endregion

// #region URLs
const urlMedicos = "http://localhost:3000/medicos";
const urlConsultas = "http://localhost:3000/consultas";
//#endregion

const MarcarConsulta = () => {
  // #region States
  const [medicos, setMedicos] = useState([]);
  const [diaSemana, setDiaSemana] = useState('');
  const [medicosDisponiveisParaODia, setMedicosDisponiveisParaODia] = useState([]);
  const [medicoSelecionado, setMedicoSelecionado] = useState({});
  const [nome, setNome] = useState('');
  //#endregion

  // #region dias da semana
  const getNomeDiaSemana = (dia) => {
    const diasSemana = ['Domingo', 'Segunda-Feira', 'Terça-Feira', 'Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira', 'Sábado'];
    return diasSemana[dia];
  };
  //#endregion

  //#region - requisicao para obter medicos setmedicos
  useEffect(() => {
    fetch(urlMedicos)
      .then((response) => response.json())
      .then((data) => setMedicos(data))
      .catch((error) => console.error('Erro ao obter médicos:', error));
  }, []);
  //#endregion

  //#region obter medicos disponiveis com base no dia da semana
  useEffect(() => {
    let medicosDisponiveis = [];
    for (let medico of medicos) {
      for (let diaDaSemana of medico.diasAtendimento) {
        if (diaDaSemana == diaSemana) {
          medicosDisponiveis.push({
            id: medico.id,
            nome: medico.nomeMedico,
          });
        }
      }
    }
    setMedicosDisponiveisParaODia(medicosDisponiveis);
  }, [diaSemana, medicos]);
  //#endregion

  //#region marcar consulta
  const marcarConsulta = async () => {
    if (medicoSelecionado && medicoSelecionado.id) {
      // nova consulta: diadasemana, medicoid, medico, nome
      const novaConsulta = {
        diaSemana: diaSemana.toLowerCase(),
        medicoID: medicoSelecionado.id.toString().toLowerCase(),
        medico: medicoSelecionado.nomeMedico,
        nome
      };

      try {
        const res = await fetch(urlConsultas, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(novaConsulta),
        });

        if (res.ok) {
          const nomeDiaSemana = getNomeDiaSemana(diaSemana);
          alert(`Consulta marcada para ${nomeDiaSemana} (${diaSemana}) com o Dr(a). ${medicoSelecionado.nomeMedico}`);

          // Resetar os estados dos inputs
          setDiaSemana('');
          setMedicoSelecionado({});
          setNome('');
        } else {
          alert('Erro ao marcar a consulta:', res.status, res.statusText);
        }
      } catch (error) {
        console.error('Erro ao marcar a consulta:', error);
      }
    } else {
      alert('Por favor, selecione um médico antes de marcar a consulta.');
    }
  };
  //#endregion
  //#region  navigate
  const navigate = useNavigate();
  const redirectToSelecao = () => {
    navigate('/selecao');
  };
  //#endregion

  return (
    <div className='marcarconsulta'>
      <h2>Marcar Consulta</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1em', margin: '1em' }}>
        <label>
          Dia da Semana:
          <select value={diaSemana} onChange={(e) => setDiaSemana(e.target.value)}>
            <option value="">Selecione o dia</option>
            <option value={0}>Domingo</option>
            <option value={1}>Segunda-Feira</option>
            <option value={2}>Terça-Feira</option>
            <option value={3}>Quarta-Feira</option>
            <option value={4}>Quinta-Feira</option>
            <option value={5}>Sexta-Feira</option>
            <option value={6}>Sábado</option>
          </select>
        </label>

        <div>
          {medicosDisponiveisParaODia.length > 0 && (
            <label>
              Médico:
              <select
                value={medicoSelecionado ? medicoSelecionado.id : ''}
                onChange={(e) => setMedicoSelecionado(medicos.find((medico) => medico.id === Number(e.target.value)))}
              >
                <option value="">Selecione o médico</option>
                {medicosDisponiveisParaODia.map((medico) => (
                  <option key={medico.id} value={medico.id}>
                    {medico.nome}
                  </option>
                ))}
              </select>
            </label>
          )}
        </div>

        <div>
          <label htmlFor="nomePaciente">
            Paciente:
            <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} id='nome' />
          </label>
        </div>
      </div>

      <button onClick={marcarConsulta} disabled={!medicoSelecionado} id='marcarconsultas'>
        Marcar Consulta
      </button>
      <br /> <br />

      <button onClick={redirectToSelecao}>
        Voltar
      </button>
    </div>
  );
};

export default MarcarConsulta;
