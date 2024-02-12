import { Routes, Route } from 'react-router-dom';
import Register from "./components/authentication/Register"
import Login from "./components/authentication/Login"
import Header from './components/main-content/header/Header';
import ProfileCard from './components/main-content/profile-card/ProfileCard';
import './App.css';

function App() {
  return (
    <>
      <Header />
      <main className='font-inter bg-off_black min-h-[calc(100vh-90px)] text-white grid place-items-center pl-6 pr-6 pt-24 pb-24'>
        <Routes>
          <Route
            index
            element={<Register />}
          />
          <Route
            path='login'
            element={<Login />}
          />
          <Route
            path='social-links'
            element={<ProfileCard />}
          />
        </Routes>
      </main>
    </>
  )
}

export default App
