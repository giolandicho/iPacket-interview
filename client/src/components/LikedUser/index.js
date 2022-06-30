import React from 'react'
import Idea from '../Idea'

function LikedUser({picture, name, email, phone, idea, rejectUser, allRejected}) {

    //const [rejected, setRejected] = useState(false)
    const handleClick = (e) => {
        e.preventDefault()
       // setRejected(true)
        rejectUser(e);
    }
  return (
    <div>
        {!allRejected &&
        <div className='user-container'>
            <div className='picture-container'>
                <img alt='user' src={picture}/>
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
                <button onClick={handleClick}>Reject</button>
            </div>
        </div>
    }
    </div>
  )
}

export default LikedUser