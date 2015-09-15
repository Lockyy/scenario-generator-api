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

  renderLeftBar: function () {
    if(this.state.data.tags) {
      let containerClass = 'col-xs-10 col-xs-offset-1 col-sm-3 col-sm-offset-0 left-bar'
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
    let topRight
    let tags
    let containerClass

    if(this.getLetter()) {
      topRight = 'size'
      tags = this.state.data.tags[letter].tags
      containerClass = `${letter}`
    } else {
      topRight = 'hide'
      tags = this.state.data.tags[letter].tags.slice(0, 12)
      containerClass = `${letter} hidden-xs`
    }

    if(!this.getLetter() || (this.getLetter() && this.getLetter() == letter)) {
      return (
        <TagResults
          data={{
            total: this.state.data.tags[letter].total,
            data: tags}}
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
        <div className='col-xs-10 col-xs-offset-1 col-sm-6 col-sm-offset-0'>
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
