import React from 'react'
import ReviewPageReviewFieldsActions from '../../actions/reviews/ReviewPageReviewFieldsActions'
import RegexConstants from '../../utils/constants/RegexConstants'
import UrlHelper from '../../utils/helpers/UrlHelper'

const LinksManager = React.createClass({
  displayName: 'LinksManager',

  _validate: function validate(url) {
    let isUnique = !_.find(this.props.links, function(link) { return link.url.toLowerCase() == url.toLowerCase() });
    return new RegExp(RegexConstants.URL_PATTERN).test(url) && isUnique;
  },

  _handleAddLink: function _handleAddLink(e) {
    let link_to_add = React.findDOMNode(this.refs.product_review_link_to_add)
    let url = link_to_add.value;

    if(!this._validate(url)) {
      return ;
    }

    let link = { url: url };
    var _this = this;

    ReviewPageReviewFieldsActions.addLink(link, {
      success: function(link) {
        React.findDOMNode(_this.refs.product_review_link_to_add).value = null;
      }
    });
  },
  getLinks: function getLinks() {
    let linksContainer = $(React.findDOMNode(this.refs.links));

    return _.map(linksContainer.find('.link'), function(link) {
      let $link = $(link);

      return {
        url: $link.find('.link_url').val()
      }
    });
  },

  render: function render() {
    return (
      <div className='links-manager items-manager'>
        <ul className='links items' ref='links'>
          {_.map(this.props.links, function(link) {
            let id = Math.floor((Math.random() * 1000000) + 1);

            return <li className='link' id={`link_${id}`} ref={`link_${id}`}>
              <div className=''>
                <input type='hidden' className='link_url' name={`review[links[${id}][url]]`} value={link.url} />
                <a href={UrlHelper.addProtocol(link.url)} target='_blank'>
                  {UrlHelper.addProtocol(link.url)}
                </a>
              </div>
            </li>
          })}
        </ul>

        <div className='input-group'>
          <input type='text' className='form-control' placeholder='Add a link' name='product[review[link]]'
            pattern={RegexConstants.URL_PATTERN} title="Include a valid url" ref='product_review_link_to_add'/>

          <span className="input-group-btn">
            <button className="btn btn-default" type="button" onClick={this._handleAddLink} >Add</button>
          </span>
        </div>
        <span className="help-block with-errors col-xs-12"></span>
      </div>
    );
  }
});

export default LinksManager;
