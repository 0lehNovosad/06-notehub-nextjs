// lib/api.ts
import axios from "axios";
import { Note } from "@/types/note";

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

interface CreateNoteProps {
  title: string;
  tag: "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";
  content: string;
}

// створюємо СВОЮ інстанцію axios з правильними хедерами
const api = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
    "Content-Type": "application/json",
  },
});

// ---- API functions ----

// GET /notes (з пошуком, пагінацією)
export const fetchNotes = async (
  search: string,
  page: number,
  perPage: number = 12
): Promise<FetchNotesResponse> => {
  // Формуємо querystring
  // прикол: якщо search = "" то не шлемо search=
  const params = new URLSearchParams({
    page: String(page),
    perPage: String(perPage),
  });

  if (search.trim() !== "") {
    params.set("search", search.trim());
  }

  const response = await api.get<FetchNotesResponse>(`/notes?${params.toString()}`);
  return response.data;
};

// POST /notes
export const createNote = async (newNote: CreateNoteProps): Promise<Note> => {
  const response = await api.post<Note>("/notes", newNote);
  return response.data;
};

// DELETE /notes/:id
export const deleteNote = async (id: Note["id"]): Promise<Note> => {
  const response = await api.delete<Note>(`/notes/${id}`);
  return response.data;
};

// GET /notes/:id
export const fetchNoteById = async (id: Note["id"]): Promise<Note> => {
  const response = await api.get<Note>(`/notes/${id}`);
  return response.data;
};
