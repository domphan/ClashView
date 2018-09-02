import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchClan, sortTable } from '../actions';
import _ from 'lodash';

class ClanPage extends Component {
  componentDidMount() {
    this.props.fetchClan();
  }

  renderPlayers() {
    const { members } = this.props.clan;
    let i = 1;
    return _.map(members, member => {
      return (
        <tr key={member.tag}>
          <th scope="row">{i++}</th>
          <td>{member.name}</td>
          <td>{member.tag}</td>
          <td>{member.trophies}</td>
          <td>{member.donations}</td>
          <td>{member.donations_delta}</td>
        </tr>
      );
    });
  }

  render() {
    const { clan } = this.props;
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
              <th scope="col" onClick={() => this.props.sortTable(clan, "name")}>Player</th>
              <th scope="col" onClick={() => this.props.sortTable(clan, "tag")}>Tag</th>
              <th scope="col" onClick={() => this.props.sortTable(clan, "trophies")}>Trophies</th>
              <th scope="col" onClick={() => this.props.sortTable(clan, "donations")}>Donations</th>
              <th scope="col" onClick={() => this.props.sortTable(clan, "donations_delta")}>Delta</th>
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
  return { clan: state.clan };
}

export default connect(mapStateToProps, { fetchClan, sortTable })(ClanPage);