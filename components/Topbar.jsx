import { useLocation } from "react-router-dom";

const titles = {
  "/": "Home",
  "/todo": "My Tasks",
  "/about": "About Us",
  "/users": "Users",
  "/contact": "Contact",
};

export default function Topbar() {
  const location = useLocation();
  const title = titles[location.pathname] || "My App";

  return (
    <div className="topbar">
      <h2 className="topbar-title">{title}</h2>
    </div>
  );
}
