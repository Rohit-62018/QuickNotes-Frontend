import { useState } from "react";
interface Note {
  _id: string;
  content: string;
}

interface NoteListProps {
  notes: Note[];
  dimmed: boolean;
}

const NoteList: React.FC<NoteListProps> = ({ notes, dimmed }) => {
  const [view, setView] = useState(false)
  return (
    <>
      {notes.map((note) => (
        <div
          className={`note ${view ? "view":""}`}
          style={dimmed ? { opacity: "0.3" } : {}}
          key={note._id}
          onClick={()=>setView(!view)}
        >
          {note.content}
        </div>
      ))}
    </>
  );
};

export default NoteList;