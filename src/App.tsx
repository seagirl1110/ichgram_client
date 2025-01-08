import { Route, Routes } from 'react-router-dom'
import './App.css'
import AuthRegister from './pages/authRegister'

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/register' element={<AuthRegister />} />
      </Routes>
    </div>
  )
}

export default App
