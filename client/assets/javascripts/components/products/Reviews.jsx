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
		let element = $(e.target);
    let elementData = element.data();
    let prodId = elementData.productId;
    let revId = elementData.reviewId;
    let helpful = elementData.helpful;
    let currentSorting = this.currentSorting()

    FluxProductReviewsActions.voteOnReview(prodId, revId, helpful, function() {
      FluxProductReviewsActions.fetchReviews(prodId, currentSorting);
    });
  },

  cancelVote: function(e) {
    let element = $(e.target);
    let elementData = element.data();
    let prodId = elementData.productId;
    let revId = elementData.reviewId;
    let currentSorting = this.currentSorting()

    FluxProductReviewsActions.cancelVoteOnReview(prodId, revId, function() {
      FluxProductReviewsActions.fetchReviews(prodId, currentSorting);
    });
  },

	getEditReviewTag: function(review) {
		return <div className='edit-review-container'>
			<Link to={`/app/products/${review.product.id}/reviews/${review.id}`}
				className='btn btn-white btn-round'>Edit my review</Link>
		</div>;
	},

  alreadyVotedTag: function(review, userId) {
    let userVote = _.find(review.review_votes, function(reviewVote){
      return reviewVote.user_id == userId
    });

    let productId = review.product.id;
    let reviewId = review.id;

    let string;
    let yesClass = 'btn btn-grey btn-round'
    let noClass = 'btn btn-grey btn-round'

    if(userVote.helpful) { yesClass = yesClass + ' active' }
    else { noClass = noClass + ' active' }

    return <div className='helpful-review-container'>
      <span className='helpful-reviews-text'>Was this review helpful to you?</span>
      <button className={yesClass} data-product-id={productId}
              data-review-id={reviewId} data-helpful='true'
              onClick={userVote.helpful ? this.cancelVote : this.voteOnReview}>
        Yes
      </button>
      <button className={noClass} data-product-id={productId}
              data-review-id={reviewId} data-helpful='false'
              onClick={userVote.helpful ? this.voteOnReview : this.cancelVote}>
        No
      </button>
    </div>
  },

	getVoteOnReviewTag: function(review, userId) {
		let alreadyVoted = !!_.find(review.review_votes, function(reviewVote){
			return reviewVote.user_id == userId
		});

    if(alreadyVoted) {
      return this.alreadyVotedTag(review, userId)
    }

    let productId = review.product.id;
    let reviewId = review.id;

    return <div className='helpful-review-container'>
      <span className='helpful-reviews-text'> Was this review helpful to you? </span>
      <button className='btn btn-grey btn-round' data-product-id={productId} data-review-id={reviewId}
        data-helpful='true' onClick={this.voteOnReview}> Yes </button>
      <button className='btn btn-grey btn-round' data-product-id={productId} data-review-id={reviewId}
        data-helpful='false' onClick={this.voteOnReview}> No </button>
    </div>;
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
                          <Link to={`/app/products/${review.product.id}/reviews/${review.id}`}
                               className='btn btn-white btn-round'>Edit my review</Link>
                        </div>;

    let productId = review.product.id;
    let reviewId = review.id;
    let itWasHelpful = <div className='helpful-review-container'>
                          <span className='helpful-reviews-text'> Was this review helpful to you?</span>
                          <button className='btn btn-grey btn-round' data-product-id={productId} data-review-id={reviewId}
                                  data-helpful='true' onClick={this.voteOnReview}> Yes </button>
                          <button className='btn btn-grey btn-round' data-product-id={productId} data-review-id={reviewId}
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
          <img src={review.user.avatar_url} />
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
          <span className="score">
            { review.quality_score ? <Rating value={review.quality_score} name='rating'/> : '' }
          </span>
          <div className="created_at">
            {review.display_date}
          </div>
          <span className="rating">
            { review.total_votes > 0 ? `${review.helpful_votes} of ${review.total_votes} people found this review helpful` : ''}
          </span>
          <div className="title">
            {review.title}
          </div>
          <div className="review-text" dangerouslySetInnerHTML={{__html: review.formatted_quality_review}} />
          <ul className="attachments">
            {attachments}
          </ul>
          <ul className="links">
            {links}
          </ul>
          <div className="price-score">
            { review.price_score ? <PriceRating value={review.price_score} name='rating'/> : '' }
          </div>
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

      return (
        <div className='col-xs-12'>
          {renderedReviews}
        </div>
      );
    }
  },

  renderDropdown: function() {
    return (
      <div className="header">
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

// title: "Nice Product"
// price_review: "Very cheap"
// price_score: 5
// quality_review: "Very good quality"
// quality_score: 5
// created_at: "2015-08-05T11:07:04.538Z"
// updated_at: "2015-08-05T11:07:11.782Z"
