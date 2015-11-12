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
import SearchBox from './components/header/SearchBox';
import UserTags from './components/users/UserTags';
import Notifications from './components/notifications/Notifications';
import UserBookmarks from './components/users/UserBookmarks';
import MyRecentActivity from './components/menu/MyRecentActivity';
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
                    </Router>
                ), document.getElementById('content'));

                React.render((
                    <SearchBox router={router} />
                ), $('.search-container')[0]);

                React.render((
                    <UserTags router={router} showMessage={_.isEmpty(currentUser.tags)} showTitle={true}
                      message='Adding tags will update your News Feed with the latest news from the ones you follow'
                      messageClass='no-content'/>
                ), $('.my-tags-container')[0]);

                React.render((
                    <UserBookmarks router={router} showMessage={false} showTitle={true} sidebar={true} />
                ), $('.my-bookmarks-container')[0]);

                React.render((
                    <MyRecentActivity router={router} />
                ), $('.my-recent-activity-container')[0]);

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
