import React from 'react';
import _ from 'lodash';
import ProductBox from './ProductBox';
import SectionRow from './SectionRow';

class Section extends React.Component {
  constructor() {
    super()

    this._currentItem = 0;
  }

  componentDidMount() {
    let component = $(React.findDOMNode(this));
    let items = $(component).find('.items')
    let _toggleSection = _.throttle(function() {
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

  _getCurrentBoxSize(products, product) {
    let gridSize = this.props.cols;
    let boxSize = gridSize - 1;
    let lastBoxes = _.takeRight(products, gridSize);
    let sumLastBoxes = _.sum(lastBoxes, 'props.size');
    let countBoxSizes = _.countBy(_.map(products, 'props.size'));
    let lastProductBoxSize = _.last(products) ? _.last(products).props.size : 0

    if (products.length > 0) {
      boxSize = _.min([_.last(products).props.size, gridSize - (_.last(products).props.size || 0)]);
      if(countBoxSizes[boxSize] >= gridSize || countBoxSizes[boxSize] * boxSize >= gridSize) { boxSize = _.max([0, boxSize - 1]) }
    } else {
      if(!product.image) { boxSize = _.max([0, boxSize - 1]) }
    }

    return boxSize == 0 ? 0.5 : boxSize;
  }

  _buildRows(products) {
    let sectionRows = [];

    while(products.length > 0) {
      let row = _.last(sectionRows);

        if (!row || _.sum(row, function(item) { return item.props.size }) >= this.props.cols) {
        row = [];
        sectionRows.push(row);
      }

      let product = products.shift();
      row.push(product);
    }

    return sectionRows.map(function(row) { return (<SectionRow items={row} />); });
  }

  _fetchItems() {
    let self = this;
    let keepFetching = true;
    let products = [];
    let hasItems, needsItem;

    if (!self.props.items) return [];

    do {
      let product = self.props.items[self._currentItem++];

      products.push(<ProductBox size={self._getCurrentBoxSize(products, product)} {...product} />);

      hasItems = self.props.items.length > self._currentItem;
      let sumItems = _.sum(products, function(product) { return product.props.size });
      needsItem = sumItems < self.props.rows * self.props.cols;
    } while(hasItems && needsItem);

    return this._buildRows(products);
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
        {this._fetchItems()}

        <div className='show-more-container'>
          <button type='button' className='show-more'>Show More</button>
        </div>
      </div>
    </div>);
  }
}

Section.defaultProps = {
  cols: 4,
  rows: 2,
  title: ''
}

Section.propTypes = {
  cols: React.PropTypes.number.isRequired,
  rows: React.PropTypes.number.isRequired,
  title: React.PropTypes.string.isRequired,
  itemsClass: React.PropTypes.string
}

export default Section;
