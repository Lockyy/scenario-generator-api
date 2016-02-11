import React from 'react';
import _ from 'lodash';
import { Lifecycle } from 'react-router'
import DashboardStore from '../../stores/DashboardStore'
import DashboardConstants from '../../utils/constants/DashboardConstants'
import FluxDashboardActions from '../../actions/FluxDashboardActions'
import RecentlyAddedSection from './RecentlyAddedSection';
import MostPopularSection from './MostPopularSection';
import RecentActivitySection from './RecentActivitySection';
import BasedOnTagsSection from './BasedOnTagsSection';
import CollectionSection from './CollectionSection';

function sumSizeFunc(item) {
  return item.props.size;
}

const Dashboard = React.createClass({
  displayName: 'Dashboard',

  contextTypes: {
    currentUser: React.PropTypes.object.isRequired
  },

  childContextTypes: {
    currentUser: React.PropTypes.object.isRequired
  },

  getChildContext: function() {
    return {'currentUser': this.context.currentUser};
  },

  getDefaultProps: function() {
    return {
      data: {
        items: []
      }
    }
  },

  getInitialState: function() {
    return {
      data: {}
    };
  },

  componentDidMount: function() {
    DashboardStore.listen(this.onChange);
    FluxDashboardActions.fetchData();
  },

  componentWillUnmount: function() {
    let welcomeMessage = $('#welcome-message');
    welcomeMessage.stop().slideUp('slow');
  },

  getRecentlyAddedData: function() {
    let recentlyAddedData = this.state.data[DashboardConstants.RECENTLY_ADDED_SECTION];
    return recentlyAddedData ? recentlyAddedData : {items: {products: [], tags: []}};
  },

  getMostPopularData: function() {
    let mostPopularData = this.state.data[DashboardConstants.MOST_POPULAR_SECTION];
    return mostPopularData ? mostPopularData : {items: []};
  },

  getRecentActivityData: function() {
    let recentActivityData = this.state.data[DashboardConstants.RECENT_ACTIVITY_SECTION];
    return recentActivityData ? recentActivityData : {items: []};
  },

  getBasedOnTagsData: function() {
    let basedOnTagsData = this.state.data[DashboardConstants.BASED_ON_TAGS_SECTION];
    return basedOnTagsData ? basedOnTagsData : {items: {}};
  },

  getCollectionsData: function() {
    let collectionsData = this.state.data[DashboardConstants.COLLECTIONS_SECTION];
    return collectionsData ? collectionsData : {items: {}};
  },

  getCurrentIDs: function(sectionName) {
    let sectionsToExclude = [
      DashboardConstants.MOST_POPULAR_SECTION,
      DashboardConstants.RECENTLY_ADDED_SECTION,
      DashboardConstants.BASED_ON_TAGS_SECTION
    ];

    let sectionToExclude, products, sectionIDs;
    let idsToExclude = [];

    for(let i = 0; i < sectionsToExclude.length; i++) {
      sectionToExclude = sectionsToExclude[i]
      if(sectionToExclude == sectionName) {
        continue
      }

      let section = this.getSection(sectionToExclude);

      if (_.isEmpty(section)) {
        return;
      }

      products = section.fetchProducts()
      sectionIDs = _.map(products, function(obj) { return obj.props.id })
      idsToExclude = _.union(idsToExclude, sectionIDs)
    }
    return idsToExclude
  },

  getSections: function() {
    return {
      recently_added: this.refs.recently_added,
      based_on_tags: this.refs.based_on_tags,
      most_popular: this.refs.most_popular,
      recent_activity: this.refs.recent_activity,
      collections: this.refs.collections
    }
  },

  onChange: function(data) {
    this.setState(function(oldData) {
      return {
        // Merge the old data with the new data
        data: _.merge(oldData.data, data.data, function(a, b) {
          // We only do comparisons if the attribute being merged is an array, that means
          // that it is a collection of either tags or products
          if (_.isArray(a)) {
            // Concatinate the arrays and return the unique values. We do this because
            // The old values will sometimes contain more products than are displayed,
            // but the offset we sent was based upon the amount displayed, so we remove
            // any products that might be in the old and new data.
            return _.uniq(a.concat(b), function(obj) {
              // If it's an array of products, check the objects name attribute.
              if(typeof a[0] === 'object') { return `${obj.name}${obj.id}` }
              // If it's an array of tags, just check the tag directly.
              return obj
            })
          }
        })
      };
    });
  },

  getSection: function(name) {
    return this.getSections()[name];
  },

  showMoreProducts: function(sectionName) {
    let section = this.getSection(sectionName);
    let paginationParams = {};

    paginationParams[sectionName] = {
      offset: section.getOffset(),
      limit: section.getMax(),
    };
    paginationParams['ids'] = JSON.stringify(this.getCurrentIDs(sectionName))

    FluxDashboardActions.loadMoreProducts(paginationParams, function(data) {
      if (_.isEmpty(data[sectionName].items)) {
        section.setState({hasPagination: false});
      } else {
        section.setState({rows: section.state.rows + 1});
      }
    })
  },

  render: function() {

    let basedOnTagsData = this.getBasedOnTagsData();
    let addMoreBasedOnTagsCb = this.showMoreProducts.bind(this, DashboardConstants.BASED_ON_TAGS_SECTION);

    let recentlyAddedData = this.getRecentlyAddedData();
    let addMoreRecentlyAddedCb = this.showMoreProducts.bind(this, DashboardConstants.RECENTLY_ADDED_SECTION);

    let mostPopularData = this.getMostPopularData();

    let recentActivityData = this.getRecentActivityData();
    let addMoreRecentActivityCb = this.showMoreProducts.bind(this, DashboardConstants.RECENT_ACTIVITY_SECTION);

    let collectionsData = this.getCollectionsData();
    let collectionsSectionCb = this.showMoreProducts.bind(this, DashboardConstants.COLLECTIONS_SECTION);

    return (<div className='sections'>

      {_.isUndefined(recentlyAddedData) || !recentlyAddedData.items.products.length ?
        <div /> :
        <RecentlyAddedSection ref={DashboardConstants.RECENTLY_ADDED_SECTION}
          onShowMore={addMoreRecentlyAddedCb} {...recentlyAddedData}/>
      }

      {_.isUndefined(basedOnTagsData) || _.isEmpty(basedOnTagsData.items) ?
        <div /> :
        <BasedOnTagsSection ref={DashboardConstants.BASED_ON_TAGS_SECTION}
          onShowMore={addMoreBasedOnTagsCb} {...basedOnTagsData}/>
      }

      {_.isUndefined(mostPopularData) || !mostPopularData.items.length ?
        <div /> :
        <MostPopularSection ref={DashboardConstants.MOST_POPULAR_SECTION}
          {...mostPopularData}/>
      }

      {_.isUndefined(recentActivityData) || !recentActivityData.items.length ?
        <div /> :
        <RecentActivitySection ref={DashboardConstants.RECENT_ACTIVITY_SECTION}
          onShowMore={addMoreRecentActivityCb} {...recentActivityData}/>
      }

      {_.isUndefined(collectionsData) || !collectionsData.items.length ?
        <div /> :
        <CollectionSection ref={DashboardConstants.COLLECTIONS_SECTION}
          onShowMore={collectionsSectionCb} {...collectionsData}/>
      }

    </div>);
  }
});

export default Dashboard;
