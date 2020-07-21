import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Form from "./Form/Form"
import Dashboard from "./Dashboard"
import * as serviceWorker from './serviceWorker';
import { Route, BrowserRouter, Switch, Redirect} from 'react-router-dom'
import ProtectedRoute from "./ProtectedRoute";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Switch>
        <Route path="/auth" component={Form} />
        <ProtectedRoute path="/dashboard" component={Dashboard} />
        <Redirect from="/" to={{pathname: '/login'}}/>
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
