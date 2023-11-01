import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import App from './App.jsx';
import Home from './pages/Home.jsx';
import Signup from './pages/Signup.jsx';
import Login from './pages/Login';
import ErrorPage from './pages/ErrorPage';
import Profile from './pages/Profile.jsx';

//Front end routing 
const router = (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  </Router>
);


ReactDOM.createRoot(document.getElementById('root')).render(router);