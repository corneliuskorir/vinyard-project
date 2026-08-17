import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { VisitsProvider } from "../providers/VisitsProvider";
import "../components/MainLayout.css";

function MainLayout() {
  return (
    <div className="layout">
      <Header />
      <VisitsProvider>
        <main className="main-content">
          <Outlet />
        </main>
      </VisitsProvider>
      <Footer />
    </div>
  );
}

export default MainLayout;
