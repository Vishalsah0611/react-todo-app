import { useState, useEffect } from "react";
import { fetchUsers } from "../api/users";

const LIMIT = 10;

export default function Users() {
  const [users, setUsers] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [pageInput, setPageInput] = useState("");

  const totalPages = Math.ceil(total / LIMIT);

  useEffect(() => {
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

    loadUsers();
  }, [page]);

  function goToPage(p) {
    if (p < 1 || p > totalPages) return;
    setPage(p);
  }

  function handleJumpToPage() {
    const p = Number(pageInput);

    if (!p || p < 1 || p > totalPages) {
      alert(`Please enter a valid page number between 1 and ${totalPages}`);
      return;
    }

    goToPage(p);
    setPageInput("");
  }

  function handleJumpKeyDown(e) {
    if (e.key === "Enter") {
      handleJumpToPage();
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setPage((p) => Math.min(p + 1, totalPages));
      setPageInput("");
      return;
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      setPage((p) => Math.max(p - 1, 1));
      setPageInput("");
    }
  }

  return (
    <div className="users-page">
      <h1>Users</h1>

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
