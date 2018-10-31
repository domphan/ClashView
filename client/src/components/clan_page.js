import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchClan, sortTable, updateClan } from '../actions';
import ApiInfo from '../components/api_info';
import _ from 'lodash';

class ClanPage extends Component {
  componentWillMount() {
    const { auth } = this.props;
    if (!auth.authenticated) {
      this.props.history.push('/login');
    }
  }

  componentDidMount() {
    if (this.props.clan.error === undefined) {
      const { auth } = this.props;
      if (auth.user.api_key) {
        this.props.fetchClan(auth.user.api_key);
      }
    }
  }

  componentDidUpdate() {
    // Need to handle internal state change
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

  refreshClan() {
    const { clan, auth } = this.props;
    this.props.updateClan(clan.clan_tag, clan.id, auth.user.api_key);
  }

  render() {
    const { auth, clan } = this.props;
    if (clan.error) {
      return(
        <div className="container">{clan.error}</div>
      );
    }
    if (!auth.user.api_key) {
      return(
        <ApiInfo />
      );
    }
    if (clan.clan_tag) {
      const { inProgress } = this.props.clan;
      const refreshButton = "btn btn-success glyphicon glyphicon-refresh";
      const disabled = "btn btn-success glyphicon glyphicon-refresh disabled";
      return (
        <div className="container">
          <h1>
            {clan.name}
            <span className="pull-right">
              <button 
                className={inProgress ? disabled : refreshButton}
                onClick={this.refreshClan.bind(this)} 
              />
            </span>
          </h1>
          <hr></hr>
          <h3>#{clan.clan_tag}</h3>
          <h4>Members: {clan.member_amount}</h4>
          <h4>Donations per week: {clan.donations_per_week}</h4>
          <h4>Weakest Link: {clan.weakest_link}</h4>
          <h4>Inactive members: {clan.inactive_members}</h4>
          <hr></hr>
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

export default connect(mapStateToProps, { fetchClan, sortTable, updateClan })(ClanPage);