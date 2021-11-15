import "./App.css";
import React from "react";
import axios from "axios";
import { Route } from "react-router-dom";
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
import ResetPassword from "./components/resetPassword/resetPassword";
import {
  setCookie,
  getServices,
  getGroups,
  getUserInfo,
  setStatusOrder,
  setCartStorage,
  getProvinces,
} from "./redux/actions";
import Chat from "./components/Chat/UserChat/Chat";
import { getOrder, createOrder } from "./utils/orders";

//DARK-MODE
import { putDark } from "./redux/actions";
import { lightTheme, darkTheme } from "./utils/MuiTheme";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

function App() {
  const dispatch = useDispatch();
  const objGlobal = useSelector((state) => state.objGlobal);
  const cookie = useSelector((state) => state.cookie);
  const darkGlobal = useSelector((state) => state.darkTheme);
  const order = useSelector((state) => state.order);

  // ------------------ Cuando tiene cookie(logueado) ------------//
  useEffect(() => {
    if (cookie) {
      // --------------------- Info del usuario ---------------------- //
      getUserInfo()
        .then((userInfo) => dispatch(userInfo))
        .catch(() => console.log("Error getUserInfo"));

      // ------------- Manejo de la orden del carrito -------------- //
      getOrder()
        .then((data) => {
          if (!order) {
            const cart = JSON.parse(localStorage.getItem("state"));
            // Tenia orden, y agrego cosas deslogueado
            if (Array.isArray(cart) && cart.length > 0) {
              const filter = [...cart];
              data.forEach((element) => {
                const index = filter.findIndex((e) => e.id === element.id);
                if (index === -1) {
                  filter.push(element);
                }
              });
              createOrder(filter.map((s) => s.id))
                .then((data) => console.log(data))
                .catch((e) => console.log(e.response.data.message));

              dispatch(setCartStorage(filter));
              dispatch(setStatusOrder(true));
              // Tenia orden, y localStorage vacio
            } else {
              dispatch(setCartStorage(data));
              dispatch(setStatusOrder(true));
            }
          }
        })
        // No tenia orden en el back
        .catch(() => {
          const cart = JSON.parse(localStorage.getItem("state"));

          // Tenia cosas en localstorage
          if (cart) {
            createOrder(cart.map((s) => s.id))
              .then(() => dispatch(setStatusOrder(true)))
              .catch((e) => console.log(e.response.data.message));

            // No tenia orden, no habia nada en localstorage
          } else {
            createOrder([])
              .then(() => dispatch(setStatusOrder(true)))
              .catch((e) => console.log(e.response.data.message));
          }
        });
    }
    // eslint-disable-next-line
  }, [cookie]);

  // ---------------- UseEffect Inicial --------------------- //
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    // hay token en localStorage
    if (token && userId) {
      axios.defaults.headers.common["authorization"] = "Bearer " + token;
      dispatch(setCookie(userId));
    }
    dispatch(getGroups());
    dispatch(getProvinces());

    //seteando dark theme según local storage
    const darkLocal = localStorage.getItem("darkMode");

    if (darkLocal === "true") {
      dispatch(putDark(true));
    }
    // eslint-disable-next-line
  }, []);

  // --------------- Carga los servicios --------------- //
  useEffect(() => {
    dispatch(getServices(objGlobal));
  }, [objGlobal, dispatch]);

  return (
    <ThemeProvider theme={darkGlobal ? darkTheme : lightTheme}>
      <CssBaseline />

      <div className="App">
        <Route exact path="/" component={Landing} />
        <Route
          exact
          path="/resetPassword/:id"
          render={({ match }) => (
            <ResetPassword resetPassword={match.params.id} />
          )}
        />

        <Route exact path="/home">
          <Nav route={"home"} />
          <NavSpace route={"home"} />
          <Home />
        </Route>

        <Route
          exact
          path="/chat"
          render={({ match }) => (
            <div>
              <Nav route={""} />
              <NavSpace />
              <Chat id={match.params.id} />
            </div>
          )}
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
                <NavSpace />
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
      </div>
    </ThemeProvider>
  );
}

export default App;
