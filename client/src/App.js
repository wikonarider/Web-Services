import "./App.css";
import { Route } from "react-router-dom";
import Home from "./components/Home/Home";
import DetailService from "./components/DetailService/DetailService";
import YourAccount from "./components/YourAccount/YourAccount";
import Chat from "./components/chat/chat";
import React from "react";
import Landing from "./components/Landing/Landing";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import UserProfile from "./components/UserProfile/UserProfile";
import {
  setCookie,
  getServices,
  getGroups,
  getUserInfo,
} from "./redux/actions";
import CheckoutDetail from "./components/CheckoutDetail/CheckoutDetail";
import axios from "axios";
import CreateService from "./components/CreateService/CreateService";
import Nav from "./components/Nav/Nav";
import NavSpace from "./components/Nav/NavSpace";

function App() {
  const dispatch = useDispatch();
  const objGlobal = useSelector((state) => state.objGlobal);
  const cookie = useSelector((state) => state.cookie);

  useEffect(() => {
    if (cookie) {
      getUserInfo().then((userInfo) => dispatch(userInfo));
    }
    // eslint-disable-next-line
  }, [cookie]);
  useEffect(() => {
    axios
      .get("/login")
      .then((response) => dispatch(setCookie(response.data.cookie)))
      .catch(() => dispatch(setCookie("")));
    dispatch(getGroups());
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    dispatch(getServices(objGlobal));
  }, [objGlobal, dispatch]);

  return (
    <div className="App">
      <Route exact path="/" component={Landing} />
      <Route exact path="/home">
        <Nav route={"home"} />
        <Home />
      </Route>
      <Route exact path="/chat" component={Chat} />
      <Route
        exact
        path="/services/:id"
        render={({ match }) => {
          return (
            <div>
              <Nav route={"servicesId"} />
              <NavSpace />
              <DetailService id={match.params.id} />
            </div>
          );
        }}
      />
      <Route exact path="/account">
        <Nav route={"account"} />
        <NavSpace />
        <YourAccount />
      </Route>
      <Route
        exact
        path="/users/:id"
        render={({ match }) => {
          return (
            <div>
              <Nav route={"users"} />
              <UserProfile id={match.params.id} />
            </div>
          );
        }}
      />

      <Route exact path="/checkout">
        <Nav route={"checkout"} />
        <NavSpace />
        <CheckoutDetail />
      </Route>
      <Route exact path="/createservice" component={CreateService} />
    </div>
  );
}

export default App;
