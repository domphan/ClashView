import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import promise from 'redux-promise';
import thunk from 'redux-thunk';
import NavBar from './components/nav_bar';

import reducers from './reducers';
import FavoritePage from './components/favorite_players';
import HomePage from './components/home_page';
import LoginPage from './components/login_page';
import SignupPage from './components/signup_page';
import PlayerPage from './components/player_page';
import ClanPage from './components/clan_page';
import setAuthToken from './auth_token';
import { setCurrentUser, logoutUser } from './actions/auth';
import SearchForm from './components/search_form';
import DisplayPage from './components/display_page';


const createStoreWithMiddleware = applyMiddleware(promise, thunk)(createStore);
const store = createStoreWithMiddleware(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));

  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser([]));
    window.location.href = '/login'
  }
}

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <NavBar />
        <Switch>
          <Route path="/account/api_key" component={DisplayPage} />
          <Route path="/players/:id" component={PlayerPage} />
          <Route path="/players" component={SearchForm} />
          <Route path="/favorites" component={FavoritePage} />
          <Route path="/clan" component={ClanPage} />
          <Route path="/signup" component={SignupPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/" component={HomePage} />
        </Switch>
      </div>

    </BrowserRouter>
  </Provider>
  , document.getElementById('root'));
