import $ from 'jquery';
import React from 'react';
import Dashboard from './components/Dashboard';
import NewReviewPage from './components/products/NewReviewPage';
import CompanyProfilePage from './components/companies/CompanyProfilePage';
import { Router, Route } from 'react-router';
import { history } from 'react-router/lib/BrowserHistory';

$(function onLoad() {
  function render() {

    React.render((
      <Router history={history}>
        <Route path="app" component={Dashboard}>
        </Route>
        <Route path="app/products/review/new" component={NewReviewPage}>
        </Route>
        <Route name="company" path="app/companies/:companyId" component={CompanyProfilePage}>
        </Route>
      </Router>
    ),document.getElementById('content'));
  }

  render();
});
