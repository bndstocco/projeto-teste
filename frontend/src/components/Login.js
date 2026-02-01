import { useState } from "react";
import api from "../api/api";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await api.post("/login", { email, password });
      localStorage.setItem("token", res.data.token);
      onLogin();
    } catch (err) {
      alert(err.response?.data?.error || "Erro no login");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Login</h3>
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
        required
      />
      <button type="submit">Entrar</button>
    </form>
  );
}
