import { useEffect, useState } from "react";
import api from "../api/api";
import "./UsersList.css";

export default function UsersList({ onEdit, updateTrigger }) {
  const [users, setUsers] = useState([]);

  // Função para buscar usuários
  const fetchUsers = async () => {
    try {
      const res = await api.get("/users");
      setUsers(res.data);
    } catch (err) {
      alert(err.response?.data?.error || "Erro ao listar usuários");
    }
  };

  // Deleta usuário e atualiza lista local
  const handleDelete = async (id) => {
    if (!window.confirm("Deseja realmente deletar este usuário?")) return;
    try {
      await api.delete(`/users/${id}`);
      // Atualiza lista local sem refetch
      setUsers(users.filter((u) => u.id !== id));
    } catch (err) {
      alert(err.response?.data?.error || "Erro ao deletar usuário");
    }
  };

  // Executa fetch quando o componente monta e sempre que updateTrigger mudar
  useEffect(() => {
    fetchUsers();
  }, [updateTrigger]);

  return (
    <div className="list-container">
      <h3>Lista de Usuários</h3>
      <ul className="user-list">
        {users.map((u) => (
          <li key={u.id}>
            <div className="user-info">
              <span className="user-name">{u.name}</span>
              <span className="user-email">{u.email}</span>
            </div>
            <div className="user-actions">
              <button className="edit" onClick={() => onEdit(u)}>
                Editar
              </button>
              <button className="delete" onClick={() => handleDelete(u.id)}>
                Deletar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
