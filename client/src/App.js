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
import { setCookie, getServices, getGroups } from "./redux/actions";
import CheckoutDetail from "./components/CheckoutDetail/CheckoutDetail";
import axios from "axios";
import CreateService from "./components/CreateService/CreateService";

function App() {
  // cargamos la cookie en el estado de redux
  // cada vez hau haya alguna modificaficion de algun componente
  const dispatch = useDispatch();
  const objGlobal = useSelector((state) => state.objGlobal);
  const cookie = useSelector((state) => state.cookie);

  useEffect(() => {
    axios
      .get("/login")
      .then((response) => dispatch(setCookie(response.data.cookie)))
      .catch(() => dispatch(setCookie("")));
  }, []);

  useEffect(() => {
    dispatch(getServices(objGlobal));
  }, [objGlobal, dispatch]);

  useEffect(() => {
    dispatch(getGroups());
  }, [dispatch]);

  return (
    <div className="App">
      <Route exact path="/" component={Landing} />
      <Route exact path="/home" component={Home} />
      <Route exact path="/chat" component={Chat} />
      <Route
        exact
        path="/services/:id"
        render={({ match }) => {
          return <DetailService id={match.params.id} />;
        }}
      />
      <Route exact path="/account" component={YourAccount} />
      <Route
        exact
        path="/users/:id"
        render={({ match }) => {
          return <UserProfile id={match.params.id} />;
        }}
      />

      <Route exact path="/checkout" component={CheckoutDetail} />
      <Route exact path='/createservice' component={CreateService} />
    </div>
  );
}

export default App;
