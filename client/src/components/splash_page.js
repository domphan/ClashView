import React from 'react';
let wallpaper = require('../assets/wallpaper.jpg');

const splashStyle = {
  padding: 0,
  border: 0,
  width: '100%',
  height: '100vh',
  backgroundImage: `url(${wallpaper})`,
  backgroundSize: 'cover',
  filter: 'brightness(30%)',
  display: 'inline-block',
  position: 'absolute',
};

const textStyle = {
  fontSize: '64px',
  textShadow: '2px 2px 0px black, 2px 2px 0px black, 2px 2px 0px black, 2px 2px 0px black',
}
const containerStyle = {
  color: 'white',
  position: 'relative',
  textAlign: 'center',
  paddingTop: '10%',
}

const SplashPage = () => {
  return(
    <div>
      <div className="" style={splashStyle}>
      </div>
      <div style={containerStyle}>
        <h1 style={textStyle}><strong>Track your clan performance and favorite players</strong></h1>
      </div>
    </div>


  );
}

export default SplashPage;