import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import api from './services/api';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ResetPasswordConfirm from './pages/ResetPasswordConfirm';
import CreateKahoot from './pages/CreateKahoot';
import GameRoom from './pages/GameRoom';
import SelectKahoot from './pages/SelectKahoot';
import WaitingRoom from './pages/WaitingRoom';
import PlayKahoot from './pages/PlayKahoot';
import Quiz from './pages/Quiz';
import Ranking from './pages/Ranking';
import './index.css';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('access');
    if (token) {
      api.get('/')
        .then(response => {
          console.log('User data fetched:', response.data);
          setUser(response.data);
        })
        .catch(error => {
          console.error('Error fetching user data:', error);
          setUser(null);
        });
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home user={user} />} />
        <Route path='/login' element={<Login setUser={setUser} />} />
        <Route path='/register' element={<Register setUser={setUser} />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/password-reset-confirm/:uidb64/:token' element={<ResetPasswordConfirm />} />
        <Route path='/create-kahoot' element={<CreateKahoot user={user} />} />
        <Route path='/select-kahoot' element={<SelectKahoot user={user} />} />
        <Route path='/waiting-room/:gameId' element={<WaitingRoom user={user} />} />
        <Route path='/play-kahoot/:gameId' element={<PlayKahoot user={user} />} />
        <Route path='/game-room' element={<GameRoom user={user} />} />
        <Route path='/quiz' element={<Quiz user={user} />} />
        <Route path='/ranking' element={<Ranking user={user} />} />
      </Routes>
    </Router>
  );
}

export default App;