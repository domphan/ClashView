import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchFavorites } from '../actions/favorites';
import _ from 'lodash';


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
    return _.map(favorites, favorite => {
      return(
        <tr key={favorite}>
          {favorite}
        </tr>
      );
    })
  }

  render() {
    return (
      <div className="container">
        <h1>Your Favorited Players</h1>
        <hr></hr>
        <tbody>
          {this.renderFavorites()}
        </tbody>
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