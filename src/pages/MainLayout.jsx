import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { VisitsProvider } from "../providers/VisitsProvider";
import "../components/MainLayout.css";

function MainLayout() {
  return (
    <>
      <Header />
      <div className="main-content">
        <VisitsProvider>
          <Outlet />
        </VisitsProvider>
        <Footer />
      </div>
    </>
  );
}

export default MainLayout;
