import "./App.css";
import { Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Register from "./components/Register/Register";

function App() {
  return (
    <div className="App">
      <Route exact path="/home" component={Home} />
      <Route exact path="/register" component={Register} />
    </div>
  );
}

export default App;
