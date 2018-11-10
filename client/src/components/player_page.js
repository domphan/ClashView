import React, { Component } from 'react';
import { connect } from 'react-redux';
import { newSearch, fetchPlayer } from '../actions/player';
import { addFavorite, fetchFavorites, removeFavorite } from '../actions/favorites';

class PlayerPage extends Component {
  componentWillUnmount() {
    this.props.newSearch();
  }
  componentDidMount() {
    const { id } = this.props.match.params;
    const { auth, favorites } = this.props;
    this.props.fetchPlayer(id)
    if (Object.keys(favorites).length === 0) {
      this.props.fetchFavorites(auth.user.api_key)
    }
  }
  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      console.log("updated with: ");
      console.log(this.props.player);
      console.log(this.checkIfFavorited())
      this.forceUpdate();
    }
  }
  addFavPlayer() {
    const { player, addFavorite, auth } = this.props;
    addFavorite(auth.user.api_key, player.tag);
  }

  removeFavPlayer() {
    const { player, removeFavorite, auth } = this.props;
    removeFavorite(auth.user.api_key, player.tag);
  }

  // This function handles the favorite button feature
  // Will conditionally render buttons according to 3 states:
  // Loading, Adding, or Loaded
  checkIfFavorited() {
    const { favorites, player, auth } = this.props;
    const favoritesArr = Object.keys(favorites);
    // Check if player is being favorite and fetch new favorites
    if (favorites.refetch) {
      this.props.fetchFavorites(auth.user.api_key);
      return(
        <button
          className="btn btn-warning"
          disabled
        >
          Adding to favorites
        </button>
      );
    }
    // Check if the current player is favorited or not
    // Return the unfavorite button if they are
    for (const value of favoritesArr) {
      if (value === player.tag) {
        return (
          <button 
          className="btn btn-danger"
          onClick={this.removeFavPlayer.bind(this)}
          >
            Unfavorite
          </button>
        );
      }
    }
    // Return the add to favorites button if the player is not favorited
    // and that favorites were completely fetched.
    return (
      <button
        className="btn btn-warning"
        onClick={this.addFavPlayer.bind(this)}
        disabled={Object.keys(favorites).length === 0 ? true : false}
      >
        {Object.keys(favorites).length === 0 ? "Loading favorites" : "Add to favorites"}
      </button>
    );
  }

  render() {
    const { player } = this.props;
    if (player.error) {
      return(
        <div className="container">
          {player.message}
        </div>
      );
    }
    if (!player.name) {
      return (
        <div className="container">
          <em>Loading</em>
        </div>
      );
    }
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-11">
            <h1><strong>{player.name}</strong></h1>
            <h2>{player.tag}</h2>
            <h3>Trophies: {player.trophies} {player.arena.name}</h3>
            <h3>Clan: {player.clan.name} <small>(#{player.clan.tag})</small></h3>
            <h4>Games: {player.games.total}</h4>
            <h5>Max challenge wins: {player.stats.challengeMaxWins}</h5>
            <h5>Total Donations: {player.stats.totalDonations}</h5>
            <h4>War day wins: {player.games.warDayWins}</h4>
            <h4>W/L/D: {player.games.winsPercent}/{player.games.lossesPercent}/{player.games.drawsPercent}</h4>
          </div>
          <div className="col-md-1">
            {this.checkIfFavorited()}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { 
    player: state.player,
    auth: state.auth,
    favorites: state.favorites
  }
}

export default connect(mapStateToProps, { 
  newSearch, 
  fetchPlayer, 
  addFavorite, 
  fetchFavorites, 
  removeFavorite 
})(PlayerPage);