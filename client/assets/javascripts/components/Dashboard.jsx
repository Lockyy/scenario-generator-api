import React from 'react';
import _ from 'lodash';
import Section from './Section';
import RecentlyAddedSection from './RecentlyAddedSection';
import DashboardStore from '../stores/DashboardStore'
import FluxDashboardActions from '../actions/FluxDashboardActions'

function sumSizeFunc(item) {
  return item.props.size;
}

class Dashboard extends React.Component {
  constructor() {
    super();

    this.state = {data: []};
  }

  componentDidMount() {
    DashboardStore.listen(this.onChange.bind(this));
    FluxDashboardActions.fetchData();
  }

  getRecentlyAddedData() {
    let recentlyAddedData = _.find(this.state.data, function(section) {
      return section.type === 'recently_added'
    });

    return recentlyAddedData ? recentlyAddedData : {items: []};
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
    let paginationParams = {
      type: sectionName,
      offset: section.getOffset(),
      max: section.getMax()
    };

    section._rows++;
    FluxDashboardActions.loadMoreProducts(sectionName, paginationParams)
  }

  render() {
    let recentlyAddedData = this.getRecentlyAddedData();
    let addMoreRecentlyAddedCb = this.showMoreProducts.bind(this, 'recently_added');

    return (<div className='sections'>
      {_.isUndefined(recentlyAddedData) || !recentlyAddedData.items.length ?
        <div /> :
        <RecentlyAddedSection ref='recently_added'
                              onShowMore={addMoreRecentlyAddedCb} {...recentlyAddedData}/>}
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
