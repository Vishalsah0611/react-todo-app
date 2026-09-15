import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  fetchUsers,
  fetchUsersRaw,
  searchUsers,
  deleteUser,
} from "../../api/users";

const LIMIT = 10;

export default function UsersList() {
  const [users, setUsers] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [deletingId, setDeletingId] = useState(null);

  const totalPages = Math.ceil(total / LIMIT);

  /* ================= SEARCH DEBOUNCE ================= */

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search.trim());
    }, 400);

    return () => clearTimeout(timer);
  }, [search]);

  /* ================= RESET PAGE ON SEARCH ================= */

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch]);

  /* ================= LOAD USERS ================= */

  useEffect(() => {
    loadUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, debouncedSearch]);

  async function loadUsers() {
    setLoading(true);
    setError("");

    try {
      if (debouncedSearch) {
        const data = await searchUsers(
          debouncedSearch,
          page,
          LIMIT
        );

        setUsers(data?.users ?? []);
        setTotal(data?.total ?? 0);
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

  /* ================= DELETE USER ================= */

  async function handleDelete(id) {
    if (!window.confirm("Delete this user?")) return;

    setDeletingId(id);

    try {
      await deleteUser(id);

      /*
        Search mode:
        API se replacement user automatically lana
        reliable nahi hai, isliye simply local list update.
      */
      if (debouncedSearch) {
        setUsers((prev) =>
          prev.filter((user) => user.id !== id)
        );

        setTotal((prev) => Math.max(prev - 1, 0));

        return;
      }

      /*
        Normal users page:
        Current page ka starting point
      */
      const pageStart = (page - 1) * LIMIT;

      /*
        Current page + next user fetch karenge.

        Example:
        Page 1:
        skip = 0
        limit = 11

        Agar ek user delete hua:
        11 users mein se deleted user hatao
        => 10 users bachenge
      */
      const data = await fetchUsersRaw(
        pageStart,
        LIMIT + 1
      );

      const freshUsers = data?.users ?? [];

      /*
        Deleted user ko remove karo
      */
      const updatedUsers = freshUsers
        .filter((user) => user.id !== id)
        .slice(0, LIMIT);

      setUsers(updatedUsers);

      /*
        Total users 1 kam
      */
      setTotal((prev) => Math.max(prev - 1, 0));

      /*
        Agar current page empty ho gaya
        aur previous page available hai,
        to previous page par chale jao.
      */
      if (updatedUsers.length === 0 && page > 1) {
        setPage((prev) => prev - 1);
      }
    } catch (err) {
      alert(err.message);
    } finally {
      setDeletingId(null);
    }
  }

  /* ================= PAGINATION ================= */

  function goToPage(p) {
    if (p < 1 || p > totalPages) return;

    setPage(p);
  }

  /* ================= UI ================= */

  return (
    <div className="users-page">

      <div className="users-header">
        <h1>Users</h1>

        <Link
          to="/users/add"
          className="add-button users-add-link"
        >
          + Add User
        </Link>
      </div>

      {/* SEARCH */}

      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search users by name, email or phone..."
        className="search-input"
      />

      {/* LOADING */}

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="empty-text">{error}</p>
      ) : users.length === 0 ? (
        <p className="empty-text">No users found.</p>
      ) : (
        <>
          {/* ================= TABLE ================= */}

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

                    {/* PHOTO */}

                    <td>
                      <img
                        src={user?.image}
                        alt={user?.firstName}
                        className="user-avatar"
                      />
                    </td>

                    {/* NAME */}

                    <td>
                      {user?.firstName} {user?.lastName}
                    </td>

                    {/* EMAIL */}

                    <td>{user?.email}</td>

                    {/* AGE */}

                    <td>{user?.age}</td>

                    {/* PHONE */}

                    <td>{user?.phone}</td>

                    {/* ACTIONS */}

                    <td>
                      <div className="table-actions">

                        {/* VIEW */}

                        <Link
                          to={`/users/${user.id}`}
                          className="view-button"
                          aria-disabled={
                            deletingId === user.id
                          }
                          onClick={(e) => {
                            if (deletingId === user.id) {
                              e.preventDefault();
                            }
                          }}
                        >
                          View
                        </Link>

                        {/* EDIT */}

                        <Link
                          to={`/users/${user.id}/edit`}
                          className="edit-button"
                          aria-disabled={
                            deletingId === user.id
                          }
                          onClick={(e) => {
                            if (deletingId === user.id) {
                              e.preventDefault();
                            }
                          }}
                        >
                          Edit
                        </Link>

                        {/* DELETE */}

                        <button
                          onClick={() =>
                            handleDelete(user.id)
                          }
                          className="delete-button"
                          disabled={
                            deletingId === user.id
                          }
                        >
                          {deletingId === user.id
                            ? "Deleting..."
                            : "Delete"}
                        </button>

                      </div>
                    </td>

                  </tr>
                ))}
              </tbody>

            </table>
          </div>

          {/* ================= PAGINATION ================= */}

          <div className="pagination">

            <button
              onClick={() => goToPage(1)}
              disabled={page === 1}
            >
              First
            </button>

            <button
              onClick={() => goToPage(page - 1)}
              disabled={page === 1}
            >
              Prev
            </button>

            <span className="pagination-info">
              Page {page} of {totalPages}
            </span>

            <button
              onClick={() => goToPage(page + 1)}
              disabled={page === totalPages}
            >
              Next
            </button>

            <button
              onClick={() => goToPage(totalPages)}
              disabled={page === totalPages}
            >
              Last
            </button>

          </div>
        </>
      )}
    </div>
  );
}