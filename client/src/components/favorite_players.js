import React, { Component } from 'react';
import PlayerCard from './player_card';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { fetchFavorites } from '../actions/favorites';
import PicHeader from './pic_header';
const knightSkelePic = require('../assets/knight_skeles.png');


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
      if (item === "status") {
        return null;
      }
      return (
        <div className="col-md-3">
          <PlayerCard player={favorites[item]} />
        </div>
      );
    })
  }

  render() {
    const { favorites } = this.props
    const { error } = favorites;
    return (
      <div className="container" style={containerStyle}>
        <PicHeader 
          title={"Favorited Players"}
          image={knightSkelePic} />
        <hr></hr>
        <div className="container-fluid">
          <div className="row">
            {Object.keys(favorites).length === 0 && 
              "Loading... this may take awhile"}
            {favorites.status === 200 && Object.keys(favorites).length === 1 && emptyMessage}
            {!error ? this.renderFavorites() : error}
          </div>
        </div>
      </div>
    );
  }
}

const containerStyle = {
  marginTop: '1rem',
}
const emptyMessage = "You have no favorites, why don't you view some players and add some?";
const mapStateToProps = (state) => {
  return {
    favorites: state.favorites,
    auth: state.auth
  };
}

export default connect(mapStateToProps, { fetchFavorites })(withRouter(FavoritePage));