import React from 'react';
import _ from 'lodash';
import { Link } from 'react-router';
import Rating from '../Rating';
import SearchConstants from '../../utils/constants/SearchConstants';
import Dropdown from '../Dropdown';
import Avatar from '../Avatar';
import AutoFitPicture from '../AutoFitPicture';
import DropdownConstants from '../../utils/constants/DropdownConstants';
import DateHelper from '../../utils/helpers/DateHelper';

const Results = React.createClass ({

  SORT_FIELDS_SIMPLE_SEARCH : ['high_to_low', 'low_to_high'],

  getInitialState: function() {
    return { data: [] }
  },

  getDefaultProps: function() {
    return {
      data: {
        total: 0,
        data: []
      }
    }
  },

  contextTypes: {
    router: React.PropTypes.object
  },

  getMaxDisplayedData: function() {
    let data = this.props.data.data;
    let dataMax = data ? data.length : 0;
    return Math.min(dataMax, (this.props.per_page || SearchConstants.PER_PAGE))
  },

  totalElements: function() {
    return this.props.data.total
  },

  renderCompany: function(result) {
    return (
      <div className='result'>
        <div className='row'>
          <div className='col-xs-12'>
            {
              _.isEmpty(result.image) ? '' : (
                <AutoFitPicture src={result.image} containerClass='picture'/>
              )
            }
            <div className='name'>
              <a href={`/app/companies/${result.id}/${result.slug}`}>
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

  renderCollection: function(result) {
    let url = '/app/collections/'+result.id;
    return (
      <div className='result'>
        <div className='row'>
          <div className='col-xs-12'>
            <div className='name'>
              <a href={url}  onClick={this.props.onClick}>
                { result.name }
              </a>
            </div>
            <div className='small-text'>
              Created by <Link  className='link'
                                to={`/app/users/${result.user.id}`}>{result.user.name}</Link> {DateHelper.getStrDateInDefaultFormat(result.created_at)}
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
        <AutoFitPicture src={result.image} containerClass='image-container col-xs-5'/>
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
              <a href={`/app/products/${result.id}/${result.slug}`}>
                { result.name }
              </a>
            </div>
            <div className='company'>
              <a href={`/app/companies/${result.company.id}/${result.company.slug}`}>
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

  renderUser: function(result) {
    if(result) {
      return (
        <div className='result user row'>
          <div className='col-xs-2'>
            <Avatar
              user={result}
              disableHover={true}
              disableLink={true}
              styles={{backgroundColor: 'white'}} />
          </div>
          <div className='col-xs-7'>
            <div className='name'>
              { result.name }
            </div>
          </div>
          {
            this.props.onRemove ? (
              <div className='col-xs-2'>
                <div className='remove-button' onClick={() => this.props.onRemove(result.id)}>
                  Remove
                </div>
              </div>
            ) : null
          }
        </div>
      )
    }
  },

  renderShareeUser: function(result) {
    if(result) {
      return (
        <div className='result user sharee'>
          <div className='info'>
            <Avatar
              user={result}
              disableHover={true}
              disableLink={true}
              styles={{backgroundColor: 'white'}} />
            <span>
              <div className='name'>
                { result.name }
              </div>
              {
                this.props.onRemove ? (
                  <div className='remove-button' onClick={() => this.props.onRemove(result.id)}>
                    Remove
                  </div>
                ) : null
              }
            </span>
          </div>
          <Dropdown
            onClick={(rank) => this.props.onUpdate(result.id, rank)}
            active={result.rank}
            showText={false}
            native={false}
            with_images={true}
            options={DropdownConstants.shareOptions} />
        </div>
      )
    }
  },

  renderShareeEmail: function(result) {
    if(result) {
      return (
        <div className='result email sharee'>
          <div className='name'>
            { result.email }
            { this.props.onRemove ? (
                <span className='x-button' onClick={() => this.props.onRemove(result.email)}></span>
              ) : null }
          </div>
          <Dropdown
            onClick={(rank) => this.props.onUpdate(result.email, rank)}
            active={result.rank}
            showText={false}
            native={false}
            with_images={true}
            options={DropdownConstants.shareOptions} />
        </div>
      )
    }
  },

  renderCollectionProduct: function(result) {
    return (
      <div className='result collection-product'>
        <div className='row'>
          <div className={ this.productContentClass(result) }>
            <div className='name'>
              { result.name }
            </div>

            <div className='review'>
              <Rating
                value={result.rating}
                name='rating' />
              <span className='reviews'>/ {result.reviews.length} review(s)</span>
            </div>

            {
              this.props.onRemove ? (
                <div className='remove' onClick={() => this.props.onRemove(result.id)}>
                  Remove
                </div>
              ) : null
            }
          </div>
        </div>
      </div>
    )
  },

  getRenderResultFunction: function() {
    switch(this.props.type) {
      case 'companies':
        return this.renderCompany
        break;
      case 'products':
        return this.renderProduct
        break;
      case 'collection-product':
        return this.renderCollectionProduct
        break;
      case 'collections':
        return this.renderCollection
        break;
      case 'users':
        return this.renderUser
        break;
      case 'sharee-users':
        return this.renderShareeUser
        break;
      case 'sharee-emails':
        return this.renderShareeEmail
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
    } else {
      return <div>{this.props.noResults}</div>
    }
  },

  renderButton: function() {
    if(!this.hasData()) { return false }

    return (
      <div className='show-more'>
        <a href={`/app/search/${this.props.type}/${this.props.searchTerm}/1`} className='btn btn-grey-inverted btn-round'>
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
    this.props.onChangeSort(query)
  },

  getCountResultsMessage: function(className) {
    if(this.props.data) {
      let total = this.totalElements();
      return (
        <div className={className ? className : ''}>
          { total ? total : 'No'  } result{total > 1 || total == 0 ? 's' : ''} found
        </div>);
    }
  },

  dropdownOptions: function() {
    return this.props.dropdownOptions || DropdownConstants.genericSortOptions
  },

  renderTopRight: function() {
    let closeMethod = this.props.close ? this.props.close: function(){} ;
    switch(this.props.topRight) {
      case 'link':
        if(this.totalElements() > 0) {
          return (
            <Link onClick={closeMethod} className='top-right' to={`/app/search/${this.props.type}/${this.props.searchTerm}/1`}>
              View all matching {this.props.type} ({this.totalElements()})
            </Link>
          );
        }
      case 'dropdown':
        if(this.totalElements() > 0) {
          return(
            <div className='top-right'>
              <Dropdown
                onClick={this.addSortParam}
                active={this.props.sorting}
                options={this.dropdownOptions()} />
              </div>
          )
        }
      case 'count':
        if(this.getMaxDisplayedData() < this.totalElements()) {
          return (
            <div className='top-right'>
                <span> Showing <span className='value'>{ this.getMaxDisplayedData() }</span> of <span className='value'>{this.totalElements()}</span> results found </span>
            </div>
          )
        }
      case 'size':
        return (
          <div className='top-right'>
            { this.totalElements() } result{this.totalElements() == 1 ? '' : 's'} found
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
        return <div className='top-left titlecase'>{ this.props.type }</div>
        break;
    }
  },

  renderTop: function() {
    return (
      <div className={`top ${this.props.topClass}`}>
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

  renderBottomLink: function() {
    if(this.props.bottomLink && this.props.linkText) {
      return (
        <Link to={this.props.bottomLink} className='small-text right vertical-padding'>
          {this.props.linkText}
        </Link>
      )
    }
  },

  render: function() {
    return (
      <div className={`results ${this.props.className || ''}`}>
        { this.renderTop() }
        { this.renderResults() }
        { this.renderBottom() }
        { this.renderBottomLink() }
      </div>
    )
  }

})

Results.displayName = 'Results';

export default Results;
