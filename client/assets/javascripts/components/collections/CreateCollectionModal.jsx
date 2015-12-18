import React from 'react';
import _ from 'lodash';
import { Link, Navigation } from 'react-router';
import RenderMobile from '../RenderMobile';
import Modal from 'react-modal';
import CollectionStore from '../../stores/CollectionStore';
import ModalStore from '../../stores/ModalStore';
import DefaultModalStyles from '../../utils/constants/DefaultModalStyles';
import FluxAlertActions from '../../actions/FluxAlertActions';
import FluxModalActions from '../../actions/FluxModalActions';
import FluxCollectionActions from '../../actions/FluxCollectionActions';
import FluxNotificationsActions from '../../actions/FluxNotificationsActions'
import ProductName from '../reviews/ProductName'
import Results from '../search/Results'
import { ShareCollectionMixin } from './ShareCollectionModal'
import Footer from '../Footer';
import  CreateCollectionMixin  from './CreateCollectionMixin'
import  ShareCollection  from './ShareCollection'

const CreateCollectionModal = React.createClass ({
  displayName: 'CreateCollectionModal',
  mixins: [ShareCollectionMixin, CreateCollectionMixin],

  contextTypes: {
    router: React.PropTypes.object
  },

  getInitialState: function () {
    return {
      data: {
        collection: {
          name: '',
          description: '',
          products: [],
          user: {
            name: ''
          }
        }
      }
    }
  },

  // Flux Methods
  // Keep track of changes that are made to the store
  componentDidMount: function () {
    CollectionStore.listen(this.onChangeCollection);
    ModalStore.listen(this.onChangeModal);
  },
  onChangeCollection: function (data) {
    this.setState({data: data.data});
  },
  onChangeModal: function (data) {
    let visible = data.visibleModal == this.constructor.displayName;
    this.setState({visible: visible});
  },

  // Gather the IDs for the products currently added to the collection.
  // Used when creating the collection.
  getProductIDs: function () {
    return _.map(this.state.data.collection.products, function (product) {
      return product.id
    })
  },

  // Remove a product from the collections products.
  // We aren't modifying the CollectionStore version of the collection because
  // these changes are unsaved at this stage.
  removeProduct: function (product_id) {
    let products = this.state.data.collection.products.filter(function (product) {
      return product.id !== product_id;
    });

    let data = this.state.data
    data.collection.products = products

    this.setState({product_name: null, data: data})
  },

  // Add a product to the collections products.
  // We aren't modifying the CollectionStore version of the collection because
  // these changes are unsaved at this stage.
  addProduct: function (product, selected) {
    if(!_.includes(this.getProductIDs(), product.id)) {
      if (selected) {
        let newProducts = this.state.data.collection.products
        newProducts.push(product)
        this.setState({product_name: null, collection: {products: newProducts}})
      } else {
        this.setState({product_name: product.name})
      }
    }
  },

  getCollection: function (e) {
    let privacy = this.state.privacy || e.currentTarget.dataset.privacy;
    return {
      id: this.state.data.collection.id,
      name: this.state.data.collection.name,
      description: this.state.data.collection.description,
      emails: this.state.data.collection.emails,
      users: this.state.data.collection.users,
      privacy: privacy,
      products: this.getProductIDs(),
      send_email_invites: this.state.data.collection.send_email_invites
    }
  },

  sendNotificationOnSubmission: function (collection) {
    FluxNotificationsActions.showNotification({
      type: 'saved',
      text: `Your new Collection <b>${collection.name}</b> was successfully created!`,
      subject: {
        type: 'Collection',
        name: collection.name
      }
    })
  },

  transitionToShare: function (collection, _this) {
    _this.showShareCollectionModal(collection)
  },

  submitForm: function (e) {
    e.preventDefault()
    // Don't submit if the form isn't complete
    if (!this.formCompleted()) {
      return
    }

    let _this = this;
    let collection = this.getCollection(e);

    FluxCollectionActions.createCollection(collection, function (collection) {
      _this.props.close();
      _this.sendNotificationOnSubmission(collection);
      if (_this.props.showShareStep) {
        _this.transitionToShare(collection, _this);
      }
    })
  },

  onChangeField: function (name, e) {
    let hash = this.state.data.collection;
    hash[name] = e.currentTarget.value;
    let newState = this.state.data;
    newState.collection = hash;
    this.setState({data: newState})
  },

  // Runs validation on text fields.
  // Returns false if there are errors.
  validation: function (skipDescription) {
    let errorDom = $(this.refs.errors.getDOMNode());
    let titleDOM = $(this.refs.collection_name.getDOMNode());
    let descriptionDOM = $(this.refs.collection_description.getDOMNode());
    let titleEmpty = titleDOM.val() == '';
    let descriptionEmpty = descriptionDOM.val() == '';
    let errors;

    if (skipDescription) {
      errors = titleEmpty
    } else {
      errors = titleEmpty || descriptionEmpty
      descriptionDOM.toggleClass('greyed', descriptionEmpty);
    }

    titleDOM.toggleClass('greyed', titleEmpty);

    errorDom.toggleClass('active', errors);

    return !errors
  },

  skipDescriptionValidation: function (e) {
    return $(e.target).prop("tagName") == 'INPUT' && $(e.relatedTarget).prop("tagName") == 'TEXTAREA'
  },

  renderTextFields: function () {
    let _this = this;
    let onFocus = function (e) {
      $(React.findDOMNode(_this.refs.fields_container)).addClass('focus')
    }

    let onBlur = function (e) {
      $(React.findDOMNode(_this.refs.fields_container)).removeClass('focus')
      _this.validation(_this.skipDescriptionValidation(e))
    }

    return (
      <div>
        <div className='field-messages'>
          <div className='required'>
            * Required Fields
          </div>
          <div className='errors' ref='errors'>
            Please enter a title and description
          </div>
        </div>
        <div className='form-group attached-fields' ref='fields_container'>
          <input type='text'
                 className='form-control'
                 placeholder='Title *'
                 name='collection[name]'
                 ref='collection_name'
                 value={this.state.data.collection.name}
                 onFocus={onFocus}
                 onBlur={onBlur}
                 onChange={(e) => this.onChangeField('name', e)}/>
          <textarea type='text'
                    className='form-control'
                    placeholder='Describe your collection *'
                    name='collection[description]'
                    rows='10'
                    ref='collection_description'
                    value={this.state.data.collection.description}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    onChange={(e) => this.onChangeField('description', e)}/>
        </div>
      </div>
    )
  },

  renderProductTypeahead: function () {
    return (
      <ProductName ref='product_name'
                   value={this.state.product_name}
                   helpMessage={'Add Product'}
                   hideLabel={true}
                   onSetProduct={this.addProduct}
                   placeholder={'Add products to your collection'}
                   noEmptySubmit={true}/>
    )
  },

  updateEmails: function (emails) {
    this.state.data.collection.emails = emails;
  },


  updateUsers: function (users) {
    this.state.data.collection.users = users;
  },

  updateSendInviteEmails: function (invite) {
    this.state.data.collection.send_email_invites = invite;
  },

  renderProducts: function () {
    return (
      <Results
        type='collection-product'
        onRemove={this.removeProduct}
        data={{data: this.state.data.collection.products}}
        per_page={20}/>
    )
  },

  formCompleted: function () {
    return (this.validation(false))
  },

  renderSubmissionButtons: function () {
    return (
      <div className='buttons'>
        <div
          className='btn btn-red-inverted btn-round'
          onClick={this.submitForm}
          data-privacy='hidden'>
          Create Collection
        </div>
        <div
          className='btn btn-grey-inverted btn-round'
          onClick={this.props.close}>
          Cancel
        </div>
      </div>
    )
  },

  renderCollectionForm: function () {
    let self = this;
    let shareCollection = <ShareCollection onUpdateEmail={this.updateEmails.bind(self)}
                                           onUpdateUser={this.updateUsers.bind(self)}
                                           onUpdateSentInviteEmails={this.updateSendInviteEmails.bind(self)}
                                           onChangeEvent={function(callback,e){
                          callback(e);
                          self.setState({privacy: $(e.target).val()})}}/>

    let sharedOptions = this.props.renderSharePrivacy ? shareCollection : '';

    return (
      <div className='row'>
        <form className='col-xs-12 form collection'
              ref='collection_form'>
          {this.renderTextFields()}
          {this.renderProductTypeahead()}

          <div className='grey'>
            <div className='collection-products-container'>
              {this.renderProducts()}
            </div>
            <div>
              {sharedOptions}
            </div>
            <div className='submission-buttons-container'>
              {this.renderSubmissionButtons()}
            </div>
          </div>

        </form>
      </div>
    )
  },

  renderheader: function () {
    return (
      <div className='header collections'>
        <span className='title'>
          Create a new Collection
        </span>
        <a onClick={this.props.close} className='close'></a>
      </div>
    )
  },

  render: function () {
    return (
      <Modal
        isOpen={this.state.visible}
        onRequestClose={this.props.close}
        style={DefaultModalStyles}>
        <div className='back-button' onClick={this.props.close}>Back</div>
        {this.renderheader()}
        {this.renderCollectionForm()}
        <RenderMobile component={Footer} />
      </Modal>
    )
  }
});

export default CreateCollectionModal;
