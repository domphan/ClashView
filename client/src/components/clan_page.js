import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchClan, sortTable, updateClan } from '../actions';
import ApiInfo from './api_info';
import ClanForm from './clan_form';
import PlayerTable from './player_table';
import PicHeader from './pic_header';
const wizPic = require('../assets/wizard.png')


class ClanPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editting: false,
    };
  }
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

  componentDidUpdate(prevProps) {
    const { auth } = this.props;
    if (prevProps.clan.clan_tag !== this.props.clan.clan_tag) {
      this.setState({
        editting: false,
      });
    }
    if (prevProps.auth.user.api_key !== auth.user.api_key) {
      this.props.fetchClan(auth.user.api_key);
    }
  }

  refreshClan() {
    const { clan, auth } = this.props;
    this.props.updateClan(clan.clan_tag, clan.id, auth.user.api_key);
  }

  editClan() {
    this.setState({ 
      editting: true,
    });
  }

  renderEdit() {
    const editButton = "btn btn-warning glyphicon glyphicon-edit";
    if (this.state.editting) {
      return (
        <span className="pull-left">
          <ClanForm />
        </span>
      );
    } else {
      return (
        <button
          className={editButton}
          onClick={this.editClan.bind(this)}
        />
      );
    }
  }

  render() {
    const { auth, clan } = this.props;
    if (clan.error) {
      if (clan.error === "no clan") {
        return (
          <div className="container">
            <h3>It looks like you haven't added a clan. Add a clan using their clan tag here:</h3>
            <ClanForm />
          </div>
        );
      }
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
        <div className="container" style={containerStyle}>
          <PicHeader title={clan.name} image={wizPic} caption={`#${clan.clan_tag}`} />
          <hr></hr>
          <div>
            <span className="pull-right">
              {this.renderEdit()}
              <span> </span>
              <button
                className={inProgress ? disabled : refreshButton}
                onClick={this.refreshClan.bind(this)}
              />
            </span>
          </div>
          <h4>Members: {clan.member_amount}</h4>
          <h4>Donations per week: {clan.donations_per_week}</h4>
          <h4>Worst Donator: {clan.weakest_link}</h4>
          <h4>Inactive this week: <small>{clan.inactive_members}</small></h4>
          <hr></hr>
          <PlayerTable />
        </div>
      );
    }
    return(
      <div className="container">loading</div>
    );
  }
}

const containerStyle = {
  marginTop: '1rem',
}

const mapStateToProps = (state) => {
  return { 
    clan: state.clan,
    auth: state.auth,
  };
}

export default connect(mapStateToProps, { fetchClan, sortTable, updateClan })(ClanPage);