import React from 'react';

function Footer() {
  return (
    <footer class='bg-secondary flex-row justify-content-around'>
      <a href='https://github.com/tbreazier' target='blank'>
          <img src={require('../assets/github2.png')} className='footer-icon' alt='logo'></img>
          <h4>Tom</h4>
        </a>
        <a href='https://github.com/joshuaweisbrodtorres' target='blank'>
          <img src={require('../assets/github2.png')} className='footer-icon' alt='logo'></img>
          <h4>Joshua</h4>
        </a>
        <a href='https://github.com/DariusJWright' target='blank'>
          <img src={require('../assets/github2.png')} className='footer-icon' alt='logo'></img>
          <h4>Darius</h4>
        </a>
        <a href='https://github.com/layc41' target='blank'>
          <img src={require('../assets/github2.png')} className='footer-icon' alt='logo'></img>
          <h4>Claudia</h4>
        </a>
        <a href='https://github.com/asaldana1108' target='blank'>
          <img src={require('../assets/github2.png')} className='footer-icon' alt='logo'></img>
          <h4>Alvaro</h4>
        </a>
        <a href='https://github.com/Joey-Ramos' target='blank'>
          <img src={require('../assets/github2.png')} className='footer-icon' alt='logo'></img>
          <h4>Joey</h4>
        </a>
    </footer>
  );
}

export default Footer;