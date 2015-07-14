import React from 'react';
import _ from 'lodash';
import ProductBox from './ProductBox';

class Section extends React.Component {
  componentDidMount() {
    let component = $(React.findDOMNode(this));
    let items = $(component).find('.items')
    let _toggleSection = _.throttle(
      function() {
      let hiddenLink = component.find('.toggle-section:hidden');
      let visibleLink = component.find('.toggle-section:visible');

      visibleLink.fadeToggle('fast', function() {
        items.slideToggle('slow', function() {
          hiddenLink.fadeToggle('fast');
        });
      })
    }, 300, {'trailing' : false});

    $(component).on('click', '.toggle-section', _toggleSection);
  }

  render() {
    var itemClasses = _.compact(['items', this.props.itemsClass]).join(' ');
    var sectionClass = this.props.title.toLowerCase().replace(/\s+/g, '-');
    let sectionClasses = _.compact(['section', sectionClass]).join(' ');

    return(<div className={sectionClasses}>
      <div className='header'>
        <h2 className='section-title'>{this.props.title}</h2>
        <a href='#' className='toggle-section show-section' style={{'display' : 'none'}}>
          <i className='glyphicon glyphicon-chevron-down'></i>SHOW
        </a>
        <a href='#' className='toggle-section hide-section'>
          <i className='glyphicon glyphicon-chevron-up'></i>HIDE
        </a>
      </div>

      <div className='items'>
        {this.props.children}
      </div>
    </div>);
  }
}

Section.defaultProps = {
}

Section.propTypes = {
  title: React.PropTypes.string.isRequired,
  itemsClass: React.PropTypes.string
}

export default Section;
