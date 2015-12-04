import $ from 'jquery';
import React from 'react';
import _ from 'lodash';
import ga from 'react-google-analytics';
import Dashboard from './components/dashboard/Dashboard';
import NewReviewPage from './components/reviews/NewReviewPage';
import CompanyProfilePage from './components/companies/CompanyProfilePage';
import UserProfilePage from './components/users/UserProfilePage';
import ProductPage from './components/products/ProductPage';
import TagPage from './components/tags/TagPage';
import TagsPage from './components/tags/TagsPage';
import SearchPage from './components/search/SearchPage';
import CollectionPage from './components/collections/CollectionPage';
import CollectionsPage from './components/collections/CollectionsPage';
import SearchBox from './components/header/SearchBox';
import Sidebar from './components/Sidebar';
import Notifications from './components/notifications/Notifications';
import ModalManager from './components/ModalManager';
import FluxCurrentUserActions from './actions/FluxCurrentUserActions';
import { Router, Route } from 'react-router';
import { history } from 'react-router/lib/BrowserHistory';
import UserAPI from './utils/api/UserAPI'

let GAInitiailizer = ga.Initializer;

$(function onLoad() {
    function render() {
        UserAPI.getCurrentUser(function(currentUser) {

            FluxCurrentUserActions.updateData(currentUser);

            ga('create', 'UA-52961131-2', 'auto');
            let onRouterTransition = function() {
                ga('send', 'pageview')
            }
            onRouterTransition()

            React.withContext({'currentUser': currentUser}, function() {
                let router = React.render((
                    <Router history={history} onUpdate={onRouterTransition}>
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
                        <Route name="search" path="app/search" component={SearchPage}>
                        </Route>
                        <Route path="app/tag/:tag/products/:page" component={TagPage}>
                        </Route>
                        <Route path="app/tags" component={TagsPage}>
                        </Route>
                        <Route path="app/tags/:letter" component={TagsPage}>
                        </Route>
                        <Route path="app/directory/collections" component={CollectionsPage}>
                        </Route>
                        <Route name='CollectionPage' path="app/collections/:id" component={CollectionPage}>
                        </Route>
                    </Router>
                ), document.getElementById('content'));

                React.render((
                    <SearchBox router={router} />
                ), $('.search-container')[0]);

                React.render((
                    <Sidebar router={router} />
                ), $('#hamburger-menu')[0]);

                React.render((
                    <GAInitiailizer/>
                ), $('#analytics')[0]);

                React.render((
                    <Notifications router={router} />
                ), $('#notifications')[0]);

                React.render((
                    <ModalManager router={router} />
                ), $('#modals')[0]);
            });
        })
    };

    render();
});
