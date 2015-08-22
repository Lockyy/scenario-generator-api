import React from 'react';
import _ from 'lodash';
import { Link, Navigation } from 'react-router';
import  Section from '../Section'
import  TagsBox from '../TagsBox'
import  SectionRow from '../SectionRow'
import  ProductBox from '../ProductBox'
import  FluxReviewPageActions from '../../actions/FluxReviewPageActions'
import  ReviewPageStore from '../../stores/ReviewPageStore'
import UrlHelper from '../../utils/helpers/UrlHelper'

const UserProfileHeader  = React.createClass({
  displayName: 'UserProfileHeader',
  mixins: [ Navigation ],

  getDefaultProps: function getDefaultProps() {
    reviews: []
  },

  getInfoContainer: function getInfoContainer() {
    return (this.props.department || this.props.location) ? (
      <div className="info-container">
        <span className='department'>{this.props.department || this.props.job_title}</span>
        <span className='location'>{this.props.location}</span>
      </div>
    ) : ""
  },

  getAvatarContainer: function getAvatarContainer() {
    return(
      <div className='avatar-container row'>
        <img className='user-avatar img-circle' src={this.props.avatar_url}/>
        <span className='user-name'>{this.props.name}</span>
      </div>
    );
  },

  getTotalsContainer: function getTotalsContainer() {
    return (<div className="totals-container">
      <table className="totals table">
        <thead>
          <tr>
            <th>Reviews</th>
            <th>Files Added</th>
            <th>Products Added</th>
          </tr>
        </thead>
          <tr>
            <td>{this.props.total_reviews || 0}</td>
            <td>{this.props.total_attachments || 0}</td>
            <td>{this.props.total_products || 0}</td>
          </tr>
        <tbody>

        </tbody>
      </table>
    </div>);
  },

  _getContent: function(type){
    return(
      <div className={`${type}-version`}>
        {this.getAvatarContainer()}

        <div className='user-secondary-info-container row'>
          {this.getInfoContainer()}
          {this.getTotalsContainer()}
        </div>
      </div>
    )
  },

  render: function render() {
    return (
      <div id='user-main-info-container'>
        {this._getContent('mobile')}
        {this._getContent('desktop')}
      </div>
    );
  }
})

export default UserProfileHeader;
