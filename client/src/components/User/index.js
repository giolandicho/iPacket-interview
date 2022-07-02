import React from 'react'
import "./index.css"
import Idea from '../Idea'

function User({picture, name, email, phone, idea, onLike}) {
    const handleClick = (e) => {
        e.preventDefault();
        onLike(e);
    }
  return (
    <div>
         <div className='user-container'>
            <div className='picture-container'>
                <img alt='user-pic' src={picture}/>
            </div>
            <div className='name-container'>
                {name}
            </div>
            <div className='email-container'>
                {email}
            </div>
            <div className='phone-container'>
                {phone}
            </div>
            <div className='idea-container'>
                <Idea idea={idea.this} forWho={idea.that} cost={idea.cost} time={idea.time}/>
            </div>
            <div className='button-container'>
                    <button onClick={handleClick}>Like</button>
            </div>
        </div>
    </div>
  )
}

export default User