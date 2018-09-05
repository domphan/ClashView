import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchClan, sortTable } from '../actions';
import _ from 'lodash';

class ClanPage extends Component {
  componentDidMount() {
    if (this.props.clan.error === undefined) {
      this.props.fetchClan();
    }
  }

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
    return(
      <th scope="col">
        <span className="sortSymbols" onClick={() => this.props.sortTable(clan, header, false)}><big>↿</big></span>
        {title}
        <span className="sortSymbols" onClick={() => this.props.sortTable(clan, header, true)}><big>⇂</big></span>
      </th>
    );
  }

  render() {
    const { auth } = this.props;
    if (!auth.authenticated) {
      this.props.history.push('/login');
    }
    const { clan } = this.props;
    if (clan.error) {
      return(
        <div className="container">{clan.error}</div>
      );
    }
    if (clan.clan_tag) {
      return (
        <div className="container">
          <h1>{clan.name}</h1>
          <h3>#{clan.clan_tag}</h3>
          <h4>Members: {clan.member_amount}</h4>
          <h4>Donations per week: {clan.donations_per_week}</h4>
          <h4>Weakest Link: {clan.weakest_link}</h4>
          <h4>Inactive members: {clan.inactive_members}</h4>
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
    return(
      <div className="container">loading</div>
    );
  }
}

const mapStateToProps = (state) => {
  return { 
    clan: state.clan,
    auth: state.auth,
  };
}

export default connect(mapStateToProps, { fetchClan, sortTable })(ClanPage);