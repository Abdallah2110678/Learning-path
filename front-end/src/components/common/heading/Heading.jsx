import React from "react"

const Heading = ({ subtitle, title }) => {
  return (
    <>
      <div id='heading'>
         <h1>{subtitle} </h1>
        <h3>{title} </h3>
       
      </div>
    </>
  )
}

export default Heading
