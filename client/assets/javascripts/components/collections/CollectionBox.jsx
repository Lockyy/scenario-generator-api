import React from 'react';
import _ from 'lodash';
import { Link } from 'react-router';
import timeago from 'timeago';
import TextHelper from '../../utils/helpers/TextHelper';
import Dropdown from '../Dropdown';
import FluxCollectionActions from '../../actions/FluxCollectionActions';
import FluxAlertActions from '../../actions/FluxAlertActions';
import { ViewCollectionMixin } from '../collections/ViewCollectionModal';

const CollectionBox = React.createClass ({
  displayName: 'CollectionBox',
  mixins: [
    ViewCollectionMixin,
  ],

  contextTypes: {
    router: React.PropTypes.object,
    currentUser: React.PropTypes.object.isRequired
  },

  changePrivacySetting: function(newSetting) {
    let _this = this;
    FluxAlertActions.showAlert({
      title: `Are you sure you want to make ${_this.props.collection.title} ${newSetting}?`,
      success: `Yes, make it ${newSetting}`,
      cancel: "No, don't change it",
      successCallback: function() {
        FluxCollectionActions.updateCollection(_this.props.collection.id, { privacy: newSetting})
      }
    })
  },

  deleteCollection: function() {
    let _this = this;

    FluxAlertActions.showAlert({
      title: `Are you sure you want to delete ${this.props.collection.title}`,
      success: 'Yes, delete it',
      cancel: "No, don't delete it",
      successCallback: function() {
        FluxCollectionActions.deleteCollection({
          id: _this.props.collection.id,
          name: _this.props.collection.title
        })
      }
    })
  },

  renderProductsList: function() {
    let products = _.map(this.props.collection.products.slice(0,3), function(product) {
      return  (
        <span className='product-link'>
          <Link to={`/app/products/${product.slug}`}>
            {product.name}
          </Link>{', '}
        </span>
      )
    })

    return (
      <p className='includes'>
        INCLUDES: { products }
        <span className='product-link see-all'>
          <Link to={`/app/collections/${this.props.collection.id}`}>
            see all
          </Link>
        </span>
      </p>
    )
  },

  ownedByUser: function() {
    return this.context.currentUser.id == this.props.collection.user.id
  },

  renderOtherFooter: function() {
    return (
      <div className='footer'>
      </div>
    )
  },

  renderUserFooter: function() {
    return (
      <div className='footer'>
        <div  className='btn btn-red-inverted btn-round'>
          Edit
        </div>
        <div  className='btn btn-red-inverted btn-round'>
          Share
        </div>
        <div  className='btn btn-red-inverted btn-round'
              onClick={this.deleteCollection}>
          Delete
        </div>
      </div>
    )
  },

  renderFooter: function() {
    if(this.ownedByUser()) {
      return this.renderUserFooter()
    } else {
      return this.renderOtherFooter()
    }
  },

  renderTop: function() {
    if(this.ownedByUser()) {
      return (
        <div className='top'>
          <span className='created_at'>
            My Collection, {timeago(this.props.collection.created_at)}
          </span>
          <Dropdown
            onClick={this.changePrivacySetting}
            active={this.props.collection.privacy}
            showText={false}
            options={{ visible: 'Public', hidden: 'Private' }}
            containerClass={'small'} />
        </div>
      )
    } else {
      return (
        <div className='top'>
          <span className='created_at'>
            Created {timeago(this.props.collection.created_at)} by <Link to={`/app/users/${this.props.collection.user.id}`}>
              {this.props.collection.user.name}
            </Link>
          </span>
        </div>
      )
    }
  },

  render: function() {
    let description = TextHelper.truncate(this.props.collection.description, 280);
    return (
      <div className='col-xs-12 box-2 no-pic-box product collection'>
        <div className='content'>
          <div className='data'>

            <div className='details'>
              { this.renderTop() }

              <div className="header">
                <h3 className='title'
                    onClick={() => this.showViewCollectionModal(this.props.collection)}>
                  {this.props.collection.title}
                </h3>
              </div>

              <p className='description'>
                {description}
              </p>

              { this.renderProductsList() }
            </div>

            { this.renderFooter() }
          </div>
        </div>
      </div>
    );
  }
})

CollectionBox.displayName = 'CollectionBox';

export default CollectionBox;
