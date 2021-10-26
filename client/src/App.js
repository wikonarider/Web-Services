import "./App.css";
import { Typography } from "@mui/material";
import { Provider } from 'react-redux';
import { Route, BrowserRouter } from 'react-router-dom';
import {store} from '../src/redux/store/index'
import Home from './components/Home/Home'
import DetailService from "./components/DetailService/DetailService";
// useEffects(()=>{})


function App() {
  return (

    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <Route exact path='/home' component={Home} />
          <Route exact path='/services/:id' render={({match})=>{
        return <DetailService id={match.params.id} /> }} />
     </BrowserRouter>
      </Provider>

    </div>
  );
}


export default App;
