import React from 'react';
import _ from 'lodash';
import { Link } from 'react-router';
import Rating from '../Rating';

const Results = React.createClass ({

  getInitialState: function() {
    return { data: [] }
  },


  getMaxDisplayedData: function() {
    if(this.props.data.length > 5) {
      return 5
    } else {
      return this.props.data.length
    }
  },

  title: function() {
    return this.props.type
  },

  renderCompany: function(result) {
    if(this.props.type == 'companies') {
      return (
        <div className='row'>
          <div className='col-xs-12'>
            <div className='name'>
              <Link to={`/app/{this.props.type}/${result.id}`}>
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
          <div className='col-xs-4'>
            <img src={'https://placehold.it/350x150'} />
          </div>
          <div className='col-xs-8'>
            <div className='name'>
              <Link to={`/app/{this.props.type}/${result.id}`}>
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
    let tags = [];

    for (let i = 0; i < this.getMaxDisplayedData(); i++) {
      tags.push(this.renderResult(this.props.data[i]));
    }

    return <div className={this.props.type}>{tags}</div>;
  },

  renderButton: function() {
    if(this.props.data.length > this.getMaxDisplayedData()) {
      return (
        <div className='show-more'>
          <Link to={`/app/search/${this.props.searchTerm}/${this.props.type}`} className='show-more-button'>
            Show More
          </Link>
        </div>
      )
    }
  },

  render: function() {
    if(this.props.data.length > 0) {
      return (
        <div className='results'>
          <div className ='title'>
            <div className='name'>
              { this.title() }
            </div>
            <div className='size'>
              { this.props.data.length } result(s) found
            </div>
            <div className='clear'></div>
          </div>
          { this.renderResults() }
          { this.renderButton() }
        </div>
      )
    } else {
      return <div></div>
    }
  }

})

Results.displayName = 'Results';

export default Results;
