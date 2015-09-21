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
            {
              _.isEmpty(result.image) ? '' : (
                <div className='picture'>
                  <img href={result.image} className='picture' />
                </div>
              )
            }
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

  showImageForProduct: function(result) {
    return this.props.showImages && result.image != null
  },

  renderImage: function(result) {
    if(this.showImageForProduct(result)) {
      return (
        <div className='image-container col-xs-5'>
          <img src={result.image} />
        </div>
      )
    }
  },

  productContentClass: function(result) {
    if(this.showImageForProduct(result)) {
      return 'col-xs-7'
    }
    return 'col-xs-12'
  },

  renderProduct: function(result) {
    return (
      <div className='result'>
        <div className='row'>
          { this.renderImage(result) }
          <div className={ this.productContentClass(result) }>
            <div className='name'>
              <a href={`/app/${this.props.type}/${result.id}`}>
                { result.name }
              </a>
            </div>
            <div className='company'>
              <a href={`/app/company/${result.company.id}`}>
                { result.company.name }
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
        <a href={`/app/search/${this.props.type}/${this.props.searchTerm}/1`} className='btn btn-grey btn-round'>
          Show More
        </a>
      </div>
    )
  },

  renderPagination: function() {
    if(this.props.data.pages < 2) { return false }

    let _this = this;
    let pages = this.props.data.pages;
    let currentPage = parseInt(this.props.currentPage);

    let changePageFn = function(page) {
      return function() {
        _this.props.onChangePage(page)
      }
    }

    let createPageLink = function(page) {
      if (isNaN(parseInt(page))) { return <span className='pagination-link'>...</span> }

      let active =  (currentPage == page) ? 'active' : '';
      return <span className={`pagination-link ${active}`} onClick={ changePageFn(page)}>{page}</span>;
    }

    let pageLinks = [];

    if (pages > 10) {
      let somePages = [];
      somePages.push(_.range(1, 3));
      somePages.push([currentPage -1, currentPage, currentPage + 1])
      somePages.push(_.range(pages - 1, pages + 1))
      somePages = _.sortBy(_.uniq(_.flattenDeep(somePages)));


      for (var i = 0; i < somePages.length; i++ ) {
        let page = somePages[i];

        if (page > 0 && page <= pages)
        pageLinks.push(createPageLink(page));

        if (i < somePages.length && somePages[i + 1] - page > 1) { pageLinks.push(createPageLink('...')) }
      }
    } else {
      for (let i = 1; i <= pages; i++) {
        pageLinks.push(createPageLink(i));
      }
    }

    return (
      <div className='pagination'>
        {(this.props.currentPage > 1) ?
          <span>
            <span className="pagination-link" onClick={changePageFn(1)}> {'<<'} </span>
            <span className="pagination-link" onClick={changePageFn(this.props.currentPage - 1)}> {'Prev'} </span>
          </span>:
          ''
        }

        {pageLinks}


        {(this.props.currentPage < this.props.data.pages) ?
          <span>
            <span className="pagination-link" onClick={changePageFn(currentPage + 1)}> {'Next'} </span>
            <span className="pagination-link" onClick={changePageFn(pages)}> {'>>'} </span>
          </span>:
          ''
        }
      </div>
    )
  },

  addSortParam: function(sortDescription) {
    let match_mode = _.contains(this.SORT_FIELDS_SIMPLE_SEARCH, sortDescription) ? 'any' : 'all';
    let query = { sorting: {}, match_mode: {} }
    query.sorting[this.props.type] = sortDescription
    query.match_mode[this.props.type] = match_mode
    this.props.onSetQuery(query)
  },

  getCountResultsMessage: function(className) {
    if(this.props.data) {
      let total = this.props.data.total;
      return (
        <div className={className ? className : ''}>
          { total ? total : 'No'  } result{total > 1 || total == 0 ? 's' : ''} found
        </div>);
    }
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
            <div className='top-right'>
              <Dropdown
                onClick={this.addSortParam}
                active={this.props.sorting}
                options={this.dropdownOptions()}
                containerClass={'red'} />
              </div>
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
        return this.getCountResultsMessage('top-left');
        break;
      case 'type':
        return <div className='top-left'>{ this.props.type }</div>
        break;
    }
  },

  renderTop: function() {
    return (
      <div className='top'>
        { this.renderTopLeft() }
        { this.renderTopRight() }
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
      <div className={`results ${this.props.containerClass || ''}`}>
        { this.renderTop() }
        { this.renderResults() }
        { this.renderBottom() }
      </div>
    )
  }

})

Results.displayName = 'Results';

export default Results;
