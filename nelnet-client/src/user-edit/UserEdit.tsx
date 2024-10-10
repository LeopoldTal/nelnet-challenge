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
      <div className="flex justify-between items-baseline mb-3">
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
      <h2 className="mb-8">Edit user #{userID}</h2>

      {errorMessage && (
        <p className="p-3 mb-3 font-bold bg-red-200 text-red-950">Error: {errorMessage}</p>
      )}

      <div className="flex justify-between items-baseline mb-3">
        <label className="mr-4">ID</label>
        <div>{userID}</div>
      </div>
      <div className="flex justify-between items-baseline mb-3">
        <label className="mr-4">Joined</label>
        <div>{formatDate(dateJoined)}</div>
      </div>
      <div className="flex justify-between items-baseline mb-3">
        <label className="mr-4">Last updated</label>
        <div>{formatDate(dateLastUpdated)}</div>
      </div>
      <div className="flex justify-between items-baseline mb-3">
        <label className="mr-4" htmlFor="userType">User type</label>
        <input
          className="border border-black rounded px-3 py-2"
          id="userType"
          type="text"
          required
          value={newUserType}
          onChange={({ target: { value } }) => { setNewUserType(value); }}
        />
      </div>
      <div className="flex justify-between items-baseline mb-3">
        <label className="mr-4" htmlFor="userEmail">Email address</label>
        <input
          className="border border-black rounded px-3 py-2"
          id="userEmail"
          type="text"
          required
          value={newUserEmail}
          onChange={({ target: { value } }) => { setNewUserEmail(value); }}
        />
      </div>
      {hasPassword && (
        <div className="flex justify-between items-baseline mb-3">
          <label className="mr-4" htmlFor="oldPassword">Current password</label>
          <input
            className="border border-black rounded px-3 py-2"
            id="oldPassword"
            type="password"
            required
            value={oldPassword}
            onChange={({ target: { value } }) => { setOldPassword(value); }}
          />
        </div>
      )}
      <div className="flex justify-between items-baseline mb-3">
        <label className="mr-4" htmlFor="newPassword">New password (optional)</label>
        <input
          className="border border-black rounded px-3 py-2"
          id="newPassword"
          type="password"
          value={newPassword}
          onChange={({ target: { value } }) => { setNewPassword(value); }}
        />
      </div>
      <div className="flex justify-between items-baseline mb-3">
        <button className="my-3 border border-black" type="submit">Save changes</button>
      </div>
      <div className="flex justify-between items-baseline mb-3">
        <Link to='/'>Back to user list</Link>
      </div>
    </form>
  );
};
