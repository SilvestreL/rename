// #region imports
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CadastroMedico.css';
// #endregion

// #region POST para cadastrra medico (medicoCadastrado)
const enviarApi = async (novoMedico) => {
const url = "http://localhost:3000/medicos";
  const fetchConfiguration = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(novoMedico),
  };
  const res = await fetch(url, fetchConfiguration);
  const medicoCadastrado = await res.json();
};
// #endregion 

const CadastroMedico = () => {
  const [nomeMedico, setNomeMedico] = useState('');
  const [diasAtendimento, setDiasAtendimento] = useState([]);
  const navigate = useNavigate();

  //  #region Lógica para cadastrar médico
  const cadastrarMedico = () => {
    const novoMedico = {
      nomeMedico: nomeMedico,
      diasAtendimento: diasAtendimento,
    };
    // Limpar os campos após cadastrar
    setNomeMedico('');
    setDiasAtendimento([]);
    // enviar para o banco de dados
    enviarApi(novoMedico);
  };
  //#endregion

  // #region logica para dia de atendimento
  const escolherDia = (index) => {
    // Verificar se o dia já está na lista de diasAtendimento
    if (diasAtendimento.includes(index)) {
      // Se estiver, remova-o
      setDiasAtendimento(diasAtendimento.filter((dia) => dia !== index));
    } else {
      // Se não estiver, adicione-o
      setDiasAtendimento([...diasAtendimento, index]);
    }
  };
  // #endregion

    // #region navigate
    const redirectToSelecao = () => {
      navigate('/selecao');
    };
    // #endregion

  return (
    <div className="CadastroMedico">
      <h2 className='h2CadastroMedico'>Cadastrar Médico</h2>

      <div className="inputContainer">
        <label htmlFor="nomeMedico">Nome do Médico</label>
        <input
          className='inputCadastroMedico'
          type="text"
          id="nomeMedico"
          placeholder="Nome do Médico"
          value={nomeMedico}
          onChange={(e) => setNomeMedico(e.target.value)}
        />
      </div>

      <div className="checkboxContainer">
        {["Segunda-Feira", "Terça-Feira", "Quarta-Feira", "Quinta-Feira", "Sexta-Feira", "Sábado", "Domingo"].map((dia, index) => (
          <div key={index} className='divCadastroMedico'>
            <input
              className='inputCadastroMedico'
              type="checkbox"
              name="diasAtendimento"
              value={index}
              checked={diasAtendimento.includes(index)}
              onChange={() => escolherDia(index)}
            />
            <label>{dia}</label>
          </div>
        ))}
      </div>

      <div className="buttonsCadastroMedico">
        <button onClick={cadastrarMedico}>Cadastrar</button>
        <button onClick={redirectToSelecao}>Voltar</button>
      </div>
    </div>
  );
};

export default CadastroMedico;
