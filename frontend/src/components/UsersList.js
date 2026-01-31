import { useEffect, useState } from "react";
import api from "../api/api";

export default function UsersList({ onEdit }) {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    try {
      const res = await api.get("/users");
      setUsers(res.data);
    } catch (err) {
      setError(err.response?.data?.error || "Erro ao buscar usuários");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Deseja realmente deletar?")) return;
    try {
      await api.delete(`/users?id=${id}`);
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
      <h2>Usuários</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} ({user.email}){" "}
            <button onClick={() => onEdit(user)}>Editar</button>{" "}
            <button onClick={() => handleDelete(user.id)}>Deletar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
