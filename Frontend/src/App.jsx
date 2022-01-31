import React , {useEffect} from "react";
import {Helmet} from "react-helmet";
import { Switch, Route } from "react-router-dom";
import Aos from 'aos'
import HomeDemo4 from './pages/HomePage'
import 'aos/dist/aos.css';
import './assets/css/General.css';
import './assets/css/bootstrap.min.css';
import './assets/css/responsive.css';
import { Provider } from 'react-redux';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import store from './store'
import WebSocket from "./utils/WebSocket";
const App = () => {

  useEffect(() => {

    Aos.init({
      duration: 1000
      })
  },[])

  return (
    <Provider store={store()} >
    	<div className="App">
        <Helmet>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
          <title>
            OpenRPG
          </title>
          <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700" rel="stylesheet" />
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" integrity="sha256-eZrrJcwDc/3uDhsdt61sL2oOBY362qM3lon1gyExkL0=" crossorigin="anonymous" />
        </Helmet>
  			<WebSocket/>
        <Switch>
          
          <Route path="/" exact component={HomeDemo4} />
  			</Switch>
	    </div>    
      </Provider>
  );
}

export default App;