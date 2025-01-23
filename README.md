# Settima Frontend

This repository contains the frontend part of the Settima web platform project, built with React. Before setting up frontend, make sure backend part is fully setup and the server is running. You can find all of the instructions for backend in README: https://gitlab.hof-university.de/settima/settimabackend


## Getting Started

1. Clone the frontend repository:
   ```bash
   git clone https://gitlab.hof-university.de/settima/settima
2. Install dependencies:
	```bash 
	npm install
3. Make sure .env file has a correct root which is:
	```bash
	VITE_API_BASE_URL=http://localhost:8000/api

4. Start the development server:
	```bash
	npm run dev
The frontend should now be running on http://localhost:5173 (or another port if 5173 is in use).

## Project Structure

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