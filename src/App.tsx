import "./App.css";
import { HashRouter, Route, Routes } from "react-router-dom";

// Pages
import { UserListPage } from "./pages/userList";
import { CreateUserPage } from "./pages/createUser";
import { UserDetailsPage } from "./pages/userDetails";

function App() {
  return (
    <div className="container__app">
      <HashRouter>
        <Routes>
          <Route path="/" element={<UserListPage />} />
          <Route path="/create-user" element={<CreateUserPage />} />
          <Route path="/user-details/:userId" element={<UserDetailsPage />} />
          <Route path="/edit-user/:userId" element={<CreateUserPage />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
