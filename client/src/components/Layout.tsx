import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { LayoutDashboard, Car, History, BarChart3, LogOut, Shield, Navigation, Building2, MapPin, CalendarPlus, IndianRupee } from 'lucide-react';
import smartParkLogo from '../assets/image.png';
import './Layout.css';

export default function Layout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="layout">
      <aside className="sidebar">
        <div className="sidebar-brand">
          <img src={smartParkLogo} alt="SmartPark" className="sidebar-logo" />
        </div>

        <nav className="sidebar-nav">
          <NavLink to="/dashboard" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <LayoutDashboard size={18} /> <span>Dashboard</span>
          </NavLink>
          <NavLink to="/locations" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <MapPin size={18} /> <span>Locations</span>
          </NavLink>
          <NavLink to="/my-booking" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <Navigation size={18} /> <span>Your Booking</span>
          </NavLink>
          <NavLink to="/book" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <CalendarPlus size={18} /> <span>Book Parking</span>
          </NavLink>
          <NavLink to="/vehicles" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <Car size={18} /> <span>My Vehicles</span>
          </NavLink>
          <NavLink to="/history" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <History size={18} /> <span>History</span>
          </NavLink>
          <NavLink to="/bills" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <IndianRupee size={18} /> <span>Parking Bills</span>
          </NavLink>

          {user?.role === 'ADMIN' && (
            <>
              <div className="nav-divider">Admin</div>
              <NavLink to="/admin" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                <Shield size={18} /> <span>Admin Panel</span>
              </NavLink>
              <NavLink to="/lot-manager" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                <Building2 size={18} /> <span>Manage Lots</span>
              </NavLink>
              <NavLink to="/analytics/demo-lot-1" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                <BarChart3 size={18} /> <span>Analytics</span>
              </NavLink>

            </>
          )}
        </nav>

        <div className="sidebar-footer">
          <div className="user-info">
            <div className="user-avatar">{user?.name?.[0]?.toUpperCase()}</div>
            <div>
              <div className="user-name">{user?.name}</div>
              <div className="user-role">{user?.role}</div>
            </div>
          </div>
          <button className="btn-logout" onClick={handleLogout}>
            <LogOut size={16} />
          </button>
        </div>
      </aside>

      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}
