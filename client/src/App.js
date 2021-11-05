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

// MATERIAL UI
import { ThemeProvider } from "@material-ui/core";
import theme from "./utils/MuiTheme";

function App() {
  // cargamos la cookie en el estado de redux
  // cada vez hau haya alguna modificaficion de algun componente
  const dispatch = useDispatch();
  const objGlobal = useSelector((state) => state.objGlobal);
  const cookie = useSelector((state) => state.cookie);

  useEffect(() => {
    dispatch(setCookie(document.cookie.split("userId=")[1]));
  }, [cookie, dispatch]);

  useEffect(() => {
    dispatch(getServices(objGlobal));
  }, [objGlobal, dispatch]);

  useEffect(() => {
    dispatch(getGroups());
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
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
      </div>
    </ThemeProvider>
  );
}

export default App;
