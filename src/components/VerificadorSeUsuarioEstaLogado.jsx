import { useEffect } from 'react';

export default function VerificadorSeUsuarioEstaLogado({ element }) {
  const userExists = localStorage.getItem("user");

  useEffect(() => {
    // Se o usuário não estiver logado e estiver tentando acessar uma página restrita
    if (!userExists && window.location.pathname !== "/cadastro" && window.location.pathname !== "/home") {
      // Redirecionar para a página de login
      window.location.href = "/login";
    }
  }, [userExists]);

  // Renderizar o componente associado à rota
  return element;
};
