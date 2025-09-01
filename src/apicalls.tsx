export const fetchNotes = async () => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/notes`, {
    method: "GET",
    credentials: "include",
  });
  return res.json();
};

export const addNote = async (content: string) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/addnotes`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content }),
  });
  return res.json();
};

export const logoutUser = async () => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/logout`, {
    method: "POST",
    credentials: "include",
  });
  return res.json();
};

export const deleteNote = async (id: string) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/notes/delete`, {
    method: "DELETE",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id }),
  });
  return res.json();
};