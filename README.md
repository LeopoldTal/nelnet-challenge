Nelnet coding test

# Setup

1. Launch SQL Server locally on port 1433. Database: `nelnet`, user: `sa`, password: `Nelnet-password`.
2. Run `db-setup.sql` to create the table.
3. Install NuGet packages, build, and launch the backend in `Nelnet/`. It is served at `http://localhost:5184/swagger/`.
4. cd to `nelnet-client`.
7. Run `npm install`.
8. Build Tailwin CSS with `npx tailwindcss -i ./src/index.css -o ./output.css --watch`.
9. Launch the client with `npm run dev`. It is served at `http://localhost:5173/`.

# Features

- Lists users.
- Shows one user.
- Allows editing a user.
- If the user has a password, the existing password must be provided when editing.
