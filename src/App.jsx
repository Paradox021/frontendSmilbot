import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Saludo from './pages/SaludoPage'
import Navbar from './components/Navbar'
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
        <Route path="/login" element={<PublicRoute><Login/></PublicRoute>} />
        <Route path="/home" element={<PrivateRoute><Saludo /></PrivateRoute>} />
        <Route path="/" element={<PrivateRoute><Saludo /></PrivateRoute>} />
        <Route path="*" element={<PrivateRoute><h1>Not Found</h1></PrivateRoute>} />
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
