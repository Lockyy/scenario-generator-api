import $ from 'jquery';
import React from 'react';
import Dashboard from './components/Dashboard';
import NewReviewPage from './components/reviews/NewReviewPage';
import CompanyProfilePage from './components/companies/CompanyProfilePage';
import ProductPage from './components/products/ProductPage';
import SearchPage from './components/search/SearchPage';
import { Router, Route } from 'react-router';
import { history } from 'react-router/lib/BrowserHistory';

$(function onLoad() {
  function render() {

    React.render((
      <Router history={history}>
        <Route path="app" component={Dashboard}>
        </Route>
        <Route path="app/reviews/new" component={NewReviewPage}>
        </Route>
        <Route path="app/products/:id" component={ProductPage}>
        </Route>
        <Route path="app/products/:productId/reviews/new" component={NewReviewPage}>
        </Route>
        <Route name="company" path="app/companies/:companyId" component={CompanyProfilePage}>
        </Route>
        <Route name="search" path="app/search/:section/:searchString/:page" component={SearchPage}>
        </Route>
      </Router>
    ),document.getElementById('content'));
  }

  render();
});
