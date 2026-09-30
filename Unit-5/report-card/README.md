## Student Report Card Management System

A responsive React portal for student semester results and administrator-managed student records. The sample backend is local JSON data persisted in browser `localStorage`.

## Run locally

```sh
npm install
npm run dev
```

Open the local URL printed by Vite (normally `http://localhost:5173`). React, React DOM, Vite, and React Router DOM are declared in `package.json`. Run `npm run build` for a production build or `npm run lint` for ESLint.

## Demo accounts

- Student: register number `25CS062`, date of birth `21-04-2008`
- Admin: username `admin`, password `admin123`
- Other students: `25CS018` / `08-11-2007`; `25EC034` / `16-02-2008`

Use the demo accounts only with this local sample application. Student passwords are date-of-birth strings as requested.

## Project map

- `src/main.jsx` mounts the React application.
- `src/App.jsx` defines routes and the login, student, report, directory, and admin result-management screens.
- `src/context/AuthContext.jsx` owns the current session and mutable student records; changes persist to `localStorage` and sync across browser tabs.
- `src/context/authContext.js` and `src/context/useAuth.js` expose the auth context and its hook.
- `src/components/ProtectedRoute.jsx` checks the current role before rendering protected route content.
- `src/data/students.js` contains the sample students, semester results, empty semester shape, and result status calculation.
- `src/index.css` defines global colors and browser defaults; `src/portal.css` contains responsive portal and report layouts.
- `index.html`, `vite.config.js`, and `package.json` provide the Vite app shell, build setup, dependencies, and scripts.

## How it works

React Router maps `/login`, `/admin`, `/admin/students`, `/admin/student/:registerNumber`, `/student`, `/student/semester/1`, `/student/semester/2`, and `/student/report`. `ProtectedRoute` redirects unauthenticated visitors to `/login`, and redirects a signed-in user away from routes for the other role. Student result pages read only `currentStudent`, which is resolved from the authenticated register number in context; student result routes do not accept a register number from the URL.

`useState` controls form values, loading and error states, the current user, student records, search filtering, and editable semester marks. `useEffect` persists record changes and listens for session/data changes from other tabs. Initial local session state is loaded with lazy state initialization so protected routes do not flash before the stored session is read.

The login form checks admin credentials or matches a student's register number and date of birth against the stored records. The session is stored under `loggedInUser`; student records are stored under `reportCardStudents`. Semester totals and percentages are recalculated when an admin saves marks. An empty semester is shown as `PENDING`.

## Admin workflow

The admin dashboard shows record counts and a directory preview. In **Students**, search by name or register number, add a student, edit demographics, delete a record, or open **View** to inspect their report and edit both semesters. A semester editor supports subject code/name, internal and external marks, grade, and CGPA. Totals, percentages, and pass/fail status are derived from the saved subjects.

## Production security

This is a frontend-only demonstration, not secure authentication. `localStorage` is editable by the browser user, the sample records and DOB credentials are bundled with the client, and route guards only protect the interface. Do not put real student records or credentials in this build.

For production, add a backend API and database. Authenticate users on the server with a proper password flow (hashed passwords, not dates of birth), issue secure `HttpOnly`, `Secure`, `SameSite` session cookies or short-lived tokens, and enforce role and student-record authorization on every API request. The server should derive the student identity from the authenticated session, validate and audit admin changes, and return only authorized records. Replace the context's localStorage reads/writes with API calls; keep React Router guards for navigation and user experience, not as the security boundary.

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.
You can also try [the experimental native React Compiler support in plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md#rust-react-compiler) by using `compiler: true` in the plugin options instead of using the Babel plugin.

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
