import React from 'react/addons';
const ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
import _ from 'lodash';
import Section from '../Section';
import SectionRow from '../SectionRow';
import ProductBox from '../ProductBox';
import TagsBox from '../TagsBox';

function sumSizeFunc(item) {
  return item.props.size;
}

class MostPopularSection extends React.Component {
  constructor() {
    super();

    this.state = {
      offset: 0,
      rows: 1
    };
  }

  getOffset() {
    return this.state.offset;
  }

  getMax() {
    // TODO: add smart method to calculate
    return 3;
  }

  getCurrentBoxSize(products, product) {
    let gridSize = this.props.cols - 1;
    let boxSize = gridSize;
    let countBoxSizes = _.countBy(_.map(products, 'props.size'));

    if (products.length > 0) {
      boxSize = _.min([_.last(products).props.size, gridSize - (_.last(products).props.size || 0)]);
      if (countBoxSizes[boxSize] >= gridSize || countBoxSizes[boxSize] * boxSize >= gridSize) {
        boxSize = _.max([0, boxSize - 1]);
      }
    } else if (!product.image) {
      boxSize = _.max([0, boxSize - 1]);
    }

    return boxSize === 0 ? 0.5 : boxSize;
  }

  buildRows(products) {
    let sectionRows = [];
    let gridSize = this.props.cols;
    let row;

    while (products.length > 0) {
      row = _.last(sectionRows);

      if (!row || _.sum(row, sumSizeFunc) >= gridSize) {
        row = [];
        sectionRows.push(row);
      }

      row.push(products.shift());
    }

    return sectionRows.map(function mapRows(sectionRow, index) {
      return (<SectionRow key={`most_popular_row_${index}`} items={sectionRow}/>);
    });
  }

  fetchProducts() {
    let product;
    let products = [];
    let hasItems;
    let needsItem;
    let sumItems;
    let currentItem = 0;
    let gridSize = this.props.cols;

    if (!this.props.items) return [];

    do {
      product = this.props.items[currentItem++];

      products.push(<ProductBox
                      key={`most_popular_product_box_${product.id}`}
                      size={this.getCurrentBoxSize(products, product)}
                      {...product} />);

      hasItems = this.props.items.length > currentItem;
      sumItems = _.sum(products, sumSizeFunc);
      needsItem = sumItems < this.state.rows * gridSize;
    } while (hasItems && needsItem);

    this.state.offset = currentItem;
    return products;
  }

  fetchItems() {
    let items = this.fetchProducts();
    return this.buildRows(items);
  }

  render() {
    return (<Section hasPagination={false} {...this.props}>
      <ReactCSSTransitionGroup transitionName="section-row">
        {this.fetchItems()}
      </ReactCSSTransitionGroup >
    </Section>);
  }
}

MostPopularSection.displayName = 'MostPopularSection';

MostPopularSection.defaultProps = {
  cols: 4,
  rows: 1,
  title: 'Most Popular'
};

MostPopularSection.propTypes = {
  cols: React.PropTypes.number.isRequired,
  items: React.PropTypes.object.isRequired,
  title: React.PropTypes.string.isRequired,
  itemsClass: React.PropTypes.string
};

export default MostPopularSection;
