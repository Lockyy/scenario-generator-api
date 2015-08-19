import React from 'react/addons';
import _ from 'lodash';
import { Link } from 'react-router';
import FluxProductReviewsActions from '../../actions/FluxProductReviewsActions'
import ReviewsStore from '../../stores/ReviewsStore'
import Rating from '../Rating';
import PriceRating from '../PriceRating';
import Tags from '../Tags';

const Reviews = React.createClass({
  displayName: 'Reviews',

  contextTypes: {
      currentUser: React.PropTypes.object.isRequired
  },

  componentDidMount: function() {
    ReviewsStore.listen(this.onChange.bind(this));
    FluxProductReviewsActions.fetchReviews(this.props.productID);
  },

  onChange: function(data) {
    this.setState(data);
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

  renderReview: function(review) {
    return (
      <div className="row review">
        <div className="col-xs-4 user">
          <img src={review.user.avatar_url} />
          <div className='details'>
            <div className='name'>
              <Link
                to='#'>
                {review.user.name}
              </Link>
            </div>
            <div className='job'>
              {review.user.job_title}
            </div>
            <div className='location'>
              {review.user.location}
            </div>
            <div className='total-reviews'>
              {review.user.total_reviews} review(s)
            </div>
          </div>
        </div>
        <div className="col-xs-8 review-content">
          <div className="score">
            { review.quality_score ? <Rating value={review.quality_score} name='rating'/> : '' }
          </div>
          <div className="created_at">
            {review.display_date}
          </div>
          <div className="title">
            {review.title}
          </div>
          <div className="review-text" dangerouslySetInnerHTML={{__html: review.formatted_quality_review}} />
          <div className="price-score">
            { review.price_score ? <PriceRating value={review.price_score} name='rating'/> : '' }
          </div>
          <div className="price-review" dangerouslySetInnerHTML={{__html: review.formatted_price_review}} />
          <Tags tags={review.tag_list} />
          <div className='edit-review-container'>
            {this.context.currentUser.id == review.user.id ?
              (<Link to={`/app/products/${review.reviewable.id}/reviews/${review.id}`}
                className='btn btn-white btn-round'>Edit my review</Link>) : ''
            }
          </div>
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

  render: function() {
    return (
      <div className='row reviews'>
        {this.renderReviews()}
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
