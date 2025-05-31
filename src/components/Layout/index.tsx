import { Outlet } from "react-router-dom";
import Header from "../Header";

const Layout = () => {
  return (
    <>
      <Header />

      <main className="w-full max-w-7xl mx-auto px-3">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
