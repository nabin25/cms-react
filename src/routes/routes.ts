const routes = {
  blogs: {
    home: "/",
    create: "/blogs/create",
    edit: (id: string) => `/blogs/edit/${id}`,
  },
  authors: "/authors",
  categories: "/categories",
  auth: { signIn: "/auth/sign-in", signUp: "/auth/sign-up" },
};

export default routes;
