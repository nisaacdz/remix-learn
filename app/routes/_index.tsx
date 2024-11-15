import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div className="w-screen h-screen text-center">
      <h1>A better way of keeping track of your notes</h1>
      <h2>Try our early beta and never lose track of your notes again!</h2>
      <p>
        <Link to="/notes">Try now</Link>
      </p>
    </div>
  );
}
