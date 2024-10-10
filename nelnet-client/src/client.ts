import { User, UserUpdateDto } from "./model/user";

const baseUrl = import.meta.env.VITE_API_URL;

const commonHeaders = {
  Accept: 'application/json',
};
const writeHeaders = {
  ...commonHeaders,
  'Content-Type': 'application/json',
};

// List all users.
export const getUsers = async (): Promise<User[]> => {
  const res = await fetch(`${baseUrl}/GetUsers`, { headers: commonHeaders });
  const users = await res.json();
  return users;
};

// Gets one user.
export const getUserById = async (userID: number): Promise<User> => {
  const res = await fetch(`${baseUrl}/GetUserById?userID=${userID}`, { headers: commonHeaders });
  const user = await res.json();
  return user;
};

// Updates a user.
export const updateUser = async (dto: UserUpdateDto): Promise<User> => {
  const res = await fetch(`${baseUrl}/UpdateUser`, {
    method: 'PATCH',
    headers: writeHeaders,
    body: JSON.stringify(dto),
  });
  if (res.ok) {
    const user = await res.json();
    return user;
  } else {
    const err = await res.text();
    throw new Error(err);
  }
};
