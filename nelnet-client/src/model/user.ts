// All public info about one user.
export type User = {
  userID: string;
  userType: string;
  userEmail: string;
  hasPassword: boolean;
  dateJoined: string;
  dateLastUpdated: string;
};

// Sent to update an user.
export type UserUpdateDto = {
  userID: string;
  userType?: string;
  userEmail?: string;
  oldPassword?: string;
  newPassword?: string;
};
