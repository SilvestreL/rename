import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

export default function Home({ user }) {
  const navigate = useNavigate();
  const [usuarioLogado, setUsuarioLogado] = useState(false);

  useEffect(() => {
    if (user) {
      setUsuarioLogado(true);
      navigate('/selecao');
    }
  }, [user]);


  //#region navigates
  const deslogar = () => {
    localStorage.removeItem('user');
    navigate('/login'); // Corrigido para redirecionar para /login ao deslogar
  };

  const redirectToLogin = () => {
    navigate('/login');
  };

  const redirectToCadastro = () => {
    navigate('/cadastro');
  };
  //#endregion

  return (
    <div className="HomeContainer">
      <button onClick={redirectToLogin}>Login</button>
      <button onClick={redirectToCadastro}>Cadastro de usuário</button>

    </div>
  );
}
