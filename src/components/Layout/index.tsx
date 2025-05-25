import { Outlet } from "react-router-dom";
import Header from "../Header";

const Layout = () => {
  return (
    <>
      <Header />

      <main className="w-full max-w-7xl mx-auto">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
