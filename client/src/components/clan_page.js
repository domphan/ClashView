import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchClan } from '../actions';
import _ from 'lodash';

class ClanPage extends Component {
  componentDidMount() {
    this.props.fetchClan();
    console.log(this.props);
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
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { clan: state.clan};
}

export default connect(mapStateToProps, { fetchClan })(ClanPage);