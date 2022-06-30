import React, {useState} from 'react'
import "./index.css"
import LikedUser from '../../components/LikedUser'
import Header from '../../components/Header';
import { useEffect } from 'react';

function Likes() {
  
  const [rejectAll, setRejectAll] = useState(false)
  const [sortedData, setSortedData] = useState()
  const [rejectedUser, setRejectedUser] = useState()
  const [sortType, setSortType] = useState('shortest')
  const [maxCost, setMaxCost] = useState();
  const [maxTime, setMaxTime] = useState('');
  

  const getDataFromLocalStorage = () => {
    const likedUserString = localStorage.getItem('likes')
    const likedUser = JSON.parse(likedUserString);
    return likedUser;
  }
  
  const handleRejection = (e, email) => {
    //e.preventDefault();
    let userList = sortedData.slice()
    userList.forEach((user) => {
      if(user.email === email){
        userList.splice(userList.indexOf(user), 1)
        localStorage.setItem('likes', JSON.stringify(userList))
        setRejectedUser(user);
      }
    })
  }
  const handleRejectAll = (e) => {
    e.preventDefault();
    setSortedData([]);
    localStorage.clear()
    setRejectAll(true)
  }

  useEffect(() => {
    const likedUser = getDataFromLocalStorage();
    setSortedData(likedUser)
  }, [rejectedUser])

  useEffect(() => {
    const sortUsers = (type) => {
      console.log(type)
      let userList = sortedData.slice() //
      if(type ==='longest'){
        userList.sort((a,b) => {
          return b.idea.time - a.idea.time
        })
        setSortedData(userList)
      }
      if(type ==='shortest'){
        userList.sort((a,b) => {
          return a.idea.time - b.idea.time
        })
        setSortedData(userList)
      }
      if(type ==='high'){
        userList.sort((a,b) => {
          return b.idea.cost - a.idea.cost
        })
        setSortedData(userList)
      }
      if(type === 'low'){
        userList.sort((a,b) => {
          return a.idea.cost - b.idea.cost
        })
        setSortedData(userList)
      }
      else return;
      console.log(sortedData)
    }
    sortedData && sortUsers(sortType);
  }, [sortType])
  useEffect(() => {
    const handleMaxCost = (type) => {
      const users = getDataFromLocalStorage();
      if(type === 'all'){
        setSortedData(users);
      }
      if(type === 'half'){
         const filter = users.filter((user) => {
          return user.idea.cost < 50;
        })
        setSortedData(filter);
      }
      if(type === 'ten'){
        const filter = users.filter((user) => {
          return user.idea.cost < 10;
        })
        setSortedData(filter);
      }
      if(type === 'five'){
        const filter = users.filter((user) => {
          return user.idea.cost < 5;
        })
        setSortedData(filter);
      }
    }
    maxCost && handleMaxCost(maxCost)
  }, [maxCost])
  useEffect(() => {
    const handleMaxTime = (type) => {
      const users = getDataFromLocalStorage();
      if(type === 'max'){
        setSortedData(users);
      }
      if(type === 'year'){
         const filter = users.filter((user) => {
          return user.idea.time < 12;
        })
        setSortedData(filter);
      }
      if(type === 'half'){
        const filter = users.filter((user) => {
          return user.idea.time < 6;
        })
        setSortedData(filter);
      }
      if(type === 'quarter'){
        const filter = users.filter((user) => {
          return user.idea.time < 3;
        })
        setSortedData(filter);
      }
    }
    maxTime && handleMaxTime(maxTime)
  }, [maxTime])
  return (
    <div className='main-container'>
      {sortedData && sortedData.length > 0 &&
        <Header 
        rejectAll={handleRejectAll} 
        handleSortType={e => setSortType(e)}
        handleMaxCost={e => setMaxCost(e)}
        handleMaxTime={e => setMaxTime(e)}/>
      }
      {sortedData && 
      sortedData.map((user,i) => {
        return(
          <LikedUser
            key={i} 
            picture={user.picture.large}
            name={user.name.title+' '+user.name.first+' '+user.name.last}
            email={user.email}
            phone={user.cell}
            idea={user.idea}
            rejectUser={(e) => handleRejection(e, user.email)}
            allRejected={rejectAll}
          />
        )
      })}
      {(!sortedData || sortedData.length === 0) && 
          <h1>
            No candidates liked yet!
          </h1>
      }
    </div>
  )
}

export default Likes