import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './AuthContext';
import Layout from './components/Layout';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import ParkingMap from './pages/ParkingMap';
import Vehicles from './pages/Vehicles';
import History from './pages/History';
import Analytics from './pages/Analytics';
import LotManager from './pages/LotManager';
import LotDesigner from './pages/LotDesigner';
import PathVisualizer from './pages/PathVisualizer';
import Locations from './pages/Locations';
import MyBooking from './pages/MyBooking';
import BookParking from './pages/BookParking';
import SlotFeatureEditor from './pages/SlotFeatureEditor';
import ParkingAreaView from './pages/ParkingAreaView';
import VerifyOtp from './pages/VerifyOtp';
import BillGenerator from './pages/BillGenerator';
import LoadingScreen from './components/LoadingScreen';
import NotFound from './pages/NotFound';
import './App.css';

function ProtectedRoute({ children, roles }: { children: React.ReactNode; roles?: string[] }) {
  const { user, loading } = useAuth();
  if (loading) return <LoadingScreen />;
  if (!user) return <Navigate to="/login" />;
  if (roles && !roles.includes(user.role)) return <Navigate to="/dashboard" />;
  return <>{children}</>;
}

function AppRoutes() {
  const { user } = useAuth();
  return (
    <Routes>
      <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Landing />} />
      <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login />} />
      <Route path="/register" element={user ? <Navigate to="/dashboard" /> : <Register />} />
      <Route path="/verify-otp" element={user ? <Navigate to="/dashboard" /> : <VerifyOtp />} />

      <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/locations" element={<Locations />} />
        <Route path="/my-booking" element={<MyBooking />} />
        <Route path="/book" element={<BookParking />} />
        <Route path="/map/:lotId" element={<ParkingMap />} />
        <Route path="/vehicles" element={<Vehicles />} />
        <Route path="/history" element={<History />} />
        <Route path="/pathfinder/:lotId" element={<PathVisualizer />} />
        <Route path="/parking-area/:lotId" element={<ParkingAreaView />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/admin" element={
          <ProtectedRoute roles={['ADMIN']}><AdminDashboard /></ProtectedRoute>
        } />
        <Route path="/analytics/:lotId" element={
          <ProtectedRoute roles={['ADMIN']}><Analytics /></ProtectedRoute>
        } />
        <Route path="/lot-manager" element={
          <ProtectedRoute roles={['ADMIN']}><LotManager /></ProtectedRoute>
        } />
        <Route path="/lot-designer/:lotId" element={
          <ProtectedRoute roles={['ADMIN']}><LotDesigner /></ProtectedRoute>
        } />
        <Route path="/slot-features/:lotId" element={
          <ProtectedRoute roles={['ADMIN']}><SlotFeatureEditor /></ProtectedRoute>
        } />
        <Route path="/bills" element={<BillGenerator />} />
      </Route>
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

