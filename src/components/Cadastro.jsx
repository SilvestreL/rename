// #region inputs
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './cadastro.css';
// #endregion

// #region enviando dados para api POST - retornando usuariocadastrado

//#region POST - api
const enviarApi = async (novoUsuario) => {
  const url = "http://localhost:3000/usuarios"
  const fetchConfiguration = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(novoUsuario),
  };

  const res = await fetch(url, fetchConfiguration);
  const usuarioCadastrado = await res.json();

  return usuarioCadastrado;
};
// #endregion

// #region states
const Cadastro = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mensagem, setMensagem] = useState('');
  const navigate = useNavigate();
  const url = "http://localhost:3000/usuarios";
  //#endregion

  // #region os dados que serao cadastrados nome / email / password
  const cadastrarUsuario = async () => {
    // Verificar se todos os campos estão preenchidos
    if (!nome || !email || !password) {
      setMensagem('Por favor, preencha todos os campos.');
      return;
    }

    // Checar se o email já existe
    const usuarios = await fetch(url).then((res) => res.json());
    const emailExiste = usuarios.some((usuario) => usuario.email === email);

    if (emailExiste) {
      setMensagem('Este email já está cadastrado. Tente outro.');
      return;
    }

    // Limpar os campos após cadastrar
    setNome('');
    setEmail('');
    setPassword('');
    setMensagem('');

    // Enviar para o banco de dados
    const novoUsuario = {
      nome: nome,
      email: email,
      password: password,
    };

    const usuarioCadastrado = await enviarApi(novoUsuario);

    if (usuarioCadastrado) {
      setMensagem('Usuário cadastrado com sucesso!');
      // Redirecionar para a tela de login após um tempo (2 segundos)
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    }
  };
  //#endregion

  // #region navigates
  const redirectToLogin = () => {
    navigate('/login');
  };
  // #endregion

  return (
    <div>
      <label htmlFor="nome_id">
        <input
          type="text"
          name="nome"
          id="nome_id"
          onChange={(e) => setNome(e.target.value)}
          placeholder='Nome'
        />
      </label>

      <label htmlFor="email_id">
        <input
          type="email"
          name="email"
          id="email_id"
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Email'
        />
      </label>

      <label htmlFor="password_id">
        <input
          type="password"
          name="password"
          id="password_id"
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Password'
        />
      </label>

      <label htmlFor="cadastrar">
        <button onClick={cadastrarUsuario}>Cadastrar Usuário</button>
      </label>

      <p style={{ color: 'red' }}>{mensagem}</p>

      <label htmlFor="voltarLogin">
        <button onClick={redirectToLogin}>Voltar</button>
      </label>
    </div>
  );
};

export default Cadastro;