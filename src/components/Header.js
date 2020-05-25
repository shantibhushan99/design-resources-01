import React from 'react';
import logo from '../images/logo.png';
import { YouTube } from '@material-ui/icons';
import WebIcon from '@material-ui/icons/Web';

const Header = () => {
  return (
    <nav className='nav'>
      <div className='logo'>
        <a href='index'>
          <img className='logo-image' alt='Logo' src={logo} />
        </a>
        <p className='logo-desc'>Dev World</p>
      </div>

      <h1 className='header-title'>Design Resources For Developers</h1>
      <div className='social-media-icons'>
        <a
          href='https://www.youtube.com/channel/UCrm-HTaESqxJXyxMcZFOHng'
          target='_blank'
          rel='noopener noreferrer'
        >
          <YouTube className='social-logo' />
        </a>
        <a
          href='https://dev-world.info'
          target='_blank'
          rel='noopener noreferrer'
        >
          <WebIcon className='social-logo' />
        </a>
      </div>
    </nav>
  );
};

export default Header;
