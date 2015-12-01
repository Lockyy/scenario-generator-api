import React from 'react';
import _ from 'lodash';
import { Link } from 'react-router';
import timeago from 'timeago';
import TextHelper from '../../utils/helpers/TextHelper';
import Dropdown from '../Dropdown';
import FluxCollectionActions from '../../actions/FluxCollectionActions';
import FluxAlertActions from '../../actions/FluxAlertActions';
import { ViewCollectionMixin } from '../collections/ViewCollectionModal';
import { ShareCollectionMixin } from '../collections/ShareCollectionModal';
import { EditCollectionMixin } from '../collections/EditCollectionModal';

const CollectionBox = React.createClass ({
  displayName: 'CollectionBox',
  mixins: [
    ViewCollectionMixin,
    ShareCollectionMixin,
    EditCollectionMixin
  ],

  contextTypes: {
    router: React.PropTypes.object,
    currentUser: React.PropTypes.object.isRequired
  },

  changePrivacySetting: function(newSetting) {
    let _this = this;
    FluxAlertActions.showAlert({
      title: `Are you sure you want to make ${_this.props.collection.name} ${newSetting}?`,
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
      title: `Are you sure you want to delete ${this.props.collection.name}`,
      success: 'Yes, delete it',
      cancel: "No, don't delete it",
      successCallback: function() {
        FluxCollectionActions.deleteCollection({
          id: _this.props.collection.id,
          name: _this.props.collection.name
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
          <a onClick={() => this.showViewCollectionModal(this.props.collection)}>
            see all
          </a>
        </span>
      </p>
    )
  },

  renderFooter: function() {
    return (
      <div className='footer'>
        <span className='created_by'>
          Created by <Link to={`/app/users/${this.props.collection.user.id}`}>
            {this.props.collection.user.name}
          </Link>
        </span>
        <span className='created_at'>
          {timeago(this.props.collection.created_at)}
        </span>
      </div>
    )
  },

  previewCollection: function(collection) {
    this.showViewCollectionModal(collection, false)
  },

  render: function() {
    let description = TextHelper.truncate(this.props.collection.description, 80);
    return (
      <div className={`col-xs-12 box-${this.props.size} no-pic-box product collection`}>
        <div className='content'>
          <div className='data'>

            <div className='details'>

              <div className="header">
                <h3 className='title'>
                  <Link to={`/app/collections/${this.props.collection.id}`}>{this.props.collection.name}</Link>
                </h3>
              </div>

              <p className='description'>
                {description}
              </p>

              <div className='preview-collection' onClick={() => this.previewCollection(this.props.collection)}>
                Preview
              </div>
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
