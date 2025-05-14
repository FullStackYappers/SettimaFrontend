# Settima Frontend

This repository contains the frontend part of the Settima web platform project, built with React. Before setting up the frontend, ensure the backend is fully set up and the server is running. Refer to the backend setup instructions in the README: [Settima Backend Repository](https://github.com/FullStackYappers/SettimaBackend).

---

## Getting Started

Follow the steps below to set up and run the frontend project:

### 1. Clone the Repository

```bash
git clone https://gitlab.hof-university.de/settima/settima
```

### 2. Install Dependencies

Install the necessary dependencies by running the following commands:

```
npm install
```

```
npm install tailwindcss@3.4.15
```

```
npm i -D daisyui@latest
```

```
npm install dayjs
```

```
npm install axios
```


### 3. Configure Environment Variables

Ensure the `.env` file exists in the root directory and contains the correct API base URL:

```bash
VITE_API_BASE_URL=http://localhost:8000/api
```

### 4. Start the Development Server

Start the development server with the command:

```bash
npm run dev
```

The frontend should now be running on [http://localhost:5173](http://localhost:5173) (or another port if 5173 is in use). In case, the website shows a black screen after the preloader, please clear the browser cookies for the website (Issue related to authorization).

---

## Sample Users

E-Mail: jane.smith@yahoo.com\
Password: Secure@2025

E-Mail: rachel.carter@fastmail.com\
Password: Rachel@789

## Information Regarding Forums

The following movies have seeded discussions:
- Oppenheimer
- Harry Potter and the Prisoner of Azkaban
- Home Alone
- The Truman Show
- Avatar
- IF
- Coco
- John Wick

## Incomplete Implementations

- The Your Favorites section in the navbar menu is not implemented.
- Settings option under Profile is not implemented.

---
## Project Structure

The Settima frontend project follows a structured organization:

### Root Folders and Files

- `public/`: Contains public assets that are copied to the build folder.
- `src/`: Contains the source code for the application.
  - `assets/`: Static assets like images and fonts.
  - `components/`: Reusable React components.
    - `common/`: Shared components used across multiple pages.
    - `layout/`: Components related to the overall layout of the app.
  - `context/`: React context files for state management.
  - `pages/`: Individual page components, each in its own directory.
  - `services/`: API service functions and other utility services.
  - `types/`: TypeScript type definitions.
  - `App.tsx`: Main application component.
  - `main.tsx`: Entry point of the application.
- `.env`: Environment variables configuration.
- `.eslintrc.cjs`: ESLint configuration.
- `package.json`: Project dependencies and scripts.
- `tsconfig.json`: TypeScript configuration.
- `vite.config.ts`: Vite build tool configuration.

---

By following this guide, you should have the frontend part of Settima up and running smoothly.

