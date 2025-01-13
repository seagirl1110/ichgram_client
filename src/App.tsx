import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import AuthRegister from './pages/authRegister';
import AuthLogin from './pages/authLogin';
import Profile from './pages/profile';

export const BASE_URL = 'http://127.0.0.1:3333';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigate to={'/login'} />} />
        <Route path="/register" element={<AuthRegister />} />
        <Route path="/login" element={<AuthLogin />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
