import "./App.css";
import React from "react";
import axios from "axios";
import { Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Home from "./components/Home/Home";
import DetailService from "./components/DetailService/DetailService";
import YourAccount from "./components/YourAccount/YourAccount";
import Landing from "./components/Landing/Landing";
import UserProfile from "./components/UserProfile/UserProfile";
import CheckoutDetail from "./components/CheckoutDetail/CheckoutDetail";
import CreateService from "./components/CreateService/CreateService";
import Nav from "./components/Nav/Nav";
import NavSpace from "./components/Nav/NavSpace";
import {
  setCookie,
  getServices,
  getGroups,
  getUserInfo,
} from "./redux/actions";
import Chat from "../src/components/Chat/UserChat/Chat";

function App() {
  const dispatch = useDispatch();
  const objGlobal = useSelector((state) => state.objGlobal);
  const cookie = useSelector((state) => state.cookie);

  useEffect(() => {
    if (cookie) {
      getUserInfo()
        .then((userInfo) => dispatch(userInfo))
        .catch(() => console.log("Error getUserInfo"));
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
      <Switch>
        <Route exact path="/" component={Landing} />

        <Route exact path="/home">
          <Nav route={"home"} />
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
                <Nav route={"servicesId"} />
                <NavSpace />
                <DetailService id={match.params.id} />
              </div>
            );
          }}
        />

        <Route exact path="/account">
          {cookie ? (
            <div>
              <Nav route={"account"} />
              <NavSpace />
              <YourAccount />
            </div>
          ) : (
            <Nav route={""} />
          )}
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
          {cookie ? (
            <div>
              <Nav route={"checkout"} />
              <NavSpace />
              <CheckoutDetail />
            </div>
          ) : (
            <Nav route={""} />
          )}
        </Route>

        <Route exact path="/createservice">
          {cookie ? <CreateService /> : <Nav route={""} />}
        </Route>
      </Switch>
    </div>
  );
}

export default App;
