import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchUsers, fetchUsersRaw, fetchAllUsersRaw, deleteUser } from "../../api/users";

const LIMIT = 10;

export default function UsersList() {
  const [users, setUsers] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [allUsersCache, setAllUsersCache] = useState(null);

  const totalPages = Math.ceil(total / LIMIT);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search.trim());
    }, 400);

    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch]);

  useEffect(() => {
    loadUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, debouncedSearch]);

  async function loadUsers() {
    setLoading(true);
    setError("");

    try {
      if (debouncedSearch) {
        let all = allUsersCache;
        if (!all) {
          const data = await fetchAllUsersRaw();
          all = data?.users ?? [];
          setAllUsersCache(all);
        }

        const q = debouncedSearch.toLowerCase();
        const matches = all.filter((user) => {
          const fullName = `${user?.firstName ?? ""} ${user?.lastName ?? ""}`.toLowerCase();
          const email = (user?.email ?? "").toLowerCase();
          const phone = (user?.phone ?? "").toLowerCase();
          return fullName.includes(q) || email.includes(q) || phone.includes(q);
        });

        const start = (page - 1) * LIMIT;
        setUsers(matches.slice(start, start + LIMIT));
        setTotal(matches.length);
      } else {
        const data = await fetchUsers(page, LIMIT);
        setUsers(data?.users ?? []);
        setTotal(data?.total ?? 0);
      }
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

      const remaining = users.filter((user) => user.id !== id);
      setUsers(remaining);
      setTotal((prev) => Math.max(prev - 1, 0));

      await backfillOneUser(remaining);
    } catch (err) {
      alert(err.message);
    }
  }

  async function backfillOneUser(currentUsers) {
    if (debouncedSearch) return;

    const skip = (page - 1) * LIMIT + currentUsers.length;
    if (skip >= total) return;

    try {
      const data = await fetchUsersRaw(skip, 1);
      const nextUser = data?.users?.[0];
      if (nextUser) {
        setUsers((prev) => [...prev, nextUser]);
      }
    } catch {
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

      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search users by name, email or phone..."
        className="search-input"
      />

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="empty-text">{error}</p>
      ) : users.length === 0 ? (
        <p className="empty-text">No users found.</p>
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
                        src={user?.image}
                        alt={user?.firstName}
                        className="user-avatar"
                      />
                    </td>
                    <td>
                      {user?.firstName} {user?.lastName}
                    </td>
                    <td>{user?.email}</td>
                    <td>{user?.age}</td>
                    <td>{user?.phone}</td>
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
            <button onClick={() => goToPage(1)} disabled={page === 1}>
              First
            </button>
            <button onClick={() => goToPage(page - 1)} disabled={page === 1}>
              Prev
            </button>

            <span className="pagination-info">
              Page {page} of {totalPages}
            </span>

            <button onClick={() => goToPage(page + 1)} disabled={page === totalPages}>
              Next
            </button>
            <button onClick={() => goToPage(totalPages)} disabled={page === totalPages}>
              Last
            </button>
          </div>
        </>
      )}
    </div>
  );
}