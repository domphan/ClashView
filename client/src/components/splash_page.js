import React from 'react';
import DisplayCard from './display_card';
const wallpaper = require('../assets/wallpaper.jpg');
const metricsPic = require('../assets/king_mad.png');
const playersPic = require('../assets/mini_pekka.png');
const favoritesPic = require('../assets/knight_skeles.png');
const accountPic = require('../assets/prince_wave.png');

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
  textShadow: '-1px -1px 0px grey, 1px -1px 0px grey, -1px 1px 0px grey, 1px 1px 0px grey',
  color: 'white'
}
const containerStyle = {
  position: 'relative',
  textAlign: 'center',
  paddingTop: '10%',
}

const CardsStyle = {
  marginTop: '10%',
}

const rowStyle = {
  display: 'flex',
  flexWrap: 'wrap'
}

const colStyle = {
  flex: 1,
}

const SplashPage = () => {
  return(
    <div>
      <div className="container" style={splashStyle} />
      <div style={containerStyle}>
        <h1 style={textStyle}>Manage All Things Clash-related</h1>
        <div className='container' style={CardsStyle}>
          <div className='row' style={rowStyle}>
            <div className='col-sm-3' style={colStyle}>
              <DisplayCard
                title="Look up Players"
                text="Use official Clash Royale player tags to view an individual player's current deck
                      and game statistics"
                image={playersPic}
              />
            </div>
            <div className='col-sm-3' style={colStyle}>
              <DisplayCard
                title="Track Players"
                text="Keep track of all your favorite players by adding them to your favorites"
                image={favoritesPic}
              />
            </div>
            <div className='col-sm-3' style={colStyle}>
              <DisplayCard
                title="View Your Clan Metrics"
                text="Track your clanmates and see who's performing or underperforming"
                image={metricsPic}
              />
            </div>
            <div className='col-sm-3' style={colStyle}>
              <DisplayCard
                title="Create an Account"
                text="Store your clan and all your favorites in an account for later use"
                image={accountPic}
              />
            </div>
          </div>
        </div>
      </div>
    </div>


  );
}

export default SplashPage;