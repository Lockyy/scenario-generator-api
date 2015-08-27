import React from 'react';
import _ from 'lodash';
import { Link } from 'react-router';
import Rating from '../Rating';
import SearchConstants from '../../utils/constants/SearchConstants';
import Dropdown from '../Dropdown';

const Results = React.createClass ({

  SORT_FIELDS_SIMPLE_SEARCH : ['high_to_low', 'low_to_high'],

  getInitialState: function() {
    return { data: [] }
  },

  getMaxDisplayedData: function() {
    let data = this.props.data.data;
    let dataMax = data ? data.length : 0;
    return Math.min(dataMax, (this.props.per_page || SearchConstants.PER_PAGE))
  },

  renderCompany: function(result) {
    return (
      <div className='result'>
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
      </div>
    )
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
    }
    return 'col-xs-12'
  },

  renderProduct: function(result) {
    return (
      <div className='result'>
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
      </div>
    )
  },

  getRenderResultFunction: function(result) {
    switch(this.props.type) {
      case 'companies':
        return this.renderCompany
        break;
      case 'products':
        return this.renderProduct
        break;
    }
  },

  hasData: function(){
    let data = this.props.data.data;
    return !!data && data.length > 0;
  },

  renderResults: function() {
    if(this.hasData()) {
      let resultTags = [];
      let renderResult = this.getRenderResultFunction()

      for (let i = 0; i < this.getMaxDisplayedData(); i++) {
        let result = renderResult(this.props.data.data[i])

        resultTags.push(result);
      }

      return <div className={this.props.type}>{resultTags}</div>;
    }
  },

  renderButton: function() {
    if(!this.hasData()) { return false }

    return (
      <div className='show-more'>
        <a href={`/app/search/${this.props.type}/${this.props.searchTerm}/1`} className='show-more-button'>
          Show More
        </a>
      </div>
    )
  },

  renderPagination: function() {
    if(this.props.data.pages < 2) { return false }

    let pageLinks = [];

    for (let i = 1; i <= this.props.data.pages; i++) {
      let active = '';

      if(this.props.currentPage == i) {
        active = 'active'
      }

      pageLinks.push(
        <span className={`pagination-link ${active}`}
              onClick={ () => this.props.onChangePage(i)}>{i}</span>
      );
    }

    return (
      <div className='pagination'>
        {pageLinks}
      </div>
    )
  },

  addSortParam: function(sortDescription) {
    let match_mode = _.contains(this.SORT_FIELDS_SIMPLE_SEARCH, sortDescription) ? 'any' : 'all';
    this.props.onSetQuery({sort_by: sortDescription, match_mode: match_mode})
  },

  dropdownOptions: function() {
    return this.props.dropdownOptions || {
      relevance: 'Relevance',
      latest: 'Latest',
      high_to_low: 'Rating High to Low',
      low_to_high: 'Rating Low to High',
      alphabetical_order: 'Alphabetical order',
    }
  },

  renderTopRight: function() {
    switch(this.props.topRight) {
      case 'link':
        if(this.props.data.total > 0) {
          return (
            <div className='top-right'>
              <a href={`/app/search/${this.props.type}/${this.props.searchTerm}/1`}>More</a>
            </div>
          )
        }
      case 'dropdown':
        if(this.props.data.total > 0) {
          return(
            <Dropdown
              onClick={this.addSortParam}
              active={this.props.sort_by}
              options={this.dropdownOptions()}
              containerClass={'red'} />
          )
        }
      case 'count':
        if(this.getMaxDisplayedData() < this.props.data.total) {
          return (
            <div className='top-right'>
                <span> Showing <span className='value'>{ this.getMaxDisplayedData() }</span> of <span className='value'>{this.props.data.total}</span> results found </span>
            </div>
          )
        }
      case 'size':
        return (
          <div className='top-right'>
            { this.props.data.total } result(s) found
          </div>
        )
        break;
    }
  },

  renderTopLeft: function() {
    switch(this.props.topLeft) {
      case 'count':
        return <div className='top-left'>{ this.props.data.total } result(s) found</div>
        break;
      case 'type':
        return <div className='top-left'>{ this.props.type }</div>
        break;
    }
  },

  renderTop: function() {
    return (
      <div className ='title'>
        { this.renderTopLeft() }
        { this.renderTopRight() }
        <div className='clear'></div>
      </div>
    )
  },

  renderBottom: function() {
    switch(this.props.bottom) {
      case 'pagination':
        return this.renderPagination()
        break;
      case 'button':
        return this.renderButton()
        break;
    }
  },

  render: function() {
    return (
      <div className={`results ${this.props.containerClass}`}>
        { this.renderTop() }
        { this.renderResults() }
        { this.renderBottom() }
      </div>
    )
  }

})

Results.displayName = 'Results';

export default Results;
