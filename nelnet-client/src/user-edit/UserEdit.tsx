import { FormEvent, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { User, UserUpdateDto } from "../model/user";
import { getUserById, updateUser } from "../client";

import { formatDate } from "../string";

// Shows one user and allows editing.
export const UserEdit = () => {
  const { userID } = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState('');

  const saveUser = (dto: UserUpdateDto) => {
    setMessage('');
    setIsLoading(true);
    updateUser(dto)
      .then((updatedUser) => {
        setIsLoading(false);
        setUser(updatedUser);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
        setMessage(err.message);
      });
  };

  // Fetch the user
  useEffect(() => {
    if (!userID) {
      setIsError(true);
      setIsLoading(false);
      return;
    }

    getUserById(parseInt(userID))
      .then(fetchedUser => {
        setUser(fetchedUser);
        setIsLoading(false);
      })
      .catch(err => {
        console.error(err);
        setIsError(true);
        setIsLoading(false);
      });
  }, [userID]);

  if (isLoading) {
    return <div>Loading…</div>;
  }

  if (isError || user === null) {
    return (
      <div>
        <div>Could not find user #{userID}.</div>
        <div><Link to='/'>Back to user list</Link></div>
      </div>
    );
  }

  return <UserForm user={user} errorMessage={message} saveUser={saveUser} />;
};

type UserFormProps = {
  user: User,
  errorMessage: string,
  saveUser: (dto: UserUpdateDto) => void
}

// Form for editing a user.
export const UserForm = ({
  user: {
    userID,
    userType,
    userEmail,
    hasPassword,
    dateJoined,
    dateLastUpdated
  },
  errorMessage,
  saveUser
}: UserFormProps) => {
  const [newUserType, setNewUserType] = useState(userType);
  const [newUserEmail, setNewUserEmail] = useState(userEmail);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();

    const userUpdate: UserUpdateDto = {
      userID,
      userType: newUserType,
      userEmail: newUserEmail,
      oldPassword,
      newPassword,
    };

    saveUser(userUpdate);
  };

  return (
    <form onSubmit={onSubmit}>
      <h2>Edit user #{userID}</h2>

      {errorMessage && (
        <p>Error: {errorMessage}</p>
      )}

      <div>
        <label>ID</label>
        <div>{userID}</div>
      </div>
      <div>
        <label htmlFor="userType">User type</label>
        <input
          id="userType"
          type="text"
          required
          value={newUserType}
          onChange={({ target: { value } }) => { setNewUserType(value); }}
        />
      </div>
      <div>
        <label htmlFor="userEmail">Email address</label>
        <input
          id="userEmail"
          type="text"
          required
          value={newUserEmail}
          onChange={({ target: { value } }) => { setNewUserEmail(value); }}
        />
      </div>
      {hasPassword && (
        <div>
          <label htmlFor="oldPassword">Current password</label>
          <input
            id="oldPassword"
            type="password"
            required
            value={oldPassword}
            onChange={({ target: { value } }) => { setOldPassword(value); }}
          />
        </div>
      )}
      <div>
        <label htmlFor="newPassword">New password (optional)</label>
        <input
          id="newPassword"
          type="password"
          value={newPassword}
          onChange={({ target: { value } }) => { setNewPassword(value); }}
        />
      </div>
      <div>
        <label>Joined</label>
        <div>{formatDate(dateJoined)}</div>
      </div>
      <div>
        <label>Last updated</label>
        <div>{formatDate(dateLastUpdated)}</div>
      </div>
      <div>
        <button type="submit">Save changes</button>
      </div>
      <div>
        <Link to='/'>Back to user list</Link>
      </div>
    </form>
  );
};
