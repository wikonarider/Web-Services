import "./App.css";
import { Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import CreateService from "./components/CreateService/CreateService";
import DetailService from "./components/DetailService/DetailService";
import YourAccount from "./components/YourAccount/YourAccount";
import Chat from "./components/chat/chat";
import React from "react";

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={Home} />
      <Route exact path="/chat" component={Chat} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/service" component={CreateService} />
      <Route
        exact
        path="/services/:id"
        render={({ match }) => {
          return <DetailService id={match.params.id} />;
        }}
      />
      <Route exact path="/account" component={YourAccount} />
      <Route exact path="/login" component={Login} />
    </div>
  );
}

export default App;
