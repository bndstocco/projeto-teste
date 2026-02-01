import { useState } from "react";
import Login from "./components/Login";
import UserForm from "./components/UserForm";
import UsersList from "./components/UsersList";

function App() {
  const [logged, setLogged] = useState(!!localStorage.getItem("token"));
  const [selectedUser, setSelectedUser] = useState(null);
  const [updateList, setUpdateList] = useState(0); // contador para atualizar lista

  // Se não estiver logado, mostra apenas o login
  if (!logged) {
    return <Login onLogin={() => setLogged(true)} />;
  }

  // Função chamada quando um usuário é criado, editado ou deletado
  const handleSuccess = () => {
    setSelectedUser(null);          // limpa seleção do formulário
    setUpdateList(prev => prev + 1); // força atualização da lista
  };

  // Função para selecionar usuário para edição
  const handleEdit = (user) => {
    setSelectedUser(user);         // seleciona usuário e preenche o formulário
  };

  return (
    <div>
      <header style={{
        display: "flex",
        justifyContent: "flex-end",
        padding: "20px"
      }}>
        <button
          onClick={() => {
            localStorage.removeItem("token");
            setLogged(false);
          }}
          style={{
            backgroundColor: "#e74c3c",
            color: "#fff",
            border: "none",
            padding: "10px 20px",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
            transition: "background-color 0.3s"
          }}
          onMouseEnter={e => e.target.style.backgroundColor = "#c0392b"}
          onMouseLeave={e => e.target.style.backgroundColor = "#e74c3c"}
        >
          Logout
        </button>
      </header>

      <UserForm selectedUser={selectedUser} onSuccess={handleSuccess} />
      <UsersList onEdit={handleEdit} updateTrigger={updateList} />
    </div>
  );
}

export default App;
