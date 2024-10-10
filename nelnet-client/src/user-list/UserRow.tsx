import { Link } from "react-router-dom";
import { User } from "../model/user";
import { formatDate } from "../string";

type UserRowProps = {
  user: User
}

// Shows one user as a table row.
export const UserRow = ({ user: {
  userID, userType, userEmail, hasPassword, dateJoined, dateLastUpdated
} }: UserRowProps) => (
  <tr className="border-t">
    <td className="p-3">{userID}</td>
    <td className="p-3"><code>{userType}</code></td>
    <td className="p-3">{userEmail}</td>
    <td className="p-3">{hasPassword ? '🔒 Set' : '🏗️ Not set'}</td>
    <td className="p-3">{formatDate(dateJoined)}</td>
    <td className="p-3">{formatDate(dateLastUpdated)}</td>
    <td className="p-3">
      <Link to={`/${userID}`}>🖊️ Edit</Link>
    </td>
  </tr>
);
