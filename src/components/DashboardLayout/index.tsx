import { Outlet } from "react-router-dom";
import Header from "./Header";

const DashboardLayout = () => {
  return (
    <>
      <section className="w-full max-w-7xl mx-auto px-3">
        <Header />
      </section>

      <main className="w-full max-w-7xl mx-auto px-3 pb-4">
        <Outlet />
      </main>
    </>
  );
};

export default DashboardLayout;
