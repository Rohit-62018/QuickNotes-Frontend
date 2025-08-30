interface NoteInputProps {
  note: string;
  setNote: (val: string) => void;
  onCreate: () => void;
}

const NoteInput: React.FC<NoteInputProps> = ({ note, setNote, onCreate }) => {
  return (
    <div className="textarea">
      <textarea
        placeholder="Take a note"
        rows={7}
        cols={70}
        value={note}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey && note.trim() !== "") {
            onCreate();
            setNote("");
          }
        }}
        onChange={(e) => setNote(e.target.value)}
      />
      <br />
    </div>
  );
};

export default NoteInput;