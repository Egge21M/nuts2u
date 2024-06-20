import { Outlet } from "react-router-dom";

function RootRoute() {
  return (
    <div className="absolute inset-0 m-auto flex flex-col items-center mt-8">
      <h1>nuts2u</h1>
      <Outlet />
    </div>
  );
}

export default RootRoute;
