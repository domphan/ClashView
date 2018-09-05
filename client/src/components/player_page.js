import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import SearchForm from './search_form';
import { newSearch, fetchPlayer } from '../actions/player';

class PlayerPage extends Component {
  componentWillUnmount() {
    this.props.newSearch();
  }
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchPlayer(id)
  }
  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      console.log("updated with: ");
      console.log(this.props.player);
      this.forceUpdate();
    }
  }
  render() {
    const { player } = this.props;
    if (player.error) {
      return(
        <div className="container">
          {player.error}
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
        <h1>{player.name}</h1>
        <h2>{player.tag}</h2>
        <h3>Trophies: {player.trophies}</h3>
        <h3>Clan: {player.clan.name} <small>(#{player.clan.tag})</small></h3>
        <h4>Games: {player.games.total}</h4>
        <h5>Max challenge wins: {player.stats.challengeMaxWins}</h5>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { 
    player: state.player,
  }
}

export default connect(mapStateToProps, { newSearch, fetchPlayer })(PlayerPage);