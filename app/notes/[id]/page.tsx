import { Note } from "@/types/note";

interface NotePageProps {
  params: {
    id: string;
  };
}

export default async function NotePage({ params }: NotePageProps) {
  const { id } = params;

  // захист від undefined
  if (!id) {
    return <div>Invalid note ID</div>;
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/notes/${id}`);

  if (!res.ok) {
    return <div>Note not found</div>;
  }

  const note: Note = await res.json();

  return (
    <div style={{ padding: 20 }}>
      <h1>{note.title}</h1>
      <p>{note.description}</p>
      <p>
        <strong>Tag:</strong> {note.tag}
      </p>
    </div>
  );
}
