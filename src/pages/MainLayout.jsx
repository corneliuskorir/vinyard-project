import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { VisitsProvider } from "../providers/VisitsProvider";

function MainLayout() {
  return (
    <>
      <Header />
      <VisitsProvider>
        <Outlet />
      </VisitsProvider>
      <Footer />
    </>
  );
}

export default MainLayout;
