import React from 'react';

function Footer() {
  return (
    <footer className='bg-secondary flex-row justify-content-around'>
      <a href='https://github.com/tbreazier' target='blank'>
          <img src={require('../assets/github2.png')} className='footer-icon' alt='logo'></img>
          <h6 className='footerName'>Tom</h6>
        </a>
        <a href='https://github.com/joshuaweisbrodtorres' target='blank'>
          <img src={require('../assets/github2.png')} className='footer-icon' alt='logo'></img>
          <h6 className='footerName'>Joshua</h6>
        </a>
        <a href='https://github.com/DariusJWright' target='blank'>
          <img src={require('../assets/github2.png')} className='footer-icon' alt='logo'></img>
          <h6 className='footerName'>Darius</h6>
        </a>
        <a href='https://github.com/layc41' target='blank'>
          <img src={require('../assets/github2.png')} className='footer-icon' alt='logo'></img>
          <h6 className='footerName'>Claudia</h6>
        </a>
        <a href='https://github.com/asaldana1108' target='blank'>
          <img src={require('../assets/github2.png')} className='footer-icon' alt='logo'></img>
          <h6 className='footerName'>Alvaro</h6>
        </a>
        <a href='https://github.com/Joey-Ramos' target='blank'>
          <img src={require('../assets/github2.png')} className='footer-icon' alt='logo'></img>
          <h6 className='footerName'>Joey</h6>
        </a>
    </footer>
  );
}

export default Footer;