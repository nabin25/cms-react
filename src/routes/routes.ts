const routes = {
  blogs: {
    home: "/",
    create: "/blogs/create",
    edit: (id: string) => `/blogs/edit/${id}`,
  },
  authors: "/authors",
  categories: "/categories",
};

export default routes;
