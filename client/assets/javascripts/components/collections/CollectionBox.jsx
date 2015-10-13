import React from 'react';
import _ from 'lodash';
import { Link } from 'react-router';
import timeago from 'timeago';
import TextHelper from '../../utils/helpers/TextHelper';
import Dropdown from '../Dropdown';
import FluxCollectionActions from '../../actions/FluxCollectionActions';

const CollectionBox = React.createClass ({
  displayName: 'CollectionBox',

  contextTypes: {
    router: React.PropTypes.object,
    currentUser: React.PropTypes.object.isRequired
  },

  changePrivacySetting: function(newSetting) {
    FluxCollectionActions.updateCollection(this.props.id, { privacy: newSetting})
  },

  deleteCollection: function() {
    FluxCollectionActions.deleteCollection({
      id: this.props.id,
      name: this.props.title
    })
  },

  renderProductsList: function() {
    let products = _.map(this.props.products.slice(0,3), function(product) {
      return  <span className='product-link'>
                <Link to={`/app/products/${product.slug}`}>
                  {product.name}
                </Link>{', '}
              </span>
    })

    return (
      <p className='includes'>
        INCLUDES: { products }
        <span className='product-link see-all'>
          <Link to={`/app/collections/${this.props.id}`}>
            see all
          </Link>
        </span>
      </p>
    )
  },

  ownedByUser: function() {
    return this.context.currentUser.id == this.props.user.id
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
        <div  className='btn btn-red-inverted btn-round'
              onClick={() => this.props.onEdit(this.props)}>
          Edit
        </div>
        <div  className='btn btn-red-inverted btn-round'
              onClick={() => this.props.onShare(this.props)}>
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
    if(this.ownedByUser() && this.props.onEdit && this.props.onShare) {
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
            My Collection, {timeago(this.props.created_at)}
          </span>
          <Dropdown
            onClick={this.changePrivacySetting}
            active={this.props.privacy}
            showText={false}
            options={{ visible: 'Public', hidden: 'Private' }}
            containerClass={'small'} />
        </div>
      )
    } else {
      return (
        <div className='top'>
          <span className='created_at'>
            Created {timeago(this.props.created_at)} by <Link to={`/app/users/${this.props.user.id}`}>
              {this.props.user.name}
            </Link>
          </span>
        </div>
      )
    }
  },

  render: function() {
    let description = TextHelper.truncate(this.props.description, 280);
    return (
      <div className='col-xs-12 box-2 no-pic-box product collection'>
        <div className='content'>
          <div className='data'>

            <div className='details'>
              { this.renderTop() }

              <div className="header">

                <h3 className='title'>
                  <a href={`/app/collections/${this.props.id}`}>
                    {this.props.title}
                  </a>
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

CollectionBox.propTypes = {
  id: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired,
  description: React.PropTypes.string.isRequired,
};

export default CollectionBox;
