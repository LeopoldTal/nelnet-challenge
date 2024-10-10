import './App.css'

import {
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

import { UserEdit } from './user-edit/UserEdit';
import { UserList } from './user-list/UserList'

const router = createBrowserRouter([
  {
    path: "/",
    element: <UserList />,
  },
  {
    path: "/:userID",
    element: <UserEdit />,
  },
]);

function App() {

  return (
    <div>
      <h1>Nelnet</h1>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
