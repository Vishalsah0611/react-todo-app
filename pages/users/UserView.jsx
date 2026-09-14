import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchUserById } from "../../api/users";

export default function UserView() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchUserById(id)
      .then((data) => setUser(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="page-container">Loading...</p>;
  if (error) return <p className="page-container empty-text">{error}</p>;
  if (!user) return null;

  return (
    <div className="page-container">
      <h1>
        {user.firstName} {user.lastName}
      </h1>
      <p>Email: {user.email}</p>
      <p>Age: {user.age}</p>
      <p>Phone: {user.phone}</p>
      <p>Gender: {user.gender}</p>
      <p>
        Address:{" "}
        {typeof user.address === "string"
          ? user.address
          : `${user.address?.address ?? ""}, ${user.address?.city ?? ""}`}
      </p>

      <div className="form-actions" style={{ justifyContent: "center" }}>
        <Link to={`/users/${user.id}/edit`} className="edit-button">
          Edit
        </Link>
        <Link to="/users" className="cancel-button">
          Back to Users
        </Link>
      </div>
    </div>
  );
}
