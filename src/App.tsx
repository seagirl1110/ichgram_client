import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import AuthRegister from './pages/authRegister';
import AuthLogin from './pages/authLogin';
import Home from './pages/home';
import Profile from './pages/profile';
import ProtectedRoute from './components/protectedRoute';
import { isTokenValid } from './utils/auth';

export const BASE_URL = 'http://127.0.0.1:3333';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={<Navigate to={isTokenValid() ? '/home' : '/login'} />}
        />
        <Route path="/register" element={<AuthRegister />} />
        <Route path="/login" element={<AuthLogin />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile/:userId"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
