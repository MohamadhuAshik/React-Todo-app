
import React from 'react'

const Header = ({ title, login, setLogin }) => {

  const logOut = () => {
    localStorage.clear()
    setLogin(false)
    window.location.replace("/React-Todo-app/")
  }
  return (
    <header>

      {
        login ? (<><h1>{title}</h1><button onClick={() => logOut()}>Logout</button></>) : (<><h1>To do list</h1></>)
      }
    </header>
  )
}

Header.defaultProps = {
  title: "To do list"
}

export default Header