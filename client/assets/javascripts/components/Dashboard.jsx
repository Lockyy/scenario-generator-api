import React from 'react';
import _ from 'lodash';
import Section from './Section';
import RecentlyAddedSection from './RecentlyAddedSection';
import MostPopularSection from './MostPopularSection';
import DashboardStore from '../stores/DashboardStore'
import DashboardConstants from '../utils/DashboardConstants'
import FluxDashboardActions from '../actions/FluxDashboardActions'

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

  getCurrentIDs(sectionName) {
    let sectionsToExclude = [DashboardConstants.MOST_POPULAR_SECTION, DashboardConstants.RECENTLY_ADDED_SECTION];
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
              if(typeof a[0] === 'object') { return obj.name }
              // If it's an array of tags, just check the tag directly.
              return obj
            })
          }
        })
      };
    });
  }

  getSections() {
    return {recently_added: this.refs.recently_added}
  }

  getSection(name) {
    return this.getSections()[name];
  }

  showMoreProducts(sectionName) {
    let section = this.getSection(sectionName);
    let paginationParams = {};
    paginationParams[sectionName] = {
      offset: section.getOffset(),
      max: section.getMax()
    };
    paginationParams['ids'] = JSON.stringify(this.getCurrentIDs(sectionName))

    section.setState({rows: section.state.rows + 1});
    FluxDashboardActions.loadMoreProducts(paginationParams)
  }

  render() {
    let recentlyAddedData = this.getRecentlyAddedData();
    let addMoreRecentlyAddedCb = this.showMoreProducts.bind(this,
      DashboardConstants.RECENTLY_ADDED_SECTION);

    let mostPopularData = this.getMostPopularData();
    return (<div className='sections'>
      {_.isUndefined(recentlyAddedData) || !recentlyAddedData.items.length ?
        <div /> :
        <RecentlyAddedSection ref={DashboardConstants.RECENTLY_ADDED_SECTION}
          onShowMore={addMoreRecentlyAddedCb} {...recentlyAddedData}/>}
      {_.isUndefined(mostPopularData) || !mostPopularData.items.products.length ?
        <div /> :
        <MostPopularSection ref={DashboardConstants.MOST_POPULAR_SECTION}
          {...mostPopularData}/>}
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
