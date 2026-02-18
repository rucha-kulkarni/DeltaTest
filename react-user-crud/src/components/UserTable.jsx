import { userFields } from "../userFields";

function UserTable({ users, onEdit, onDelete }) {
  if (users.length === 0) {
    return (
      <div className="card p-5 text-center text-muted">
        <i className="bi bi-people fs-1 mb-3"></i>
        <p className="mb-0">No users found. Add a user to get started.</p>
      </div>
    );
  }

  return (
    <table className="table table-bordered">
      <thead>
        <tr>
          <th>#</th>
          {userFields.map((f) => (
            <th key={f.name}>{f.label}</th>
          ))}
          <th className="text-center">Actions</th>
        </tr>
      </thead>

      <tbody>
        {users.map((user, index) => (
          <tr key={user.id}>
            <td>{index + 1}</td>

            {userFields.map((f) => (
              <td key={f.name}>{user[f.name]}</td>
            ))}

            <td className="text-center">
              <button
                className="btn btn-sm btn-outline-warning me-2"
                title="Edit user"
                onClick={() => onEdit(user)}
              >
                <i className="bi bi-pencil"></i>
              </button>

              <button
                className="btn btn-sm btn-outline-danger"
                title="Delete user"
                onClick={() => onDelete(user)}   
              >
                <i className="bi bi-trash"></i>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default UserTable;
