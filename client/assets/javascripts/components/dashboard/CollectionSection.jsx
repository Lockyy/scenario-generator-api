import React from 'react/addons';
const ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
import _ from 'lodash';
import TextHelper from '../../utils/helpers/TextHelper'
import CollectionBox from '../collections/CollectionBox';
import SectionRow from '../SectionRow';
import Section from '../Section';

class CollectionSection extends React.Component {
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

    return sectionRows.map(function mapRows(sectionRow, index) {
      return (<SectionRow key={`recent_activity_row_${index}`} items={sectionRow}/>);
    });
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
      activity.push(<CollectionBox
                      size={this.getCurrentBoxSize(activity, item)}
                      collection={item}
                      key={`collection_box_${item.id}`} />);

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

CollectionSection.displayName = 'CollectionSection';

CollectionSection.defaultProps = {
  cols: 4,
  title: 'Recent Public Collections'
};

CollectionSection.propTypes = {
  cols: React.PropTypes.number.isRequired,
  items: React.PropTypes.array.isRequired,
  title: React.PropTypes.string.isRequired,
  itemsClass: React.PropTypes.string
};

export default CollectionSection;
