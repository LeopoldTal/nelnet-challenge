import { useEffect, useState } from "react";

import { User } from "../model/user";
import { UserRow } from "./UserRow";
import { getUsers } from "../client";

// Gets and displays all users.
export const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  // Fetch all users
  useEffect(() => {
    getUsers()
      .then(fetchedUsers => {
        setUsers(fetchedUsers);
        setIsLoading(false);
      })
      .catch(err => {
        console.error(err);
        setIsError(true);
        setIsLoading(false);
      });
  }, []);

  if (isError) {
    return <p>There was an error while loading users.</p>;
  }
  if (isLoading) {
    return <p>Loading users…</p>;
  }

  return <UserTable users={users} />;
};

type UserTableProps = { users: User[] };

// Displays all users as a table.
const UserTable = ({ users }: UserTableProps) => (
  <div>
    <h2 className="mb-8">All users</h2>

    <table>
      <thead>
        <tr>
          <th className="p-3">#</th>
          <th className="p-3">User type</th>
          <th className="p-3">Email</th>
          <th className="p-3">Password</th>
          <th className="p-3">Date joined</th>
          <th className="p-3">Date last updated</th>
          <th className="p-3">Edit</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <UserRow user={user} key={user.userID} />
        ))}
      </tbody>
      {users.length === 0 && (
        <tfoot>
          <tr>
            <td className="p-4" colSpan={7}>There are no users.</td>
          </tr>
        </tfoot>
      )}
    </table>
  </div>
)
