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
  <tr>
    <td>{userID}</td>
    <td>{userType}</td>
    <td>{userEmail}</td>
    <td>{hasPassword ? '🔒 Set' : '🏗️ Not set'}</td>
    <td>{formatDate(dateJoined)}</td>
    <td>{formatDate(dateLastUpdated)}</td>
    <td>
      <Link to={`/${userID}`}>🖊️ Edit</Link>
    </td>
  </tr>
);
