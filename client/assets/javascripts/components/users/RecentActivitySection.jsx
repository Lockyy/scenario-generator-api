import React from 'react/addons';
const ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
import _ from 'lodash';
import EditReviewBox from './EditReviewBox';
import ReviewBox from './ReviewBox';
import Section from '../Section';
import SectionRow from '../SectionRow';

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

    if (_.isEmpty(this.props.items)) return [];

    do {
      review = this.props.items[currentItem++];

      let box = this.props.editable ?
        <EditReviewBox size={this.getCurrentBoxSize(reviews, review)} {...review} /> :
        <ReviewBox size={this.getCurrentBoxSize(reviews, review)} {...review} />;

      reviews.push(box);

      hasItems = this.props.items.length > currentItem;
      sumItems = _.sum(reviews, sumSizeFunc);
      needsItem = sumItems < this.state.rows * this.props.cols;
    } while (hasItems && needsItem);

    this.state.offset = currentItem;
    return this.buildRows(reviews);
  }

  render() {
    return (<Section hasPagination={this.props.items.length > 5} {...this.props}>
      {this.props.showMessage ?
        <span className='message'>You can browse or edit your reviews at any time, even add or delete files and images.</span>
        : ''
      }
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
  title: 'Recent Activity',
  showMessage: false,
  editable: false
};

RecentActivitySection.propTypes = {
  cols: React.PropTypes.number.isRequired,
  items: React.PropTypes.array.isRequired,
  title: React.PropTypes.string.isRequired,
  itemsClass: React.PropTypes.string
};

export default RecentActivitySection;
