import React from 'react';
import _ from 'lodash';
import { Navigation } from 'react-router';
import HighlightText from './HighlightText';

// This component takes in an array of strings (the tags) and optionally a link, name, and max.
// The component will then display the tags as little orange buttons.
// If there are more tags than max it will cut off any tags of index greater than
// that and display a hyperlink with text 'name' and href 'link'. This can be used to
// direct the user to a full list of tags. By default max is set to the length of tags and will display all of them.
const Tags = React.createClass({
  displayName: 'Tags',
  mixins: [ Navigation ],

  componentWillReceiveProps: function(nextProps) {
    if(nextProps && nextProps.tags && !nextProps.max){
      nextProps.max = nextProps.tags.length;
    }
  },

  componentDidMount: function() {
    this.hideTagOverflow()
    window.onresize = _.debounce(this.hideTagOverflow, 300)
  },

  componentDidUpdate: function() {
    this.hideTagOverflow()
  },

  // pageWidth - (elementWidth + elementLeft) < 0
  hideTagOverflow: function() {
    let tagHolder = $(this.refs.tags.getDOMNode())
    let tags = tagHolder.children('.tag')
    tags.show()

    for (var i = tags.length - 1; i >= 0; i--) {
      let tag = $(tags[i]);
      let tagHolderHeight = tagHolder.height()
      let tagHolderBottom = tagHolderHeight
      let tagBottom = tag.height() + tag.position().top + parseInt(tag.css('margin')) + parseInt(tag.css('padding'))
      if(tagHolderBottom <= tagBottom) {
        tag.hide();
      } else {
        // We're sorting from bottom to top, if we find a tag that isn't
        // overflowing then we know nothing else is.
        break;
      }
    }
  },

  getMax: function() {
    if(this.props.max) {
      return this.props.max
    }
    return this.getTags().length
  },

  getTags: function() {
    if(this.props) {
      return this.props.tags
    }
  },

  getSelectedTags: function() {
    if(this.props) {
      return this.props.selected
    }
  },

  getContainerName: function() {
    if(this.props.containerClass) {
      return this.props.containerClass
    } else {
      return ''
    }
  },

  onClick: function(e) {
    if(this.props.onClick) {
      this.props.onClick(e)
    } else {
      this.transitionTo(`/app/tag/${e.target.dataset.slug}/products/1`);
    }
  },

  renderTags: function() {
    let tags = this.getTags() || [];
    let selectedTags = this.getSelectedTags();

    let tagElements = _.map(tags, function(tag, index) {
      let isSelected = _.includes(selectedTags, tag.name) ;
      let classes = "tag " + ( isSelected ? 'selected': '');
      return (
        <span
          key={`tag_${index}`}
          className={classes}
          data-slug={tag.slug}
          onClick={ (e) => this.onClick(e) }>
          <HighlightText
            text={tag.name}
            data-slug={tag.slug}
            highlight={this.props.highlight} />
        </span>
      );
    }.bind(this));

    return tagElements
  },

  linkRequired: function() {
    return this.getTags() && this.getTags().length > this.getMax() && this.props.link && this.props.name
  },

  renderLink: function() {
    if(this.linkRequired()) {
      return (
        <a>Show more tags for <span className='product-name'>{this.props.name}</span></a>
      )
    }
  },

  render: function() {
    return (
      <div className={`tag-holder ${this.getContainerName()}`} ref='tags'>
        {this.renderTags()}
        {this.renderLink()}
      </div>
    )
  }

})

export default Tags;
