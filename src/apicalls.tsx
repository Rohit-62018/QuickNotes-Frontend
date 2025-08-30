export const fetchNotes = async () => {
  const res = await fetch("http://localhost:3000/notes", {
    method: "GET",
    credentials: "include",
  });
  return res.json();
};

export const addNote = async (content: string) => {
  const res = await fetch("http://localhost:3000/addnotes", {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content }),
  });
  return res.json();
};

export const logoutUser = async () => {
  const res = await fetch("http://localhost:3000/logout", {
    method: "POST",
    credentials: "include",
  });
  return res.json();
};