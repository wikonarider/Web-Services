import './App.css';
import React from 'react';
import axios from 'axios';
import { Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Home from './components/Home/Home';
import DetailService from './components/DetailService/DetailService';
import YourAccount from './components/YourAccount/YourAccount';
import Landing from './components/Landing/Landing';
import UserProfile from './components/UserProfile/UserProfile';
import CheckoutDetail from './components/CheckoutDetail/CheckoutDetail';
import CreateService from './components/CreateService/CreateService';
import Nav from './components/Nav/Nav';
import NavSpace from './components/Nav/NavSpace';
import {
  setCookie,
  getServices,
  getGroups,
  getUserInfo,
} from './redux/actions';
import Chat from './components/Chat/UserChat/Chat';

//DARK-MODE
import { putDark } from './redux/actions';
import { lightTheme, darkTheme } from './utils/MuiTheme';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

function App() {
  const dispatch = useDispatch();
  const objGlobal = useSelector((state) => state.objGlobal);
  const cookie = useSelector((state) => state.cookie);
  const darkGlobal = useSelector((state) => state.darkTheme);

  useEffect(() => {
    if (cookie) {
      getUserInfo()
        .then((userInfo) => dispatch(userInfo))
        .catch(() => console.log('Error getUserInfo'));
    }
    // eslint-disable-next-line
  }, [cookie]);
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    // hay token en localStorage
    if (token && userId) {
      axios.defaults.headers.common['authorization'] = 'Bearer ' + token;
      dispatch(setCookie(userId));
    }
    dispatch(getGroups());

    //seteando dark theme según local storage
    const darkLocal = localStorage.getItem('darkMode');

    if (darkLocal === 'true') {
      dispatch(putDark(true));
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    dispatch(getServices(objGlobal));
  }, [objGlobal, dispatch]);

  return (
    <ThemeProvider theme={darkGlobal ? darkTheme : lightTheme}>
      <CssBaseline />
      <div className="App">
        <Route exact path="/" component={Landing} />

        <Route exact path="/home">
          <Nav route={'home'} />
          <Home />
        </Route>

        <Route
          exact
          path="/chat/:id"
          render={({ match }) => <Chat id={match.params.id} />}
        />

        <Route
          exact
          path="/services/:id"
          render={({ match }) => {
            return (
              <div>
                <Nav route={'servicesId'} />
                <NavSpace />
                <DetailService id={match.params.id} />
              </div>
            );
          }}
        />

        <Route exact path="/account">
          {cookie ? (
            <div>
              <Nav route={'account'} />
              <NavSpace />
              <YourAccount />
            </div>
          ) : (
            <Nav route={''} />
          )}
        </Route>

        <Route
          exact
          path="/users/:id"
          render={({ match }) => {
            return (
              <div>
                <Nav route={'users'} />
                <UserProfile id={match.params.id} />
              </div>
            );
          }}
        />

        <Route exact path="/checkout">
          {cookie ? (
            <div>
              <Nav route={'checkout'} />
              <NavSpace />
              <CheckoutDetail />
            </div>
          ) : (
            <Nav route={''} />
          )}
        </Route>

        <Route exact path="/createservice">
          {cookie ? <CreateService /> : <Nav route={''} />}
        </Route>
      </div>
    </ThemeProvider>
  );
}

export default App;
