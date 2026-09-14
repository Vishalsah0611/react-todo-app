import { Routes, Route } from "react-router-dom";
import AppLayout from "../components/AppLayout";
import Home from "../pages/Home";
import About from "../pages/About";
import Todo from "../pages/Todo";
import Contact from "../pages/Contact";
import UsersList from "../pages/users/UsersList";
import UserForm from "../pages/users/UserForm";
import UserView from "../pages/users/UserView";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Home />} />
        <Route path="todo" element={<Todo />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />

        {/* nested "users" routes — all share the "/users" prefix */}
        <Route path="users">
          <Route index element={<UsersList />} />
          <Route path="add" element={<UserForm />} />
          <Route path=":id" element={<UserView />} />
          <Route path=":id/edit" element={<UserForm />} />
        </Route>
      </Route>
    </Routes>
  );
}
