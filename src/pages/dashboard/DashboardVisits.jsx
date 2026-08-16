import { Outlet } from "react-router-dom";

function DashboardVisits() {
  return (
    <div>
      <h1> Visits</h1>
      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default DashboardVisits;
