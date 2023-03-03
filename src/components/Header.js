import DarkModeIcon from '@mui/icons-material/DarkMode'
import React from 'react'

const Header = ({ onClick, darkMode }) => (
  <div className={`header ${darkMode ? 'darkMode' : ''}`}>
    <div className='header-container'>
      <h2 className='logo'>Where in the world ?</h2>
      <div className='switch-mode' onClick={onClick}>
        <DarkModeIcon />
        <h3>Dark Mode</h3>
      </div>
    </div>
  </div>
)

export default Header
