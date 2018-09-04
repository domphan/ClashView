import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPlayer } from '../actions/player';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }
  onInputChange(field, value) {
    this.setState({ [field]: value })
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.fetchPlayer(this.state.search);
  }

  render() {
    const { search } = this.state;
    return(
      <div className="container">
        <h1>Player Lookup</h1>
        <br />
        <form onSubmit={this.handleSubmit}>
          <div className="form-group row">
            <div className="col-md-4">
              <input
                name="search"
                required
                type="text"
                className="form-control"
                id="search"
                placeholder="player tag example: #LPLUR0CL"
                autoComplete="off"
                value={search}
                onChange={event => this.onInputChange("search", event.target.value)}
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary"
            >
              Search
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    player: state.player,
  };
}

export default connect(mapStateToProps, { fetchPlayer })(withRouter(SearchForm));