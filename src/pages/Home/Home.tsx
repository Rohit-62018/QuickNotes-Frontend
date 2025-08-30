import "./Home.css";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Header from "../../Components/Header";
import NoteInput from "../../Components/NoteInput";
import NoteList from "../../Components/NoteList";
import { fetchNotes, addNote } from "../../apicalls";
import Popup from "../../Components/popup";

interface Note {
  _id: string;
  content: string;
}

function Home() {
  const [create, setCreate] = useState(false);
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState<Note[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("")

  useEffect(() => {
    const loadNotes = async () => {
      const { success, user, message } = await fetchNotes();
      if (success) {
        setNotes(user?.notes);
        setName(user?.name);
        setEmail(user?.email)
      } else {
        toast.error(message);
      }
    };
    loadNotes();
  }, []);

  const handleCreateNote = async () => {
    if (note.trim() === "") return;

    const { success, notes: updatedNotes, message } = await addNote(note);
    if (success) {
      toast.success(message);
      setNote("");
      setNotes(updatedNotes);
    } else {
      toast.error(message);
    }
  };

  return (
    <div className="home">
        <Popup title={name} message={email} />
      <Header dimmed={create} />
      <div className="box">
        <div onClick={() => setCreate(!create)} className="plus">
          <i className="fa-solid fa-plus"></i>
        </div>
        <p>Notes</p>
        <div className="notes">
          {create && (
            <NoteInput note={note} setNote={setNote} onCreate={handleCreateNote} />
          )}
          <NoteList notes={notes} dimmed={create} />
        </div>
      </div>
    </div>
  );
}

export default Home;