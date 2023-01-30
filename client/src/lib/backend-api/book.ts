const BookApi = {
  getAllBooks: async () => {
    const res = await fetch("/v1/book", { method: "GET" });
    return res.json();
  },
  getBookByIsbn: async (bookIsbn: any) => {
    const res = await fetch(`/v1/book/${bookIsbn}`, { method: "GET" });
    return res.json();
  },
  addBook: async (data: any) => {
    const res = await fetch("/v1/book", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
    return res.json();
  },
  patchBookByIsbn: async (bookIsbn: any, data: any) => {
    const res = await fetch(`/v1/book/${bookIsbn}`, {
      method: "PATCH",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
    return res.json();
  },
  deleteBook: async (bookIsbn: any) => {
    const res = await fetch(`/v1/book/${bookIsbn}`, { method: "DELETE" });
    return res.json();
  },
};

export { BookApi };
