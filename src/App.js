import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import './app.css'
import Home from './Pages/Home/home'
import Login from './Pages/Login/login'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </Router> 
  );
}

export default App;
