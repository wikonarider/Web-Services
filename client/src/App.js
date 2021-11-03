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

function App() {
  // cargamos la cookie en el estado de redux
  // cada vez hau haya alguna modificaficion de algun componente
  const dispatch = useDispatch();
  const objGlobal = useSelector((state) => state.objGlobal);

  useEffect(() => {
    dispatch(setCookie(document.cookie));
  });

  useEffect(() => {
    dispatch(getServices(objGlobal));
  }, [objGlobal, dispatch]);

  useEffect(() => {
    dispatch(getGroups());
  }, []);

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
      <Route exact path="/users/:id" component={UserProfile} />
    </div>
  );
}

export default App;
