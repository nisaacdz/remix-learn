import { NavLink } from "@remix-run/react";

export default function MainNavigation() {
  return (
    <div className="py-8 bg-slate-800 flex gap-12 justify-center text-lg font-semibold">
      <NavLink to="/" className="">
        Home
      </NavLink>
      <NavLink to="/notes">My notes</NavLink>
    </div>
  );
}
