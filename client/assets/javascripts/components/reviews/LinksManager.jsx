import React from 'react'
import FluxReviewPageActions from '../../actions/FluxReviewPageActions'

const LinksManager = React.createClass({
  getInitialState: function getInitialState() {
    return {
      links: []
    };
  },

  _handleAddLink: function _handleAddLink(e) {
    let link_to_add = React.findDOMNode(this.refs.product_review_link_to_add)
    let link = { url: link_to_add.value };
    var _this = this;

    FluxReviewPageActions.addLink(link, {
      success: function(link) {
        var oldState = _this.state;

        _this.setState(_.merge({}, oldState, {links: [link]}, function(a, b) {
          if (_.isArray(a)) { return a.concat(b) }
        }))

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
      <div className='links-manager'>
        <ul className='links' ref='links'>
          {_.map(this.state.links, function(link) {
            let id = Math.floor((Math.random() * 1000000) + 1);

            return <li className='link' id={`link_${id}`} ref={`link_${id}`}>
              <div className=''>
                <input type='hidden' className='link_url' name={`review[links[${id}][url]]`} value={link.url} />
                <a href={link.url}>{link.url}</a>
              </div>
            </li>
          })}
        </ul>

        <div className='form-group links'>
          <label htmlFor='product[review[link]]' className='sr-only'>Review's links</label>
          <div className='input-group'>
            <input type='text' className='form-control' placeholder='Add a link' name='product[review[link]]'
              pattern="[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)"
              title="Include a valid url" ref='product_review_link_to_add'/>

            <span className="input-group-btn">
              <button className="btn btn-default" type="button" onClick={this._handleAddLink} >Add</button>
            </span>
          </div>
        </div>
      </div>
    );
  }
});

export default LinksManager;
