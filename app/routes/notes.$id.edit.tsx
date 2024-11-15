import {
  ActionFunction,
  LoaderFunction,
  LoaderFunctionArgs,
} from "@remix-run/node";
import {
  Form,
  json,
  redirect,
  useLoaderData,
  useNavigate,
} from "@remix-run/react";
import { createNote, getNote, updateNote } from "~/data/notes";
import { Note } from "~/types/alltypes";

export const action: ActionFunction = async ({ request, params }) => {
  const { id } = params;
  const formData = await request.formData();
  if (formData.get("editbutton") == "save") {
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    if (id === "new") {
      await createNote(title, content);
    } else {
      await updateNote(id as string, title, content);
    }
  }
  return redirect("/notes");
};

export const loader: LoaderFunction = async ({
  params,
}: LoaderFunctionArgs) => {
  const { id } = params;
  return json({ note: await getNote(id as string) });
};

export default function EditNote() {
  const { note } = useLoaderData<{ note: Note }>();
  const navigate = useNavigate();
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div
      className="absolute left-0 top-0 w-full h-full flex items-center justify-center bg-transparent backdrop-blur-lg"
      onClick={() => navigate("/notes")}
    >
      <Form
        method="post"
        id="create-note"
        className="flex flex-col gap-6 w-[360px] md:w-[540px] border border-gray-800 rounded-lg bg-gray-900 p-8 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col gap-4 border border-gray-800 rounded-lg p-4">
          <label
            htmlFor="note-title"
            className="text-gray-400 font-medium text-xl"
          >
            Title
          </label>
          <input
            name="title"
            id="note-title"
            className="bg-gray-800 text-white border-none rounded focus:outline-none px-4 py-3 text-lg"
            placeholder="Enter note title"
            defaultValue={note?.title || ""}
          />
        </div>
        <div className="flex flex-col gap-4 border border-gray-800 rounded-lg p-4">
          <label
            htmlFor="note-content"
            className="text-gray-400 font-medium text-xl"
          >
            Content
          </label>
          <textarea
            name="content"
            id="note-content"
            className="bg-gray-800 text-white border-none rounded focus:outline-none px-4 py-3 text-lg h-48 resize-none"
            placeholder="Enter note content"
            defaultValue={note?.content || ""}
          ></textarea>
        </div>
        <div className="flex gap-6 justify-center">
          <button
            type="submit"
            name="editbutton"
            value="save"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded transition text-xl"
          >
            Save Note
          </button>
          <button
            type="submit"
            name="editbutton"
            value="discard"
            className="bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-6 rounded transition text-xl"
          >
            Discard
          </button>
        </div>
      </Form>
    </div>
  );
}
