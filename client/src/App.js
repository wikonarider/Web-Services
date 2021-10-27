import "./App.css";
import { Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Register from "./components/Register/Register";
import DetailService from "./components/DetailService/DetailService";

function App() {
  return (
    <div className="App">
      <Route exact path="/home" component={Home} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/services/:id" render={({match})=>{
        return <DetailService id={match.params.id} />
      }} />
    </div>
  );
}

export default App;
