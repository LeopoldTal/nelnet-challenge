CREATE TABLE UserMaster(
    -- Autoincrement user ID
    -- This results in sequential and therefore guessable IDs
    -- If we need them not to be discoverable, we could assign UUIDs instead
    UserID INT NOT NULL IDENTITY (1, 1) PRIMARY KEY,

    -- Short free text describing the user type
    -- Instead, we could reference a table of user types
    UserType VARCHAR(255) NOT NULL DEFAULT 'NormalUser',

    -- Email address can be arbitrarily long
    -- We may want a unique constraint on it e.g. if we're using it to log in
    UserEmail TEXT NOT NULL,

    -- Hashed password + salt
    -- Can be NULL e.g. if the account isn't activated
    -- Default PasswordHasher only uses 49 bytes, but leave some extra room
    PasswordHash VARCHAR(128) NULL,

    -- Create and update dates
    DateJoined DATETIME NOT NULL DEFAULT (GETDATE()),
    DateLastUpdated DATETIME NOT NULL DEFAULT (GETDATE())
);
