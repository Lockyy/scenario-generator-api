import $ from 'jquery';
import React from 'react';
import Dashboard from './components/Dashboard';
import NewReviewPage from './components/reviews/NewReviewPage';
import CompanyProfilePage from './components/companies/CompanyProfilePage';
import UserProfilePage from './components/users/UserProfilePage';
import ProductPage from './components/products/ProductPage';
import TagPage from './components/tags/TagPage';
import SearchPage from './components/search/SearchPage';
import SearchBox from './components/header/SearchBox';
import MyTags from './components/menu/MyTags';
import { Router, Route } from 'react-router';
import { history } from 'react-router/lib/BrowserHistory';
import UserAPI from './utils/api/UserAPI'

$(function onLoad() {
    function render() {
        UserAPI.getCurrentUser(function(currentUser) {
            React.withContext({'currentUser': currentUser}, function() {
                let router = React.render((
                    <Router history={history}>
                        <Route path="app" component={Dashboard}>
                        </Route>
                        <Route path="app/reviews/new" component={NewReviewPage}>
                        </Route>
                        <Route path="app/products/:id" component={ProductPage}>
                        </Route>
                        <Route path="app/products/:productId/reviews/new" component={NewReviewPage}>
                        </Route>
                        <Route path="app/products/:productId/reviews/:reviewId" component={NewReviewPage}>
                        </Route>
                        <Route name="company" path="app/companies/:companyId" component={CompanyProfilePage}>
                        </Route>
                        <Route name="user" path="app/users/:userId" component={UserProfilePage}>
                        </Route>
                        <Route name="search" path="app/search/:section/:search_string/:page" component={SearchPage}>
                        </Route>
                        <Route name="search" path="app/search/:section" component={SearchPage}>
                        </Route>
                        <Route path="app/tags/:tag/:page" component={TagPage}>
                        </Route>
                    </Router>
                ), document.getElementById('content'));

                React.render((
                    <SearchBox router={router} />
                ), $('.search-container')[0]);

                React.render((
                    <MyTags router={router} />
                ), $('.my-tags-container')[0]);
            });
        })
    };

    render();
});
