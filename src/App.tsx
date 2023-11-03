import './App.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

// Pages
import { UserListPage } from './pages/userList'
import { CreateUserPage } from './pages/createUser'
import { UserDetailsPage } from './pages/userDetails';

const router = createBrowserRouter([
  {
    path: "/",
    element: <UserListPage />,
  },
  {
    path: "/create-user",
    element: <CreateUserPage />,
  },
  {
    path: "/user-details/:userId",
    element: <UserDetailsPage />,
  },
  {
    path: "/edit-user/:userId",
    element: <CreateUserPage />,
  },
]);

function App() {

  return (
    <div className='container__app'>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
