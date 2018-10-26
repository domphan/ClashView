import React from 'react';


const imgStyle = {
  width: "46px",
  height: "55px"
}

const PlayerCard = (props) => {
  const { player } = props;
  return(
    <div className="card" style={{ width: "18rem" }}>
      <small><em>#{player.tag}</em></small>
      <img className="card-img-top" src={("clan" in player) ? player.clan.badge.image : "..."} alt="Error loading" />
      <div className="card-body">
        <h3 className="card-title">{player.name}</h3>
        <div className="card-text">
          <p>
            <strong>{player.clan.name}</strong>
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
        </div>
      </div>
      <div className="card-body">
        <div className="row">
          <div className="col-md-3">
            <img src={player.currentDeck[0].icon} alt="card1" style={imgStyle} />
          </div>
          <div className="col-md-3">
            <img src={player.currentDeck[1].icon} alt="card1" style={imgStyle} />
          </div>
          <div className="col-md-3">
            <img src={player.currentDeck[2].icon} alt="card1" style={imgStyle} />
          </div>
          <div className="col-md-3">
            <img src={player.currentDeck[3].icon} alt="card1" style={imgStyle} />
          </div>
        </div>
        <div className="row">
          <div className="col-md-3">
            <img src={player.currentDeck[4].icon} alt="card1" style={imgStyle} />
          </div>
          <div className="col-md-3">
            <img src={player.currentDeck[5].icon} alt="card1" style={imgStyle} />
          </div>
          <div className="col-md-3">
            <img src={player.currentDeck[6].icon} alt="card1" style={imgStyle} />
          </div>
          <div className="col-md-3">
            <img src={player.currentDeck[7].icon} alt="card1" style={imgStyle} />
          </div>
        </div>
      </div>
      <br />
    </div>
  );
}

export default PlayerCard;