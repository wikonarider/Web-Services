import "./App.css";
import { Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Register from "./components/Register/Register";
import YourAccount from "./components/YourAccount/YourAccount";

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={Home} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/account" component={YourAccount} />
    </div>
  );
}

export default App;
