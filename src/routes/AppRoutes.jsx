import { Routes, Route } from "react-router-dom";
import AppLayout from "./AppLayout";
import Home from "../pages/Home";
import About from "../pages/About";
import Todo from "../pages/Todo";
import Users from "../pages/Users";
import Contact from "../pages/Contact";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Home />} />
        <Route path="todo" element={<Todo />} />
        <Route path="about" element={<About />} />
        <Route path="users" element={<Users />} />
        <Route path="contact" element={<Contact />} />
      </Route>
    </Routes>
  );
}
