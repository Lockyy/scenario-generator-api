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
        data: _.merge(oldData.data, data.data, function(a, b) {
          if (_.isArray(a)) { return a.concat(b) }
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
