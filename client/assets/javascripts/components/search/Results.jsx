import React from 'react';
import _ from 'lodash';
import { Link } from 'react-router';
import Rating from '../Rating';
import SearchConstants from '../../utils/constants/SearchConstants';

const Results = React.createClass ({

  getInitialState: function() {
    return { data: [] }
  },

  getMaxDisplayedData: function() {
    return Math.min(this.props.data.data.length, SearchConstants.PER_PAGE)
  },

  renderCompany: function(result) {
    if(this.props.type == 'companies') {
      return (
        <div className='row'>
          <div className='col-xs-12'>
            <div className='name'>
              <a href={`/app/${this.props.type}/${result.id}`}>
                { result.name }
              </a>
            </div>
            <div className='description'>
              { result.short_desc }
            </div>
          </div>
        </div>
      )
    }
  },

  renderImage: function(result) {
    if(this.props.showImages) {
      return (
        <div className='image-container col-xs-4'>
          <img src={result.image} />
        </div>
      )
    }
  },

  productContentClass: function() {
    if(this.props.showImages) {
      return 'col-xs-8'
    } else {
      return 'col-xs-12'
    }
  },

  renderProduct: function(result) {
    if(this.props.type == 'products') {
      return (
        <div className='row'>
          { this.renderImage(result) }
          <div className={ this.productContentClass() }>
            <div className='name'>
              <a href={`/app/${this.props.type}/${result.id}`}>
                { result.name }
              </a>
            </div>
            <div className='description'>
              { result.short_desc }
            </div>
            <Rating value={result.rating} name='rating' />
          </div>
        </div>
      )
    }
  },

  renderResult: function(result) {
    return (
      <div className='result'>
        { this.renderCompany(result) }
        { this.renderProduct(result) }
      </div>
    )
  },

  renderResults: function() {
    if(this.props.data.data.length > 0) {
      let resultTags = [];

      for (let i = 0; i < this.getMaxDisplayedData(); i++) {
        resultTags.push(this.renderResult(this.props.data.data[i]));
      }

      return <div className={this.props.type}>{resultTags}</div>;
    }
  },

  renderButton: function() {
    if(this.props.showButton) {
      return (
        <div className='show-more'>
          <Link to={`/app/search/${this.props.type}/${this.props.searchTerm}/1`} className='show-more-button'>
            Show More
          </Link>
        </div>
      )
    }
  },

  renderPagination: function() {
    if(this.props.showPagination && this.props.data.pages > 1) {
      let pageLinks = [];

      for (let i = 1; i <= this.props.data.pages; i++) {
        let active = ''

        if(this.props.currentPage == i) {
          active = 'active'
        }

        pageLinks.push(
          <span className={`pagination-link ${active}`} onClick={ () => this.props.changePage(i)}>{i}</span>
        );
      }

      return (
        <div className='pagination'>
          {pageLinks}
        </div>
      )
    }
  },

  renderTopLink: function() {
    if(this.props.showTopLink) {
      return (
        <div className='size'>
          <a href={`/app/search/${this.props.type}/${this.props.searchTerm}/1`}>More</a>
        </div>
      )
    } else {
      return (
        <div className='size'>
          { this.props.data.total } result(s) found
        </div>
      )
    }
  },

  render: function() {
    if(this.props.hide) {
      return <div></div>
    } else {
      return (
        <div className={`results ${this.props.containerClass}`}>
          <div className ='title'>
            <div className='name'>
              { this.props.type }
            </div>
            { this.renderTopLink() }
            <div className='clear'></div>
          </div>
          { this.renderResults() }
          { this.renderPagination() }
          { this.renderButton() }
        </div>
      )
    }
  }

})

Results.displayName = 'Results';

export default Results;
