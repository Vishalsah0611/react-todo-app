export default function Navbar({ page, setPage }) {
  return (
    <div className="navbar">
      <span className="nav-brand">My App</span>

      <button onClick={() => setPage("home")} className="nav-link">
        Home
      </button>

      <button onClick={() => setPage("about")} className="nav-link">
        About
      </button>
    </div>
  );
}