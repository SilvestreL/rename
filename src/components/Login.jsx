// #region imports
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';
// #endregion

const Login = () => {
  //#region states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [resultResponse, setResultResponse] = useState(``);
  const navigate = useNavigate();
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [invalidPassword, setInvalidPassword] = useState(false);
  //#endregion

  //#region GET - pegar usuario da API
  const pegarUsuariosDaApi = async () => {
    try {
      const fetchConfiguration = {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
      };
      const response = await fetch('http://localhost:3000/usuarios', fetchConfiguration);

      if (!response.ok) {
        throw new Error('Erro ao fazer login');
      }
      const users = await response.json()
      return users
      // Tratar a resposta se necessário
    } catch (error) {
      console.error('Erro ao fazer login:', error);
    }
  };
  //#endregion

  //#region - Verificar se email existe, null se nao for encontrado
  const userExists = (email, users) => {
    // Verificar se o email existe na lista de usuários
    const foundUser = users.find(user => user.email === email);

    // Retornar o usuário (foundUser) encontrado ou null se não encontrado
    return foundUser || null;
  };
  //#endregion

  //#region logar
  const Logar = async () => {
    try {
      const users = await pegarUsuariosDaApi();

      const user = userExists(email, users);

      if (user) {
        if (user.password === password) {
          const usuarioString = JSON.stringify({ id: user.id, email: user.email, nome: user.nome });
          localStorage.setItem('user', usuarioString);
          navigate('/selecao');
          return true;
        } else {
          setResultResponse(`Senha Inválida`);
          setInvalidEmail(false); // Esconde a mensagem de e-mail inválido
          setInvalidPassword(true); // Mostra a mensagem de senha inválida
          return false;
        }
      } else {
        setResultResponse(`Este email não existe`);
        setInvalidEmail(true); // Mostra a mensagem de e-mail inválido
        setInvalidPassword(false); // Esconde a mensagem de senha inválida
        return false;
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      setResultResponse('Erro ao fazer login. Por favor, tente novamente.');
      setInvalidEmail(false); // Esconde a mensagem de e-mail inválido
      setInvalidPassword(false); // Esconde a mensagem de senha inválida
      return false;
    }
  };

  //#endregion

  //#region navigate
  const redirectToCadastro = () => {
    navigate('/cadastro');
  };
  //#endregion

  return (
    <div className="LoginContainer">
      <label htmlFor="email_login">
        <input
          className='botaoLogin'
          type="email"
          name="email"
          id="email_login"
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Email'
        />
      </label>

      <label htmlFor="password_login">
        <input
          className='botaoPassword'
          type="password"
          name="password"
          id="password_login"
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Password'
        />
      </label>

      <label htmlFor="entrar">
        <button onClick={Logar}>Entrar</button>
      </label>

      <p style={{ color: 'red', display: invalidEmail ? 'block' : 'none' }}>
        {resultResponse}
      </p>
      <p style={{ color: 'red', display: invalidPassword ? 'block' : 'none' }} id='invalidPasswordErrorMessage'>
        {resultResponse}
      </p>

      <label htmlFor="cadastrar">
        <button onClick={redirectToCadastro}>Cadastrar</button>
      </label>

    </div>
  );
};

export default Login;