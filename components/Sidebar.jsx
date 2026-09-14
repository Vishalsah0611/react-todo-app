import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <h2 className="sidebar-title">My App</h2>
      <nav className="sidebar-nav">
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/todo">Todo</NavLink>
        <NavLink to="/about">About Us</NavLink>
        <NavLink to="/users">Users</NavLink>
        <NavLink to="/contact">Contact</NavLink>
      </nav>
    </div>
  );
}
