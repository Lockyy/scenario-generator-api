import React from 'react';
import _ from 'lodash';
import { Link } from 'react-router';
import timeago from 'timeago';
import dated from 'dated';
import Rating from '../Rating';
import PriceRating from '../PriceRating';
import TextHelper from '../../utils/helpers/TextHelper';

const ReviewBox = React.createClass ({
  displayName: 'ReviewBox',

  contextTypes: {
    router: React.PropTypes.object
  },

  getDefaultProps: function getDefaultProps() {
    return {
      size: 1,
      editable: false,
      reviewable: {
        company: {}
      }
    }
  },

  render: function() {
    let product = this.props.reviewable;
    let company = product.company;

    let boxSize = this.props.size;
    let boxClass = `box-${boxSize} no-pic-box`;
    let classes = _.compact(['product', 'review-box', boxClass]).join(' ');

    let quality_review = TextHelper.truncate(this.props.quality_review, 150);
    let editable = this.props.editable;

    let attachments = this.props.attachments.length;
    let links = this.props.links.length;
    let tags = this.props.tags.length;

    return (<div className={classes}>
      <div className='content'>
        <div className='data'>

          <div className='details'>
            <div className="header">
              <span className='activity-type'>
                Review added {this.props.created_at ? dated('M d')(new Date(this.props.created_at)) : ''}
              </span>
              <h3 className='title'><a href={`/app/products/${product.id}`}>{product.name}</a></h3>
              <h4 className='company'><a href={`/app/companies/${company.id}`} >{company.name}</a></h4>
            </div>

            <div className='review'>
              <div className='rating'>
                <Rating value={this.props.quality_score} name='rating'/>
                <PriceRating value={this.props.price_score} name='rating'/>
              </div>

              <h3 className='title'>{this.props.title}</h3>
              <p className='description'>
                { editable && _.isEmpty(quality_review) ?
                  <span className='message'>Click Edit to add a review</span> :
                  quality_review
                 }
              </p>

              { attachments > 0 ? <p className='item attachments'> {attachments} attachment(s) </p> : ''}
              { links > 0 ? <p className='item links'> {links} link(s) </p> : ''}
              { tags > 0 ? <p className='item tags'> {tags} tag(s) </p> : ''}
            </div>
          </div>

          <div className='footer'>
            {
              editable ?
              <a href={`/app/products/${this.props.reviewable.id}/reviews/${this.props.id}`} className='btn btn-round'>
                <span className='icon-edit-review'>Edit</span>
              </a> :
              <span className='created_at'>{timeago(this.props.created_at)}</span>
            }
          </div>
        </div>
      </div>
    </div>);
  }
})

export default ReviewBox;
