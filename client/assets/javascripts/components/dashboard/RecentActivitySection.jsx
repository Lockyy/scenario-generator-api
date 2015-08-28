import React from 'react/addons';
const ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
import _ from 'lodash';
import TextHelper from '../../utils/helpers/TextHelper'
import ReviewBox from '../users/ReviewBox';
import SectionRow from '../SectionRow';
import Section from '../Section';

class RecentActivitySection extends React.Component {
  constructor() {
    super();

    this.state = {
      rows: 1,
      hasPagination: true
    };
  }

  getMax() {
    return 4;
  }

  getOffset() {
    return this.getMax() * this.state.rows;
  }

  getCurrentBoxSize(activity, product) {
    return 1;
  }

  buildRows(activity) {
    let sectionRows = [];
    let rowItems;

    while (activity.length > 0) {
      rowItems = _.last(sectionRows);

      if (!rowItems || rowItems.length >= this.props.cols) {
        rowItems = [];
        sectionRows.push(rowItems);
      }

      rowItems.push(activity.shift());
    }

    return sectionRows.map(function mapRows(sectionRow) {
      return (<SectionRow items={sectionRow}/>);
    });
  }

  formatActivityType(props) {
    return (
      <span><b>{TextHelper.truncate(props.user.name, 15)}</b> wrote a review for:</span>
    );
  }

  fetchActivity() {
    let item;
    let activity = [];
    let hasItems;
    let needsItem;
    let sumItems;
    let currentItem = 0;

    if (_.isEmpty(this.props.items)) return [];

    do {
      item = this.props.items[currentItem++];
      activity.push(<ReviewBox size={this.getCurrentBoxSize(activity, item)} {...item}
        onFormatActivityType={this.formatActivityType} showReadMore={true} />);

      hasItems = this.props.items.length > currentItem;
      sumItems = activity.length;
      needsItem = sumItems < this.state.rows * this.props.cols;

    } while (hasItems && needsItem);

    return this.buildRows(activity);
  }

  render() {
    return (<Section hasPagination={this.state.hasPagination} {...this.props}>
      <ReactCSSTransitionGroup transitionName="section-row">
        {this.fetchActivity()}
      </ReactCSSTransitionGroup >
    </Section>);
  }
}

RecentActivitySection.displayName = 'RecentActivitySection';

RecentActivitySection.defaultProps = {
  cols: 4,
  title: 'Recent Activity'
};

RecentActivitySection.propTypes = {
  cols: React.PropTypes.number.isRequired,
  items: React.PropTypes.array.isRequired,
  title: React.PropTypes.string.isRequired,
  itemsClass: React.PropTypes.string
};

export default RecentActivitySection;
