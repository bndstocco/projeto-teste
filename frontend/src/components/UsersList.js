import { useEffect, useState } from "react";
import api from "../api/api";

export default function UsersList({ onEdit }) {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const res = await api.get("/users");
      setUsers(res.data);
    } catch (err) {
      alert(err.response?.data?.error || "Erro ao listar usuários");
    }
  };

  const handleDelete = async id => {
    if (!window.confirm("Deseja realmente deletar?")) return;
    try {
      await api.delete(`/users/${id}`);
      fetchUsers();
    } catch (err) {
      alert(err.response?.data?.error || "Erro ao deletar usuário");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h3>Lista de Usuários</h3>
      <ul>
        {users.map(u => (
          <li key={u.id}>
            {u.name} ({u.email})
            <button onClick={() => onEdit(u)}>Editar</button>
            <button onClick={() => handleDelete(u.id)}>Deletar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
