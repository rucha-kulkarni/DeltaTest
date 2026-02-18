import ConfirmModal from "./components/ConfirmModal";

import { useEffect, useState } from "react";
import UserForm from "./components/UserForm";
import UserTable from "./components/UserTable";
import {
  getUsers,
  addUser,
  updateUser,
  deleteUser
} from "./api";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

function App() {
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getUsers();
      setUsers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (user) => {
    try {
      setLoading(true);
      setError("");

      if (editingUser) {
        const updated = await updateUser(editingUser.id, user);
        setUsers((prev) =>
          prev.map((u) => (u.id === updated.id ? updated : u))
        );
        setEditingUser(null);
      } else {
        const created = await addUser(user);
        setUsers((prev) => [...prev, created]);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
  };


const handleDeleteClick = (user) => {
  setDeleteTarget(user);
};

const confirmDelete = async () => {
  if (!deleteTarget?.id) return;
  try {
    setLoading(true);
    await deleteUser(deleteTarget.id);

    setUsers((prev) =>
      prev.filter((u) => u.id !== deleteTarget.id)
    );
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
    setDeleteTarget(null);
  }
};


  return (
    <div className="container mt-4">
      <h2 className="mb-3">User Management</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <UserForm
        onSave={handleSave}
        editingUser={editingUser}
        onCancel={() => setEditingUser(null)}
      />

      {loading ? (
        <div className="text-muted">Loading...</div>
      ) : (
        <UserTable
          users={users}
          onEdit={handleEdit}
          onDelete={handleDeleteClick}
        />
      )}
      <ConfirmModal
        show={!!deleteTarget}
        title="Delete User"
        message={`Are you sure you want to delete ${deleteTarget?.firstName + " " + deleteTarget?.lastName}?`}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />

    </div>
    
  );
}

export default App;
