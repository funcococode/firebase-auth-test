import './App.css';
import Signup from "./components/Signup"
import Dashboard from "./components/Dashboard"
import { AuthProvider } from './contexts/AuthContext';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Login from './components/Login';
import ForgetPassword from './components/ForgetPassword';

function App() {

  return (
    <>
    <Router>
      <AuthProvider>
        <div style={{maxWidth:"500px"}} className="App container mx-auto grid items-center p-24 py-12 bg-blue-100">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/signup" element={<Signup/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/passwordreset" element={<ForgetPassword/>} />
          </Routes>
        </div>
      </AuthProvider>  
    </Router>
   </> 
  );
}

export default App;
