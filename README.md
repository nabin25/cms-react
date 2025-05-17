# Blog Admin Panel

A React-based admin panel for managing blog posts, authors, categories, and filtering content. Built with:

- **Vite**
- **React Router**
- **TanStack Query**
- **React Hook Form**
- **Zod**
- **Axios**
- **ShadCN UI / TailwindCSS**
- **Zustand** and **Persist** middleware for state management
- **Vitest + React Testing Library** for testing

---

## Features

- Filter blogs by **title**, **tag**, **status** ,**author**, **category**
- Save the form state for blogs as `Draft` every **5 seconds** and `Recover` the formstate from `localStorage` with `Confirmation Modal` to **discard** or **recover** the form.

- Reusable `FormBuilder` component with **Markdown Editor** with `react-quill-new` with proper integration with `react-hook-form` for form state management and `zod` for validation.

- **Dark** and **light** mode toggle with persistance in `localStorage`.

- Drawer-based UI for filters on blog page

- Pages for CRUD for **Authors**, **Categories**, and **Blogs**.
- Confiramation on all mutation operations.

- Modal based **Preview** for Blogs

- Proper management of cache data with proper revalidation logic on `mutation operations`.

- Pagination on all pages with (`page`, `limit`)

- Authentication context with login/logout and localStorage persistence, and mockAPI for authentication.

- Axios Interceptor to logout users when `403`(Forbidden) or `401`(Unauthorized) status codes are received.

- Modular API structure using custom hooks (`useFetchAuthors`, `useFetchCategories`)

- Fully typed with TypeScript

---

## Project Setup

Follow these steps to get the project running locally.

### 1. Clone the Repository

```bash
git clone https://github.com/nabin25/cms-react.git
cd cms-react
```

### 2. Setup Environment

- Rename `.env.example` on root of the project to `.env`

- Browse to <a href="https://mockapi.io">Mock api</a> and create resources **categories**, **authors**, **users** and **blogs** with the types mentioned under `types` folder.

- This project uses two endpoints due to limitation on free tier. If you have pro tier, adjust accordingly. Replace the **URLS** in `.env`. Create **Users** and **Blogs** in first URL, **Categories** and **Authors** in second URL

### 3. Install Dependencies

```bash
npm i
```

or if you are using `pnpm` then

```bash
pnpm install
```

### 3. Run the development server

```bash
npm run dev
```

or if you are using `pnpm` then

```bash
pnpm dev
```

Your server will be live on <a href="http://localhost:5173">http://localhost:5173</a>


### 4. Deployment URL

Browse to <a href="https://cms-react-seven.vercel.app">deployment url</a> and login with following credentials to check demo

```
email: davidwatson@gmail.com
password: password
```