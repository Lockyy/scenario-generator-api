import React from 'react';
import _ from 'lodash';
import { Link, Navigation } from 'react-router';
import FluxTagsPageActions from '../../actions/FluxTagsPageActions'
import TagsPageStore from '../../stores/TagsPageStore'
import TagResults from '../search/TagResults'
import BackBar from '../BackBar'

const TagsPage = React.createClass({
  mixins: [ Navigation ],
  displayName: 'TagsPage',

  getInitialState: function() {
    return {
      data: []
    }
  },

  getLetter: function() {
    return this.props.params.letter
  },

  componentDidMount: function() {
    TagsPageStore.listen(this.onChange.bind(this));
    FluxTagsPageActions.fetchTags();
  },

  onChange: function(data) {
    this.setState(data);
  },

  tagLinks: function(letter) {
    return (
      <Link className='tag-page-link' to={`/app/tags/${letter}`}>
        {letter}
      </Link>
    )
  },

  renderLeftBar: function() {
    if(this.state.data.tags) {
      let containerClass = 'col-xs-12 col-sm-3 left-bar';
      if(this.getLetter()) {
        containerClass = `${containerClass} hidden-xs`
      }

      return (
        <div>
          <div className={containerClass}>
            <Link to='/app/tags' className='tagged-in'>
              All Tags
            </Link>
            { _.map(Object.keys(this.state.data.tags), this.tagLinks) }
          </div>
        </div>
      )
    }
  },

  renderTagSection: function(letter) {
    let topRight;
    let containerClass;

    if(this.getLetter()) {
      topRight = 'size';
      containerClass = `${letter}`
    } else {
      topRight = 'hide';
      containerClass = `${letter} hidden-xs`
    }

    let tagSection = this.state.data.tags[letter];

    if(!this.getLetter() || (this.getLetter() && this.getLetter() == letter)) {
      return (
        <TagResults
          data={{
            total: tagSection.total,
            data: tagSection.tags}}
          title={letter}
          topRight={topRight}
          topLeft={'link'}
          containerClass={containerClass}
          link={`/app/tags/${letter}`} />
      )
    }
  },

  renderTags: function() {
    if(this.state.data.tags) {
      return (
        <div className='col-xs-12 col-md-6'>
          { _.map(Object.keys(this.state.data.tags), this.renderTagSection) }
        </div>
      )
    }
  },

  renderBackBar: function() {
    if(this.getLetter()) {
      return (
        <BackBar
          text='Back'
          link='/app/tags' />
      )
    }
  },

  render: function() {
    return (
      <div className='tags-page'>
        { this.renderBackBar() }
        <div className='row'>
          { this.renderLeftBar() }
          { this.renderTags() }
        </div>
      </div>
    );
  }
})

export default TagsPage;
