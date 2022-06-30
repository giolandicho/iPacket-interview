import React from 'react'
import './index.css'
import User from '../../components/User'


function Home({users, likeUser}) {

  const handleLike = (e, i) => {
    e.preventDefault();
    likeUser(i);
  }
  return (
    <div className='main-container'>
      {users && users.map((user,i) => {
        return(
          <User
            key={i} 
            picture={user.picture.large}
            name={user.name.title+' '+user.name.first+' '+user.name.last}
            email={user.email}
            phone={user.cell}
            idea={user.idea}
            onLike={(e) => handleLike(e, i)}
          />
        )
      })}
    </div>
  )
}

export default Home