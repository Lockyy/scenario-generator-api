import React from 'react';
import _ from 'lodash';
import ProductBox from './ProductBox';
import SectionRow from './SectionRow';
import Section from './Section';

class RecentlyAddedSection extends Section {
  constructor() {
    super()

    this._currentItem = 0;
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

    return(<Section {...this.props}>
      {this._fetchItems()}
    </Section>);
  }
}

RecentlyAddedSection.defaultProps = {
  cols: 4,
  rows: 2,
  title: ''
}

RecentlyAddedSection.propTypes = {
  cols: React.PropTypes.number.isRequired,
  rows: React.PropTypes.number.isRequired,
  title: React.PropTypes.string.isRequired,
  itemsClass: React.PropTypes.string
}

export default RecentlyAddedSection;
