import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import './app.css'
import Home from './Pages/Home/home'
import Login from './Pages/Login/login'
import DeleteImage from './Components/DeleteImage/deleteImage';
function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/DeleteImage' element={<DeleteImage />} />
      </Routes>
    </Router> 
  );
}

export default App;
