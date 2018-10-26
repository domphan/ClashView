import React, { Component } from 'react';
import PlayerCard from './player_card';
import { connect } from 'react-redux';
import { fetchFavorites } from '../actions/favorites';


class FavoritePage extends Component {
  componentWillMount() {
    const { auth } = this.props;
    if (!auth.authenticated) {
      this.props.history.push('/login');
    }
    if (this.props.favorites.error === undefined) {
      this.props.fetchFavorites(this.props.auth.user.api_key);
    }
  }

  renderFavorites() {
    const { favorites } = this.props;
    return Object.keys(favorites).map(item => {
      return (
        <div className="col-md-3">
          <PlayerCard player={favorites[item]} />
        </div>
      );
    })
  }

  render() {
    const { error } = this.props.favorites;
    return (
      <div className="container">
        <h1>Your Favorited Players</h1>
        <hr></hr>
        <div className="container">
          <div className="row">
            {!error ? this.renderFavorites() : error}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    favorites: state.favorites,
    auth: state.auth
  };
}

export default connect(mapStateToProps, { fetchFavorites })(FavoritePage);