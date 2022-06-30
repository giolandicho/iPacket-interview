import React, { useEffect, useState } from 'react';
import { getUsers } from './API'
import './App.css';
import { Routes, Route, Link, Outlet } from 'react-router-dom';
import Home from './pages/Home';
import Likes from './pages/Likes'

const Nav = () => {
  return(
    <div className="app">
      <nav className="top">
        <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
             <Link to='/likes'>Likes</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  )
}
function App() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    getUsers().then((data) => setUsers(data))
  }, [])

  const handleLike = (i) => {
    const currentUsers = users.slice();
    if(localStorage.getItem('likes') !== null){
      const currentLikesString = localStorage.getItem('likes')
      const currentLikes = JSON.parse(currentLikesString);
      const updatedUsers = currentUsers.filter(user => user !== currentUsers[i]);
      setUsers(updatedUsers);
      currentLikes.push(currentUsers[i]);
      currentLikes[0] === '' && currentLikes.shift();
      localStorage.setItem('likes', JSON.stringify(currentLikes))

    }
    else{
      const currentLikes = [];
      const updatedUsers = currentUsers.filter(user => user !== currentUsers[i]);
      setUsers(updatedUsers);
      currentLikes.push(currentUsers[i]);
      currentLikes[0] === '' && currentLikes.shift();
      localStorage.setItem('likes', JSON.stringify(currentLikes))
    }
  }

  return (
    <Routes>
      <Route path='/' element={<Nav />}>
        <Route index element={<Home users={users} likeUser={(i) => handleLike(i)}/>}/>
        <Route path='likes' element={<Likes/>}/>
      </Route>
    </Routes>
  );
}

export default App;
