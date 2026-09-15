
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import AppLayout from './components/layout/AppLayout';
import Dashboard from './pages/Dashboard';
import LoginPage from './pages/LoginPage';
import SettingsPage from './pages/Settings';
import Positions from './pages/Positions';
import Orders from './pages/Orders';
import History from './pages/History';
import Bots from './pages/Bots';

const ProtectedRoutes = () => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <AppLayout />;
};

const LoginRoute = () => {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) return <Navigate to="/" replace />;
  return <LoginPage />;
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginRoute />} />
          <Route path="/" element={<ProtectedRoutes />}>
            <Route index element={<Dashboard />} />
            <Route path="positions" element={<Positions />} />
            <Route path="orders" element={<Orders />} />
            <Route path="history" element={<History />} />
            <Route path="bots" element={<Bots />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
