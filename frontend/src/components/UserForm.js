import { useState, useEffect } from "react";
import api from "../api/api";

export default function UserForm({ selectedUser, onSuccess }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (selectedUser) {
      setName(selectedUser.name);
      setEmail(selectedUser.email);
      setPassword("");
    }
  }, [selectedUser]);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      if (selectedUser) {
        await api.put(`/users/${selectedUser.id}`, { name, email, password });
      } else {
        await api.post("/users", { name, email, password });
      }
      setName("");
      setEmail("");
      setPassword("");
      onSuccess();
    } catch (err) {
      alert(err.response?.data?.error || "Erro ao salvar usuário");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>{selectedUser ? "Editar Usuário" : "Novo Usuário"}</h3>
      <input
        type="text"
        placeholder="Nome"
        value={name}
        onChange={e => setName(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Senha"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required={!selectedUser}
      />
      <button type="submit">{selectedUser ? "Atualizar" : "Criar"}</button>
    </form>
  );
}
