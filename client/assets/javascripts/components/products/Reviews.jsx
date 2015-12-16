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
import DropdownConstants from '../../utils/constants/DropdownConstants';
import Avatar from '../Avatar';
import ReviewConstants from '../../utils/constants/ReviewConstants';

const Reviews = React.createClass({
  displayName: 'Reviews',

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
				className='btn btn-white btn-round'>Edit my review</Link>
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

    let yesClass = `btn btn-grey-inverted btn-round yes-button ${ helpful ? 'active' : '' }`;
    let noClass = `btn btn-grey-inverted btn-round no-button ${ unhelpful ? 'active' : '' }`;

    return (<div className='helpful-review-container'>
      <div className='vote-container'>
        <span className='helpful-reviews-text'>Was this review helpful to you?</span>
        <button className={yesClass} data-product-id={productId}
                data-review-id={reviewId} data-helpful='true'
                onClick={helpful ? this.cancelVote : this.voteOnReview}>
          Yes
        </button>
        <button className={noClass} data-product-id={productId}
                data-review-id={reviewId} data-helpful='false'
                onClick={unhelpful ? this.cancelVote : this.voteOnReview}>
          No
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
        <a className="link" href={UrlHelper.addProtocol(attachment.url)} target='_blank'>{attachment.name}</a>
      </li>);
    });

    let links = _.collect(review.links, function(link) {
      return (<li className='link'>
        <a className="link" href={UrlHelper.addProtocol(link.url)} target='_blank'>{UrlHelper.addProtocol(link.url)}</a>
      </li>);
    });
    let wroteByCurrentUser = this.context.currentUser.id == review.user.id;

    let editMyReview =  <div className='edit-review-container'>
                          <Link to={`/app/products/${review.product.id}/${review.product.slug}/reviews/${review.id}`}
                               className='btn btn-white btn-round'>Edit my review</Link>
                        </div>;

    let productId = review.product.id;
    let reviewId = review.id;
    let itWasHelpful = <div className='helpful-review-container'>
                          <span className='helpful-reviews-text'> Was this review helpful to you?</span>
                          <button className='btn btn-grey-inverted btn-round' data-product-id={productId} data-review-id={reviewId}
                                  data-helpful='true' onClick={this.voteOnReview}> Yes </button>
                          <button className='btn btn-grey-inverted btn-round' data-product-id={productId} data-review-id={reviewId}
                                  data-helpful='false' onClick={this.voteOnReview}> No </button>
                        </div>;

    let userEditAction =   wroteByCurrentUser ? editMyReview
      : itWasHelpful;

    let job_title = _.isEmpty(review.user.job_title) ?
      (_.isEmpty(review.user.department) ? '' : review.user.department )
      : review.user.job_title

    return (
      <div className="row review">
        <div className="col-xs-12 user">
          <Avatar user={review.user} disableHover={true} />
          <div className='details'>
            <div className='name'>
              <Link
                to={`/app/users/${review.user.id}`}>
                {review.user.name}
              </Link>
            </div>
            {_.isEmpty(job_title) ? '' : <span className='job'>{job_title}</span>}
            {_.isEmpty(review.user.location) ? '' : <span className='location'>{review.user.location}</span>}
            {review.user.total_reviews < 1 ? '' : <span className='total-reviews'>{review.user.total_reviews} review(s)</span>}
          </div>
        </div>
        <div className="col-xs-12 review-content">
          { review.quality_score ?
            <span className="score">
              <Rating value={review.quality_score} name='rating'/>
            </span>
            : ''
          }
          <div className="created_at">
            {review.display_date}
          </div>
          { review.total_votes > 0 ?
            <span className="rating">
              {review.helpful_votes} of {review.total_votes} people found this review helpful
            </span>
            : ''
          }
          <div className="title">
            {review.title}
          </div>
          <div className="review-text" dangerouslySetInnerHTML={{__html: review.formatted_quality_review}} />
          { attachments.length > 0 ?
            <ul className="attachments">
              {attachments}
            </ul>
            : ''
          }
          { links.length > 0 ?
            <ul className="links">
              {links}
            </ul>
            : ''
          }
          { review.price_score ?
            <div className="price-score">
              <PriceRating value={review.price_score} showScoreText={true} name='rating'/>
            </div>
            : ''
          }
          <div className="price-review" dangerouslySetInnerHTML={{__html: review.formatted_price_review}} />
          <Tags tags={review.tags} />

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
          showText={true}
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

export default Reviews;
