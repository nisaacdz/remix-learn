import { LoaderFunction, json } from "@remix-run/node";
import { useLoaderData, Link, Outlet } from "@remix-run/react";
import { fetchNotebook } from "~/data/notes";
import { Note } from "~/types/alltypes";

export const loader: LoaderFunction = async () => {
  const notebook = await fetchNotebook();

  return json({ entries: notebook.entries });
};

export default function NotesPage() {
  const { entries } = useLoaderData<{ entries: Note[] }>();

  return (
    <div className="relative container mx-auto w-full h-full p-8 overflow-hidden">
      <div className="mb-6 bt-2 w-full flex justify-center items-center">
        <Link to={`/notes/new/edit`}>
          <AddNoteButton />
        </Link>
      </div>
      {!entries || entries.length === 0 ? (
        <div className="text-center text-gray-400">No notes available.</div>
      ) : (
        <div className="flex flex-col-reverse flex-wrap gap-4 items-center justify-center max-w-full max-h-full pb-8">
          {entries.map((note, idx) => (
            <Link to={`/notes/${note.id}/edit`} key={idx}>
              <div className="break-inside-avoid flex flex-col w-80 md:w-96 border border-gray-800 rounded-lg bg-gray-900 p-6 shadow-lg h-auto gap-2">
                <div className="border border-gray-800 rounded-lg p-3 text-white">
                  <h2 className="text-lg font-bold">{note.title}</h2>
                </div>
                <div className="border border-gray-800 rounded-lg p-3 text-gray-300">
                  <p>{note.content}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
      <Outlet />
    </div>
  );
}

function AddNoteButton() {
  return (
    <button
      type="button"
      className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded transition"
    >
      Add Note
    </button>
  );
}
