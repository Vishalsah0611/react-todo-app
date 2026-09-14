import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchUsers, deleteUser } from "../../api/users";

const LIMIT = 10;

export default function UsersList() {
  const [users, setUsers] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const totalPages = Math.ceil(total / LIMIT);

  useEffect(() => {
    loadUsers();
  }, [page]);

  async function loadUsers() {
    setLoading(true);
    setError("");

    try {
      const data = await fetchUsers(page, LIMIT);
      setUsers(data?.users ?? []);
      setTotal(data.total);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this user?")) return;

    try {
      await deleteUser(id);
      setUsers((prev) => prev.filter((user) => user.id !== id));
    } catch (err) {
      alert(err.message);
    }
  }

  function goToPage(p) {
    if (p < 1 || p > totalPages) return;
    setPage(p);
  }

  return (
    <div className="users-page">
      <div className="users-header">
        <h1>Users</h1>
        <Link to="/users/add" className="add-button users-add-link">
          + Add User
        </Link>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="empty-text">{error}</p>
      ) : (
        <>
          <div className="table-scroll">
            <table className="user-table">
              <thead>
                <tr>
                  <th>Photo</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Age</th>
                  <th>Phone</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>
                      <img
                        src={user.image}
                        alt={user.firstName}
                        className="user-avatar"
                      />
                    </td>
                    <td>
                      {user.firstName} {user.lastName}
                    </td>
                    <td>{user.email}</td>
                    <td>{user.age}</td>
                    <td>{user.phone}</td>
                    <td>
                      <div className="table-actions">
                        <Link to={`/users/${user.id}`} className="view-button">
                          View
                        </Link>
                        <Link to={`/users/${user.id}/edit`} className="edit-button">
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(user.id)}
                          className="delete-button"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="pagination">
            <button onClick={() => goToPage(page - 1)} disabled={page === 1}>
              Prev
            </button>

            <span className="pagination-info">
              Page {page} of {totalPages}
            </span>

            <button onClick={() => goToPage(page + 1)} disabled={page === totalPages}>
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}