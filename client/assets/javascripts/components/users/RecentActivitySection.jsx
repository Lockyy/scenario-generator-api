import React from 'react/addons';
const ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
import _ from 'lodash';
import ReviewConstants from '../../utils/constants/ReviewConstants';
import ReviewBox from './ReviewBox';
import Section from '../Section';
import SectionRow from '../SectionRow';
import Dropdown from '../Dropdown';

function sumSizeFunc(item) {
  return item.props.size;
}

const RecentActivitySection = React.createClass({
  displayName: 'RecentActivitySection',

  contextTypes: {
    router: React.PropTypes.object,
    currentUser: React.PropTypes.object
  },

  getCurrentBoxSize: function(reviews, review) {
    return 1;
  },

  getDefaultProps: function(){
    return {
      cols: 3,
      rows: 1,
      title: 'Recent Reviews',
      showMessage: false,
      editable: false,
      onChangeSorting: function(sorting) {}
    };
  },

  buildRows: function(reviews) {
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
  },

  fetchReviews: function() {
    let review;
    let reviews = [];
    let hasItems;
    let needsItem;
    let sumItems;
    let currentItem = 0;

    if (_.isEmpty(this.props.items)) return [];

    do {
      review = this.props.items[currentItem++];

      let box = <ReviewBox size={this.getCurrentBoxSize(reviews, review)} editable={this.props.editable} {...review} />;

      reviews.push(box);

      hasItems = this.props.items.length > currentItem;
      sumItems = _.sum(reviews, sumSizeFunc);
      needsItem = sumItems < this.props.rows * this.props.cols;
    } while (hasItems && needsItem);

    return this.buildRows(reviews);
  },

  changeSorting: function(sorting) {
    this.props.onChangeSorting(sorting)
  },

  currentSorting: function() {
    return this.props.sorting ? this.props.sorting : ReviewConstants.DEFAULT_SORTING;
  },

  renderDropdown: function() {
    return (
      <Dropdown
        onClick={this.changeSorting}
        active={this.currentSorting()}
        options={{
          latest: 'Latest',
          highScore: 'Rating: Low to High',
          lowScore: 'Rating: High to Low',
          unhelpful: 'Most Helpful: Low to High',
          helpful: 'Most Helpful: High to Low'
        }} />
    )
  },

  onShowMore: function() {
    if (_.isFunction(this.props.onShowMore)) {
      this.props.onShowMore(this.props.rows + 1, this.props.cols);
    }
  },

  render: function() {
    return (
      <Section hasPagination={this.props.items.length > 0}
        customHeaderTag={this.renderDropdown()} {...this.props} onShowMore={this.onShowMore}>
        {this.props.showMessage ?
          <span className='message'>You can browse or edit your reviews at any time, even add or delete files and images.</span>
          : ''
        }
        {this.fetchReviews()}
      </Section>
    );
  }
});

export default RecentActivitySection;
