import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Saludo from './pages/SaludoPage'
import Navbar from './components/Navbar'
import LoginPage from './pages/LoginPage'
import { AuthProvider, useAuth } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute'
import Login from './pages/Login'


const AppContent = () => {
  const { isAuthenticated } = useAuth();

  return (
    <>
      {isAuthenticated && <Navbar />}
      <Routes>
        <Route path="/test" element={<PublicRoute><Login/></PublicRoute>} />
        <Route path="/login" element={<PublicRoute><LoginPage/></PublicRoute>} />
        <Route path="/" element={<PrivateRoute><Saludo /></PrivateRoute>} />
      </Routes>
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App
