import React from 'react';
import _ from 'lodash';
import { Link } from 'react-router';
import Rating from '../Rating';
import SearchConstants from '../../utils/constants/SearchConstants';

const Results = React.createClass ({

  SORT_FIELDS_SIMPLE_SEARCH : ['high_to_low', 'low_to_high'],

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
        let active = '';

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

  addSortParam: function(sortDescription) {
    let match_mode = _.contains(this.SORT_FIELDS_SIMPLE_SEARCH, sortDescription) ? 'any' : 'all';
    this.props.onSetQuery({sort_by: sortDescription, match_mode: match_mode})
  },

  renderTopLink: function() {
    let section = this.props.section;
    if(this.props.showTopLink) {
      return (
        <div className='size'>
          <a href={`/app/search/${this.props.type}/${this.props.searchTerm}/1`}>More</a>
        </div>
      )
    } else if(this.getMaxDisplayedData() < this.props.data.total && section == 'all'){
        return(
        <div id='results-text-container' className='size'>
            <span> Showing <span className='value'>{ this.getMaxDisplayedData() }</span> of <span className='value'>{this.props.data.total}</span> results found </span>
        </div>)
    } else if(section == 'products'){
        return(
            <div id='sort-container'>
                <div className='form-group'>
                    <label for="sort"> Sort by: </label>
                    <select id='sort' name="sort" onChange={ (e) => this.addSortParam(e.target.value)}>
                        <option value='relevance'>Relevance</option>
                        <option value='latest'>Latest</option>
                        <option value='high_to_low'>Rating High to Low</option>
                        <option value='low_to_high'>Rating Low to High</option>
                        <option value='alphabetical_order'>Alphabetical order</option>
                    </select>
                </div>
            </div>)
    }
    else {
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
