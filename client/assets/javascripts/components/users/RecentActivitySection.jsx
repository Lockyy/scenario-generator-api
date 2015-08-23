import React from 'react/addons';
const ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
import _ from 'lodash';
import EditReviewBox from './EditReviewBox';
import SectionRow from '../SectionRow';
import Section from '../Section';

function sumSizeFunc(item) {
  return item.props.size;
}

class RecentActivitySection extends React.Component {
  constructor() {
    super();

    this.state = {
      offset: 0,
      rows: 2
    };
  }

  getCurrentBoxSize(reviews, review) {
    return 1;
  }

  buildRows(reviews) {
    let sectionRows = [];
    let row;

    while (reviews.length > 0) {
      row = _.last(sectionRows);

      if (!row || _.sum(row, sumSizeFunc) >= this.props.cols) {
        row = [];
        sectionRows.push(row);
      }

      row.push(reviews.shift());
    }

    return sectionRows.map(function mapRows(sectionRow) {
      return (<SectionRow items={sectionRow}/>);
    });
  }

  fetchReviews() {
    let review;
    let reviews = [];
    let hasItems;
    let needsItem;
    let sumItems;
    let currentItem = 0;

    if (!this.props.items) return [];

    do {
      review = this.props.items[currentItem++];

      debugger;

      reviews.push(<EditReviewBox size={this.getCurrentBoxSize(reviews, review)} {...review} />);

      hasItems = this.props.items.length > currentItem;
      sumItems = _.sum(reviews, sumSizeFunc);
      needsItem = sumItems < this.state.rows * this.props.cols;
    } while (hasItems && needsItem);

    this.state.offset = currentItem;
    return this.buildRows(reviews);
  }

  render() {
    return (<Section {...this.props}>
      <ReactCSSTransitionGroup transitionName="section-row">
        {this.fetchReviews()}
      </ReactCSSTransitionGroup >
    </Section>);
  }
}

RecentActivitySection.displayName = 'RecentActivitySection';

RecentActivitySection.defaultProps = {
  cols: 3,
  rows: 2,
  title: 'Recent Activity'
};

RecentActivitySection.propTypes = {
  cols: React.PropTypes.number.isRequired,
  items: React.PropTypes.array.isRequired,
  title: React.PropTypes.string.isRequired,
  itemsClass: React.PropTypes.string
};

export default RecentActivitySection;
