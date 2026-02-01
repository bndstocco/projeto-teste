import { useState } from "react";
import Login from "./components/Login";
import UserForm from "./components/UserForm";
import UsersList from "./components/UsersList";

function App() {
  const [logged, setLogged] = useState(!!localStorage.getItem("token"));
  const [selectedUser, setSelectedUser] = useState(null);

  if (!logged) {
    return <Login onLogin={() => setLogged(true)} />;
  }

  const handleSuccess = () => {
    setSelectedUser(null);
  };

  return (
    <div>
      <button onClick={() => { localStorage.removeItem("token"); setLogged(false); }}>
        Logout
      </button>
      <UserForm selectedUser={selectedUser} onSuccess={handleSuccess} />
      <UsersList onEdit={setSelectedUser} />
    </div>
  );
}

export default App;
