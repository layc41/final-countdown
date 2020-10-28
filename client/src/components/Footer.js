import React from 'react';

function Footer() {
  return (
    <footer className='bg-secondary flex-row justify-content-around'>
      <a href='https://github.com/tbreazier' target='blank'>
          <img src={require('../assets/github2.png')} className='footer-icon' alt='logo'></img>
          <h7>Tom</h7>
        </a>
        <a href='https://github.com/joshuaweisbrodtorres' target='blank'>
          <img src={require('../assets/github2.png')} className='footer-icon' alt='logo'></img>
          <h7>Joshua</h7>
        </a>
        <a href='https://github.com/DariusJWright' target='blank'>
          <img src={require('../assets/github2.png')} className='footer-icon' alt='logo'></img>
          <h7>Darius</h7>
        </a>
        <a href='https://github.com/layc41' target='blank'>
          <img src={require('../assets/github2.png')} className='footer-icon' alt='logo'></img>
          <h7>Claudia</h7>
        </a>
        <a href='https://github.com/asaldana1108' target='blank'>
          <img src={require('../assets/github2.png')} className='footer-icon' alt='logo'></img>
          <h7>Alvaro</h7>
        </a>
        <a href='https://github.com/Joey-Ramos' target='blank'>
          <img src={require('../assets/github2.png')} className='footer-icon' alt='logo'></img>
          <h7>Joey</h7>
        </a>
    </footer>
  );
}

export default Footer;