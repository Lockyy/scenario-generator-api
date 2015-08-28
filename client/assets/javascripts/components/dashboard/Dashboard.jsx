import React from 'react';
import _ from 'lodash';
import DashboardStore from '../../stores/DashboardStore'
import DashboardConstants from '../../utils/constants/DashboardConstants'
import FluxDashboardActions from '../../actions/FluxDashboardActions'
import RecentlyAddedSection from './RecentlyAddedSection';
import MostPopularSection from './MostPopularSection';
import RecentActivitySection from './RecentActivitySection';
import BasedOnTagsSection from './BasedOnTagsSection';

function sumSizeFunc(item) {
  return item.props.size;
}

class Dashboard extends React.Component {
  constructor() {
    super();

    this.state = {data: {}};
  }

  componentDidMount() {
    DashboardStore.listen(this.onChange.bind(this));
    FluxDashboardActions.fetchData();
  }

  getRecentlyAddedData() {
    let recentlyAddedData = this.state.data[DashboardConstants.RECENTLY_ADDED_SECTION];
    return recentlyAddedData ? recentlyAddedData : {items: []};
  }

  getMostPopularData() {
    let mostPopularData = this.state.data[DashboardConstants.MOST_POPULAR_SECTION];
    return mostPopularData ? mostPopularData : {items: {products: [], tags: []}};
  }

  getRecentActivityData() {
    let recentActivityData = this.state.data[DashboardConstants.RECENT_ACTIVITY_SECTION];
    return recentActivityData ? recentActivityData : {items: []};
  }

  getBasedOnTagsData() {
    let basedOnTagsData = this.state.data[DashboardConstants.BASED_ON_TAGS_SECTION];
    return basedOnTagsData ? basedOnTagsData : {items: {}};
  }

  getCurrentIDs(sectionName) {
    let sectionsToExclude = [
      DashboardConstants.MOST_POPULAR_SECTION,
      DashboardConstants.RECENTLY_ADDED_SECTION,
      // TODO
      // DashboardConstants.BASED_ON_TAGS_SECTION
    ];

    let sectionToExclude, products, sectionIDs;
    let idsToExclude = [];

    for(let i = 0; i < sectionsToExclude.length; i++) {
      sectionToExclude = sectionsToExclude[i]
      if(sectionToExclude == sectionName) {
        continue
      }

      products = this.refs[sectionToExclude].fetchProducts()
      sectionIDs = _.map(products, function(obj) { return obj.props.id })
      idsToExclude = _.union(idsToExclude, sectionIDs)
    }
    return idsToExclude
  }

  onChange(data) {
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
            return _.unique(a.concat(b), function(obj) {
              // If it's an array of products, check the objects name attribute.
              if(typeof a[0] === 'object') { return `${obj.name}${obj.id}` }
              // If it's an array of tags, just check the tag directly.
              return obj
            })
          }
        })
      };
    });
  }

  getSections() {
    return this.refs;
  }

  getSection(name) {
    return this.getSections()[name];
  }

  showMoreProducts(sectionName) {
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
  }

  render() {

    let basedOnTagsData = this.getBasedOnTagsData();
    let addMoreBasedOnTagsCb = this.showMoreProducts.bind(this, DashboardConstants.BASED_ON_TAGS_SECTION);

    let recentlyAddedData = this.getRecentlyAddedData();
    let addMoreRecentlyAddedCb = this.showMoreProducts.bind(this, DashboardConstants.RECENTLY_ADDED_SECTION);

    let mostPopularData = this.getMostPopularData();

    let recentActivityData = this.getRecentActivityData();
    let addMoreRecentActivityCb = this.showMoreProducts.bind(this, DashboardConstants.RECENT_ACTIVITY_SECTION);

    return (<div className='sections'>
      {_.isUndefined(basedOnTagsData) || _.isEmpty(basedOnTagsData.items) ?
        <div /> :
        <BasedOnTagsSection ref={DashboardConstants.BASED_ON_TAGS_SECTION}
          onShowMore={addMoreBasedOnTagsCb} {...basedOnTagsData}/>
      }

      {_.isUndefined(recentlyAddedData) || !recentlyAddedData.items.length ?
        <div /> :
        <RecentlyAddedSection ref={DashboardConstants.RECENTLY_ADDED_SECTION}
          onShowMore={addMoreRecentlyAddedCb} {...recentlyAddedData}/>
      }

      {_.isUndefined(mostPopularData) || !mostPopularData.items.products.length ?
        <div /> :
        <MostPopularSection ref={DashboardConstants.MOST_POPULAR_SECTION}
          {...mostPopularData}/>
      }

      {_.isUndefined(recentActivityData) || !recentActivityData.items.length ?
        <div /> :
        <RecentActivitySection ref={DashboardConstants.RECENT_ACTIVITY_SECTION}
          onShowMore={addMoreRecentActivityCb} {...recentActivityData}/>
      }

    </div>);
  }
}

Dashboard.displayName = 'Dashboard';

Dashboard.defaultProps = {
  data: {
    items: []
  }
};

Dashboard.propTypes = {
  data: React.PropTypes.object.isRequired
};

export default Dashboard;
