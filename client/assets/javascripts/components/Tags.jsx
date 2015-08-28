import React from 'react';
import _ from 'lodash';
import { Navigation } from 'react-router';

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
      this.transitionTo(`/app/tags/${e.target.dataset.slug}/1`);
    }
  },

  renderTags: function() {
    let tagTags = [];
    let tags = this.getTags() || [];
    let selectedTags = this.getSelectedTags();
    let max = _.min([tags.length, this.getMax()]);
    for (let i = 0; i < max; i++) {
      let tag = tags[i];
      let isSelected = _.includes(selectedTags, tag) ;
      let classes = "tag " + ( isSelected ? 'selected': '');
      tagTags.push(<span className={classes} data-slug={tag.slug} onClick={ (e) => this.onClick(e) }>{tag.name}</span>);
    }

    return <div className={`tags ${this.getContainerName()}`}>{tagTags}</div>;

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
      <div className='tag-holder'>
        {this.renderTags()}
        {this.renderLink()}
      </div>
    )
  }

})

export default Tags;
