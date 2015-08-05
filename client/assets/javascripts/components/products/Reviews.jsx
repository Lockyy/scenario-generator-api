import React from 'react/addons';
import _ from 'lodash';
import FluxProductReviewsActions from '../../actions/FluxProductReviewsActions'
import ReviewsStore from '../../stores/ReviewsStore'
import Rating from '../Rating';
import Tags from '../Tags';

const Reviews = React.createClass({
  displayName: 'Reviews',

  componentDidMount: function() {
    ReviewsStore.listen(this.onChange.bind(this));
    FluxProductReviewsActions.fetchReviews(this.props.productID);
  },

  onChange: function(data) {
    this.setState(data);
  },

  getReviews: function() {
    if(this.state) {
      return this.state.data.reviews
    }
  },

  renderReview: function(review) {
    return (
      <div className="row review">
        <div className="col-xs-4 user">
          <img src={review.user.avatar_url} />
          <div className='details'>
            <div className='name'>
              {review.user.name}
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
            <Rating value={review.quality_score} name='rating'/>
          </div>
          <div className="created_at">
            {review.display_date}
          </div>
          <div className="title">
            {review.title}
          </div>
          <div className="review-text">
            {review.quality_review}
          </div>
          <div className="price-score">
            <Rating value={review.quality_score}
                    max={4}
                    containerClass='price'
                    name='rating'/>
          </div>
          <div className="price-review">
            {review.price_review}
          </div>
          <Tags
            tags={review.tags} />
        </div>
      </div>
    )
  },

  renderReviews: function() {
    let renderedReviews = [];
    let reviews = this.getReviews()

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