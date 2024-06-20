import { Outlet } from "react-router-dom";
import Header from "../components/Header";

function RootRoute() {
  return (
    <div className="absolute inset-0 m-auto flex flex-col items-center">
      <Header />
      <main className="mt-8">
        <Outlet />
      </main>
    </div>
  );
}

export default RootRoute;
