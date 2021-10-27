import "./App.css";
import { Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Register from "./components/Register/Register";
import CreateService from "./components/CreateService/CreateService";
import DetailService from "./components/DetailService/DetailService";
import YourAccount from "./components/YourAccount/YourAccount";

function App() {
  return (
    <div className="App">
      <Route exact path="/home" component={Home} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/service" component={CreateService} />
      <Route exact path="/services/:id" render={({match})=>{
        return <DetailService id={match.params.id} />
      }} />
      <Route exact path="/account" component={YourAccount} />
    </div>
  );
}

export default App;
