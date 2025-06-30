import React, { useContext } from 'react';
import Sidebar from '../components/Dashboard/Sidebar';
import DashboardMain from '../components/Dashboard/DashboardMain';
import "../Assets/CSS/User.css";
import LoginContext from '../Context/LoginContext';

function User() {
  const { favorites = [] } = useContext(LoginContext);

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <DashboardMain favorites={favorites} />
    </div>
  );
}

export default User;
