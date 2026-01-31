import { useState } from "react";
import UsersList from "../components/UsersList";
import UserForm from "../components/UserForm";

export default function UsersPage() {
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <div>
      <UserForm
        selectedUser={selectedUser}
        onSuccess={() => setSelectedUser(null)}
      />
      <UsersList onEdit={(user) => setSelectedUser(user)} />
    </div>
  );
}
