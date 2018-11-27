import React from 'react';
import { Link } from 'react-router-dom';


const imgStyle = {
  width: "3.726rem",
  height: "4.455rem",
}

const badgeStyle = {
  display: 'block',
  marginLeft: 'auto',
  marginRight: 'auto',
}

const PlayerCard = (props) => {
  const { player } = props;
  return(
    <div className="container" style={{ width: "18rem" }}>
      <p>
        <small><em>#{player.tag}</em></small>
      </p>
      <img 
        className="card-img-top" 
        src={_clanIsEmpty(player) ? "..." : player.clan.badge.image} 
        alt="No Clan" 
        style={badgeStyle} />
      <div className="card-body container-fluid">
        <h3 className="card-title"><Link to={`/players/${player.tag}`}>{player.name}</Link></h3>
        <div className="card-text">
          <p>
            <strong>{_clanIsEmpty(player) ? "No Clan" : player.clan.name}</strong>
          </p>
          <p>
            <strong>{player.trophies}</strong> trophies
          </p>
          <p>
            <strong>{player.stats.maxTrophies}</strong> personal record
          </p>
          <p>
            <strong>{player.stats.challengeMaxWins}</strong> Challenge Wins
          </p>
          <p>
            <strong>{player.games.warDayWins}</strong> War Day Wins
          </p>
        </div>
      </div>
      <div className="card-body container-fluid">
        <div className="row">
          <div className="col-xs-3">
            <img src={player.currentDeck[0].icon} alt="card1" style={imgStyle} />
          </div>
          <div className="col-xs-3">
            <img src={player.currentDeck[1].icon} alt="card1" style={imgStyle} />
          </div>
          <div className="col-xs-3">
            <img src={player.currentDeck[2].icon} alt="card1" style={imgStyle} />
          </div>
          <div className="col-xs-3">
            <img src={player.currentDeck[3].icon} alt="card1" style={imgStyle} />
          </div>
        </div>
        <div className="row">
          <div className="col-xs-3">
            <img src={player.currentDeck[4].icon} alt="card1" style={imgStyle} />
          </div>
          <div className="col-xs-3">
            <img src={player.currentDeck[5].icon} alt="card1" style={imgStyle} />
          </div>
          <div className="col-xs-3">
            <img src={player.currentDeck[6].icon} alt="card1" style={imgStyle} />
          </div>
          <div className="col-xs-3">
            <img src={player.currentDeck[7].icon} alt="card1" style={imgStyle} />
          </div>
        </div>
      </div>
      <br />
    </div>
  );
}
const _clanIsEmpty = (player) => {
  if (player.clan === null) {
    return true;
  }
  return false;
}

export default PlayerCard;