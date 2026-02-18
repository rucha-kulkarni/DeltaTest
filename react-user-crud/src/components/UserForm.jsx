import { useEffect, useState } from "react";
import { userFields } from "../userFields";

const emptyForm = {
  firstName: "",
  lastName: "",
  email: "",
  phone: ""
};

function UserForm({ onSave, editingUser, onCancel }) {
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (editingUser) {
      setForm(editingUser); // keep server id
    } else {
      setForm(emptyForm);
    }
  }, [editingUser]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);

    if (!editingUser) {
      setForm(emptyForm);
    }
  };

  return (
    <form className="card p-3 mb-4" onSubmit={handleSubmit}>
     <h5 className="mb-3 d-flex align-items-center gap-2">
      <i
        className={`bi ${
          editingUser ? "bi-pencil-square" : "bi-person-plus-fill"
        }`}
      ></i>
      {editingUser ? "Edit User" : "Add User"}
     </h5>

      
    <div className="row">
      {userFields.map((field) => (
        <div className="col-md-6 mb-2" key={field.name}>
          <input
            name={field.name}
            type={field.type}
            className="form-control"
            placeholder={field.label}
            value={form[field.name] || ""}
            onChange={handleChange}
            required
          />
        </div>
      ))}
    </div>


      <div className="mt-3">
        <button className="btn btn-success me-2" type="submit">
          <i
            className={`bi ${
              editingUser ? "bi-check-circle" : "bi-plus-circle"
            } me-1`}
          ></i>
          {editingUser ? "Update" : "Create"}
        </button>

        {editingUser && (
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={onCancel}
          >
            <i className="bi bi-x-circle me-1"></i>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default UserForm;
