import { Route, Routes } from 'react-router-dom';
import './App.css';
import AuthRegister from './pages/authRegister';

export const BASE_URL = 'http://127.0.0.1:3333';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/register" element={<AuthRegister />} />
      </Routes>
    </div>
  );
}

export default App;
