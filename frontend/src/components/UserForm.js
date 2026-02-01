import { useState, useEffect } from "react";
import api from "../api/api";
import "./UserForm.css";

export default function UserForm({ selectedUser, onSuccess }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Atualiza formulário ao selecionar usuário
  useEffect(() => {
    if (selectedUser) {
      setName(selectedUser.name);
      setEmail(selectedUser.email);
      setPassword(""); // senha não é exibida
    } else {
      // Limpa formulário se não houver usuário selecionado
      setName("");
      setEmail("");
      setPassword("");
    }
  }, [selectedUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (selectedUser) {
        // Atualiza usuário existente
        await api.put(`/users/${selectedUser.id}`, { name, email, password });
      } else {
        // Cria novo usuário
        await api.post("/users", { name, email, password });
      }

      // Limpa formulário
      setName("");
      setEmail("");
      setPassword("");

      // Dispara atualização da lista no componente pai
      onSuccess();
    } catch (err) {
      alert(err.response?.data?.error || "Erro ao salvar usuário");
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form-card">
        <h3>{selectedUser ? "Editar Usuário" : "Novo Usuário"}</h3>
        <input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required={!selectedUser}
        />
        <button type="submit">{selectedUser ? "Atualizar" : "Criar"}</button>
      </form>
    </div>
  );
}
