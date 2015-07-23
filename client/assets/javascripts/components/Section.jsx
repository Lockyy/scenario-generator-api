import React from 'react';
import _ from 'lodash';

class Section extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    let component = $(React.findDOMNode(this));
    let items = $(component).find('> .items');

    let _toggleSection = _.throttle(function() {
      let hiddenLink = component.find('.toggle-section:hidden');
      let visibleLink = component.find('.toggle-section:visible');

      visibleLink.stop().fadeToggle('fast', function() {
        items.stop().slideToggle('slow', function() {
          hiddenLink.stop().fadeToggle('fast');
        });
      });
    }, 300, {trailing: false});

    $(component).find('.toggle-section').on('click', _toggleSection);
  }

  showMore() {
    if (_.isFunction(this.props.onShowMore)) {
      this.props.onShowMore();
    }
  }

  render() {
    let itemClasses = _.compact(['items', this.props.itemsClass]).join(' ');
    let sectionClass = this.props.title.toLowerCase().replace(/\s+/g, '-');
    let sectionClasses = _.compact(['section', sectionClass]).join(' ');

    return (<div className={sectionClasses}>
      <div className='header'>
        <h2 className='section-title'>{this.props.title}</h2>
        <a href='#' className='toggle-section show-section' style={{display: 'none'}}>
          <i className='glyphicon glyphicon-chevron-down'></i>SHOW
        </a>
        <a href='#' className='toggle-section hide-section'>
          <i className='glyphicon glyphicon-chevron-up'></i>HIDE
        </a>
      </div>

      <div className={itemClasses}>
        {this.props.children}

        {this.props.hasPagination ? (<div className='show-more-container'>
          <button type='button' className='show-more' onClick={this.showMore.bind(this)}>Show More
          </button>
        </div>) : ''}

      </div>
    </div>);
  }
}

Section.displayName = 'Section';

Section.propTypes = {
  cols: React.PropTypes.number.isRequired,
  rows: React.PropTypes.number.isRequired,
  title: React.PropTypes.string.isRequired,
  itemsClass: React.PropTypes.string,
  hasPagination: React.PropTypes.bool,
  onShowMore: React.PropTypes.func
};

Section.defaultProps = {
  hasPagination: true
};

export default Section;
