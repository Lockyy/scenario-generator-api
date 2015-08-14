import React from 'react';
import _ from 'lodash';
import { Link, Navigation } from 'react-router';
import FluxProductPageActions from '../../actions/FluxProductPageActions'
import ProductStore from '../../stores/ProductStore'
import Reviews from './Reviews'
import Rating from '../Rating';
import PriceRating from '../PriceRating';
import Tags from '../Tags';
import UrlHelper from '../../utils/helpers/UrlHelper'

const ProductPage = React.createClass({
  displayName: 'ProductPage',
  mixins: [ Navigation ],

  id: function() {
    return this.props.params.id
  },

  componentDidMount: function() {
    ProductStore.listen(this.onChange.bind(this));
    FluxProductPageActions.fetchProduct(this.id());
  },

  onChange: function(data) {
    this.setState(data);
  },

  getProductData: function(name) {
    if(this.state) {
      return this.state.data[name]
    }
  },

  getCompanyData: function(name) {
    if(this.state) {
      return this.state.data.company[name]
    }
  },

  totalReviews: function() {
    let reviews = this.getProductData('reviews')
    if(reviews) {
      return reviews.length
    } else {
      return 0
    }
  },

  renderTitle: function() {
    return (
      <div className='row'>
        <div className='col-xs-12'>
          <div className='title'>
            <div className='name'>
              {this.getProductData('name')}
            </div>
            <div className='company'>
              <Link
                to={`/app/companies/${this.getCompanyData('id')}`}>
                {this.getCompanyData('name')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  },

  renderTopButtons: function() {
    let url = `/app/products/${this.id()}/reviews/new`;
    return (
      <div className='links'>
        <Link to={url} className='btn btn-red btn-round'>
          Add a Review
        </Link>
        <a
          href={`mailto:?subject=Check%20out%20this%20product&body=${window.location.href}`}
          className='btn btn-grey btn-round'>
          Share
        </a>
        <Link to={'#'} className='btn btn-grey btn-round'>
          Bookmark
        </Link>
      </div>
    )
  },

  renderInfo: function() {
    let tags = _.map(this.getProductData('tags'), function(tag) { return tag.name });
    return (
      <div className='row info-row'>
        <div className='col-xs-3 stats'>
          <div className='stars'>
            <Rating value={this.getProductData('rating')} name='rating'/>
            <div className='total-reviews'>
              {this.totalReviews()} Review(s)
            </div>
          </div>
          <PriceRating value={this.getProductData('price')} name='rating'/>
        </div>
        <div className='col-xs-6 information'>
          <div className='link'>
            <a href={UrlHelper.addProtocol(this.getProductData('url'))} className='red' target='_blank'>
              {UrlHelper.addProtocol(this.getProductData('url'))}
            </a>
          </div>
          <div className='description'>
            {this.getProductData('description')}
          </div>
        </div>
        <div className='col-xs-3'>
          <Tags
            tags={tags}
            name={this.getProductData('name')}
            link={'#'}
            max={9} />
        </div>
      </div>
    )
  },

  render: function() {
    return (
      <div className='product show container'>
        {this.renderTitle()}
        {this.renderTopButtons()}
        {this.renderInfo()}
        <div className='row'>
          <div className='col-xs-2 reviews-sidebar'>
            <div className='sidebar-element user-reviews active'>User Reviews</div>
            <div className='sidebar-element lists'>Lists</div>
            <div className='sidebar-element custom-data'>Custom Data</div>
          </div>
          <div className='col-xs-10'>
            <Reviews productID={this.id()} />
          </div>
        </div>
      </div>
    );
  }
})

export default ProductPage;
