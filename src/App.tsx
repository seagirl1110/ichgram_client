import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import AuthRegister from './pages/authRegister';
import AuthLogin from './pages/authLogin';
import Home from './pages/home';
import Profile from './pages/profile';
import ProfileEdit from './pages/profileEdit';
import ProtectedRoute from './components/protectedRoute';
import { isTokenValid } from './utils/auth.ts';
import Explore from './pages/explore/index.tsx';

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
        <Route
          path="/profile/:userId/edit"
          element={
            <ProtectedRoute>
              <ProfileEdit />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile/:userId/create-post"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/explore"
          element={
            <ProtectedRoute>
              <Explore />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
