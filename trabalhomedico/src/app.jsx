//#region imports
import React, { useEffect, useState } from 'react';
import './app.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// components
import Cadastro from './components/Cadastro';
import Login from './components/Login';
import CadastroMedico from './components/CadastroMedico';
import Selecao from './components/Selecao';
import MarcarConsulta from './components/MarcarConsulta';
import Home from './components/Home';
import VerificadorSeUsuarioEstaLogado from './components/VerificadorSeUsuarioEstaLogado';
import ListarConsultas from './components/ListarConsultas';
//#endregion

export function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userFromLocalStorage = localStorage.getItem('user');

    if (userFromLocalStorage) {
      const userObject = JSON.parse(userFromLocalStorage);
      setUser(userObject);
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home user={user} />} />
        <Route path="/home" element={<Home user={user} />} />
        <Route path="/login" element={<Login />} />

        {/* Rotas que usuario precisa estar logado */}
        <Route path="/cadastro" element={<VerificadorSeUsuarioEstaLogado element={<Cadastro />} />} />
        <Route path="/listarconsultas" element={<VerificadorSeUsuarioEstaLogado element={<ListarConsultas />} />} />
        <Route path="/cadastromedico" element={<VerificadorSeUsuarioEstaLogado element={<CadastroMedico />} />} />
        <Route path="/marcarconsulta" element={<VerificadorSeUsuarioEstaLogado element={<MarcarConsulta />} />} />
        <Route path="/selecao" element={<VerificadorSeUsuarioEstaLogado element={<Selecao />} />} />
        {/* Adicione outras rotas conforme necessário */}
      </Routes>
    </BrowserRouter>
  );
}
