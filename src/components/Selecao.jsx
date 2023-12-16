// #region imports
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// #endregion imports

// #region states / url 
const Selecao = ({ user }) => {
  const navigate = useNavigate();
  const url = "http://localhost:3000/usuarios";
  const [nomeSalvo, setNomeSalvo] = useState("");
  // #endregion

  // #region Redirecionamentos
  const redirectToCadastroMedico = () => {
    navigate('/cadastromedico');
  };
  const redirectToMarcarConsulta = () => {
    navigate('/marcarconsulta');
  };
  const redirectToListarConsultas = () => {
    navigate('/listarconsultas');
  };
  const deslogar = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  // #endregion Redirecionamentos

  // #region buscar dados armazenados no localstorage para pegar o nome exibir
  useEffect(() => {
    // Obtendo dados do localStorage ao montar o componente
    const usuarioString = localStorage.getItem('user');

    // Verificando se os dados existem antes de definir o estado
    if (usuarioString !== null) {
      // Convertendo a string JSON para objeto
      const usuario = JSON.parse(usuarioString);

      // Capitalizando a primeira letra do nome
      const nomeCapitalizado = capitalizeFirstLetter(usuario.nome);

      // Definindo o nome capitalizado no estado
      setNomeSalvo(nomeCapitalizado);
    }
  }, []);

  // Função para capitalizar a primeira letra de uma string
  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  //#endregion

  return (
    <div className="Selecao">
      <h2>Bem-vindo {nomeSalvo}</h2>
      <button onClick={redirectToCadastroMedico}>Cadastrar Médico</button>
      <button onClick={redirectToMarcarConsulta}>Marcar Consulta</button>
      <button onClick={redirectToListarConsultas}>Listar Consultas</button>
      <button onClick={deslogar}>Deslogar</button>
    </div>
  );
};

export default Selecao;
