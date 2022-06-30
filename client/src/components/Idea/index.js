import React from 'react'

function Idea({idea, forWho, cost, time}) {
  return (
    <div>
        <div>
            <h3>
                It is a {idea} for {forWho}
            </h3>
        </div>
        <div>
            <h4>
                Cost: ${cost} million
            </h4>
        </div>
        <div>
            <h4>
                Estimated Time to Completion: {time} months
            </h4>    
        </div> 
    </div>
  )
}

export default Idea