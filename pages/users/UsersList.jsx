import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchUsers, searchUsers, fetchUsersRaw, deleteUser } from "../../api/users";

const LIMIT = 10;

export default function UsersList() {
  const [users, setUsers] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const totalPages = Math.ceil(total / LIMIT);

  // wait 400ms after the user stops typing before actually searching
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search.trim());
    }, 400);

    return () => clearTimeout(timer);
  }, [search]);

  // whenever the search term changes, always go back to page 1
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
      // if there's a search term, hit the search endpoint instead of the
      // plain list endpoint
      const data = debouncedSearch
        ? await searchUsers(debouncedSearch, page, LIMIT)
        : await fetchUsers(page, LIMIT);

      setUsers(data?.users ?? []);
      setTotal(data?.total ?? 0);
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

      // pull in one more user from just past this page, so the table
      // still shows a full page of 10 instead of dropping to 9
      await backfillOneUser(remaining);
    } catch (err) {
      alert(err.message);
    }
  }

  async function backfillOneUser(currentUsers) {
    // only bother backfilling on the plain (non-search) list
    if (debouncedSearch) return;

    const skip = (page - 1) * LIMIT + currentUsers.length;
    if (skip >= total) return; // nothing left after this page to pull in

    try {
      const data = await fetchUsersRaw(skip, 1);
      const nextUser = data?.users?.[0];
      if (nextUser) {
        setUsers((prev) => [...prev, nextUser]);
      }
    } catch {
      // if this fails, it's not critical — the list just shows 9 instead of 10
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
        placeholder="Search users by name..."
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
