import React from 'react/addons';
import _ from 'lodash';
import { Link } from 'react-router';
import FluxProductReviewsActions from '../../actions/FluxProductReviewsActions'
import ReviewsStore from '../../stores/ReviewsStore'
import UrlHelper from '../../utils/helpers/UrlHelper'
import Rating from '../Rating';
import PriceRating from '../PriceRating';
import Tags from '../Tags';
import Dropdown from '../Dropdown';
import DateHelper from '../../utils/helpers/DateHelper';
import ReviewConstants from '../../utils/constants/ReviewConstants';
import DropdownConstants from '../../utils/constants/DropdownConstants';

const ReviewsMobileVersion = React.createClass({
  displayName: 'ReviewsMobileVersion',

  contextTypes: {
    currentUser: React.PropTypes.object.isRequired
  },

  componentDidMount: function() {
    ReviewsStore.listen(this.onChange.bind(this));
    FluxProductReviewsActions.fetchReviews(this.props.productID, this.currentSorting());
  },

  onChange: function(data) {
    this.setState(data);
  },

  changeSorting: function(sorting) {
    FluxProductReviewsActions.changeSorting(sorting, this.props.productID);
  },

  currentSorting: function() {
    if(this.state) {
      return this.state.sorting;
    } else {
      return ReviewConstants.DEFAULT_SORTING
    }
  },

  getReviews: function() {
    if(this.state) {
      return this.state.data.reviews;
    }
  },

  getFilteredReviews: function() {
    return _.filter(this.getReviews(), function(review) {
      let validFields = 0;
      if (!_.isEmpty(review.title)) validFields++;
      if (!_.isEmpty(review.quality_review)) validFields++;
      if (!_.isNull(review.quality_score)) validFields++;
      if (!_.isEmpty(review.price_review)) validFields++;
      if (!_.isNull(review.price_score)) validFields++;

      return validFields >= 2;
    });
  },

  voteOnReview: function(e){
    let _this = this;
		let element = $(e.target);
    let elementData = element.data();
    let prodId = elementData.productId;
    let revId = elementData.reviewId;
    let helpful = elementData.helpful;
    let currentSorting = this.currentSorting()

    FluxProductReviewsActions.voteOnReview(prodId, revId, helpful, function() {
      FluxProductReviewsActions.fetchReviews(prodId, currentSorting);
      element.trigger('blur');
      _this.showVoteFeedback(element);
    });
  },

  hideVoteFeedback: function(voteButton) {
    voteButton.parents('.helpful-review-container').find('.feedback').fadeOut('slow');
  },

  showVoteFeedback: function(voteButton) {
    voteButton.parents('.helpful-review-container').find('.feedback').fadeIn('slow');
  },

  cancelVote: function(e) {
    let _this = this;
    let element = $(e.target);
    let elementData = element.data();
    let prodId = elementData.productId;
    let revId = elementData.reviewId;
    let currentSorting = this.currentSorting()

    FluxProductReviewsActions.cancelVoteOnReview(prodId, revId, function() {
      FluxProductReviewsActions.fetchReviews(prodId, currentSorting);
      element.trigger('blur');
      _this.hideVoteFeedback(element);
    });
  },

	getEditReviewTag: function(review) {
		return <div className='edit-review-container'>
			<Link to={`/app/products/${review.product.id}/${review.product.slug}/reviews/${review.id}`}
				className='btn btn-white'>Edit my review</Link>
		</div>;
	},

	getVoteOnReviewTag: function(review, userId) {
    let userVote = _.find(review.review_votes, function(reviewVote){
      return reviewVote.user_id == userId
    });

    let productId = review.product.id;
    let reviewId = review.id;

    let string;
    let voted = !_.isUndefined(userVote);
    let helpful = voted && userVote.helpful;
    let unhelpful = voted && !userVote.helpful;

    let yesClass = `btn btn-grey-inverted ${ helpful ? 'active' : '' }`;
    let noClass = `btn btn-grey-inverted ${ unhelpful ? 'active' : '' }`;

    return (<div className='helpful-review-container'>
      <div className='vote-container'>
        <button className={yesClass} data-product-id={productId}
                data-review-id={reviewId} data-helpful='true'
                onClick={helpful ? this.cancelVote : this.voteOnReview}>
          Helpful
        </button>
        <button className={noClass} data-product-id={productId}
                data-review-id={reviewId} data-helpful='false'
                onClick={unhelpful ? this.cancelVote : this.voteOnReview}>
          Not Helpful
        </button>
      </div>
      <div className='feedback' data-review-id={reviewId} >
        Thanks for your vote!
      </div>
    </div>);
	},

	getReviewActionTag: function(review) {
		let currentUserId = this.context.currentUser.id;
		let writtenByCurrentUser = currentUserId == review.user.id;
		return writtenByCurrentUser ? this.getEditReviewTag(review) : this.getVoteOnReviewTag(review, currentUserId);
	},

  renderReview: function(review) {
    let attachments = _.collect(review.attachments, function(attachment) {
      return (<li className='attachment'>
        <a className="link" href={attachment.url} target='_blank'>{attachment.name}</a>
      </li>);
    });
    let links = _.collect(review.links, function(link) {
      return (<li className='link'>
        <a className="link" href={UrlHelper.addProtocol(link.url)} target='_blank'>{UrlHelper.addProtocol(link.url)}</a>
      </li>);
    });

    attachments = _.isEmpty(attachments) ? '' : (<ul className='attachments'>{attachments}</ul>);
    links = _.isEmpty(links) ? '' : (<ul className='links'>{links}</ul>);

    let reviewText = _.isEmpty(review.formatted_quality_review) ?
      '' :
      (<div className="review-text" dangerouslySetInnerHTML={{__html: review.formatted_quality_review}} />);

    return (
      <div className="row review">
        <div className="col-xs-12 review-content">
          <div className="score">
            <Rating value={review.quality_score} name='rating'/>
          </div>
          <div className='author'>
            By <Link to={`/app/users/${review.user.id}`}>{review.user.name}</Link>
          &nbsp;&#8226;&nbsp;
            <span className="created_at"> {DateHelper.getStrDateInDefaultFormat(review.created_at) } </span>
          </div>

          {reviewText}
          {attachments}
          {links}

          <div className="price-score">
            <PriceRating value={review.price_score} name='rating'/>
          </div>

          <div className="price-review" dangerouslySetInnerHTML={{__html: review.formatted_price_review}} />
          <Tags tags={review.tags} />

          <div className="rating">
            { review.total_votes > 0 ? `${review.helpful_votes} of ${review.total_votes} people found this review helpful` : ''}
          </div>
          {this.getReviewActionTag(review)}
        </div>
      </div>
    )
  },

  renderReviews: function() {
    let renderedReviews = [];
    let reviews = this.getFilteredReviews();

    if(reviews) {
      for (let i = 0; i < reviews.length; i++) {
        renderedReviews.push(this.renderReview(reviews[i]));
      }

      return renderedReviews;
    }
  },

  renderDropdown: function() {
    return (
      <div className="header">
        <Dropdown
          onClick={this.changeSorting}
          active={this.currentSorting()}
          options={DropdownConstants.reviewSortOptions} />
      </div>
    )
  },

  render: function() {
    return (
      <div className='review-container'>
       { this.renderDropdown() }
        <div className='row reviews'>
          {this.renderReviews()}
        </div>
      </div>
    )
  }

})

export default ReviewsMobileVersion;
