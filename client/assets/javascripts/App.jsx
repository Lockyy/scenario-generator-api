import $ from 'jquery';
import React from 'react';
import Dashboard from './components/Dashboard';
import { Router, Route } from 'react-router';
import { history } from 'react-router/lib/BrowserHistory';

 $(function onLoad() {
   function render() {

    React.render((
      <Router history={history}>
        <Route path="app" component={Dashboard}></Route>
      </Router>
    ),document.getElementById('content'));
  }

  render();
});
