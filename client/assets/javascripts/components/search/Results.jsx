import React from 'react';
import _ from 'lodash';
import { Link } from 'react-router';
import Rating from '../Rating';
import SearchConstants from '../../utils/SearchConstants';

const Results = React.createClass ({

  getInitialState: function() {
    return { data: [] }
  },

  getMaxDisplayedData: function() {
    return Math.min(this.props.data.data.length, SearchConstants.PER_PAGE)
  },

  visible: function() {
    return (this.active() || this.props.activeSection == 'all')
  },

  active: function() {
    return this.props.activeSection && this.props.activeSection == this.props.type
  },

  renderCompany: function(result) {
    if(this.props.type == 'companies') {
      return (
        <div className='row'>
          <div className='col-xs-12'>
            <div className='name'>
              <Link to={`/app/${this.props.type}/${result.id}`}>
                { result.name }
              </Link>
            </div>
            <div className='description'>
              { result.short_desc }
            </div>
          </div>
        </div>
      )
    }
  },

  renderProduct: function(result) {
    if(this.props.type == 'products') {
      return (
        <div className='row'>
          <div className='image-container col-xs-4'>
            <img src={result.image} />
          </div>
          <div className='col-xs-8'>
            <div className='name'>
              <Link to={`/app/${this.props.type}/${result.id}`}>
                { result.name }
              </Link>
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
    return (
      <div className='show-more'>
        <Link to={`/app/search/${this.props.type}/${this.props.searchTerm}/1`} className='show-more-button'>
          Show More
        </Link>
      </div>
    )
  },

  renderPagination: function() {
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
  },

  renderMoreContentSection: function() {
    // If there are excess results to display, show something
    if(this.props.data.total > this.getMaxDisplayedData()) {
      // If we're on this sections page, display pagination links
      if(this.active()) {
        return this.renderPagination()
      // Otherwise show the 'show more' button
      } else {
        return this.renderButton()
      }
    }
  },

  render: function() {
    if(this.visible()) {
      return (
        <div className='results'>
          <div className ='title'>
            <div className='name'>
              { this.props.type }
            </div>
            <div className='size'>
              { this.props.data.total } result(s) found
            </div>
            <div className='clear'></div>
          </div>
          { this.renderResults() }
          { this.renderMoreContentSection() }
        </div>
      )
    } else {
      return <div></div>
    }
  }

})

Results.displayName = 'Results';

export default Results;
