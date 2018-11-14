import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { sortTable } from '../actions';
import _ from 'lodash';

class PlayerTable extends Component {
  renderPlayers() {
    const { members } = this.props.clan;
    let i = 1;
    return _.map(members, member => {
      return (
        <tr key={member.tag}>
          <th scope="row">{i++}</th>
          <td><Link to={`/players/${member.tag}`}>{member.name}</Link></td>
          <td>{member.tag}</td>
          <td>{member.trophies}</td>
          <td>{member.donations}</td>
          <td>{member.donations_delta}</td>
        </tr>
      );
    });
  }
  renderHeaders(clan, title, header) {
    return (
      <th scope="col">
        <span className="sortSymbols" onClick={() => this.props.sortTable(clan, header, false)}><big>↿</big></span>
        {title}
        <span className="sortSymbols" onClick={() => this.props.sortTable(clan, header, true)}><big>⇂</big></span>
      </th>
    );
  }
  render() {
    const { clan } = this.props;
    return(
      <div>
        <h1>Players</h1>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              {this.renderHeaders(clan, "Name", "name")}
              {this.renderHeaders(clan, "Tag", "tag")}
              {this.renderHeaders(clan, "Trophies", "trophies")}
              {this.renderHeaders(clan, "Donations", "donations")}
              {this.renderHeaders(clan, "Donations Delta", "donations_delta")}
            </tr>
          </thead>
          <tbody>
            {this.renderPlayers()}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    clan: state.clan,
    auth: state.auth
  };
}
export default connect(mapStateToProps, { sortTable })(PlayerTable);