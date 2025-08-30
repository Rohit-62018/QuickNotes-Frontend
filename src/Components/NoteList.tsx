interface Note {
  _id: string;
  content: string;
}

interface NoteListProps {
  notes: Note[];
  dimmed: boolean;
}

const NoteList: React.FC<NoteListProps> = ({ notes, dimmed }) => {
  return (
    <>
      {notes.map((note) => (
        <div
          className="note"
          style={dimmed ? { opacity: "0.3" } : {}}
          key={note._id}
        >
          {note.content}
        </div>
      ))}
    </>
  );
};

export default NoteList;