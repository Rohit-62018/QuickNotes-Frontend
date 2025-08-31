import { useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import { deleteNote } from "../apicalls";
import { toast } from "react-toastify";

interface Note {
  _id: string;
  content: string;
}

interface NoteListProps {
  notes: Note[];
  dimmed: boolean;
  setNotes: Dispatch<SetStateAction<Note[]>>;
}

const NoteList: React.FC<NoteListProps> = ({ notes, dimmed, setNotes }) => {
  const [view, setView] = useState<string | null>(null);
  const toggleNote = (id:string)=>{
      setView((prev)=> (prev===id ? null : id));
  }
  const deleteNotes = async(id:string)=>{
        const data = await deleteNote(id);
        if(data?.success){
          toast.success(data?.message);
          setNotes(data.notes)
        }else{
          toast.error(data.message)
        }
  }
  return (
    <>
      {notes.map((note) => (
        <div
          className={`note ${view === note._id ? "view":""}`}
          style={dimmed ? { opacity: "0.3" } : {}}
          key={note._id}
          onClick={()=>toggleNote(note._id)}
        >
          {note.content}<div className="delete" onClick={()=>deleteNotes(note._id)}>x</div>
        </div>
      ))}
    </>
  );
};

export default NoteList;


// import React, { useState } from "react";

// interface Note {
//   _id: string;
//   content: string;
// }

// interface NoteListProps {
//   notes: Note[];
//   dimmed: boolean;
// }

// const NoteList: React.FC<NoteListProps> = ({ notes, dimmed }) => {
//   const [expandedNoteId, setExpandedNoteId] = useState<string | null>(null);

//   const toggleNote = (id: string) => {
//     setExpandedNoteId(prev => (prev === id ? null : id));
//   };

//   return (
//     <>
//       {notes.map((note) => (
//         <div
//           key={note._id}
//           className={`note ${expandedNoteId === note._id ? "expanded" : ""}`}
//           style={dimmed ? { opacity: "0.3" } : {}}
//           onClick={() => toggleNote(note._id)}
//         >
//           {note.content}
//         </div>
//       ))}
//     </>
//   );
// };

// export default NoteList;