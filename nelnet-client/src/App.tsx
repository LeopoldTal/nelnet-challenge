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
    <div className="m-16">
      <h1 className="mb-8 font-bold">Nelnet</h1>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
