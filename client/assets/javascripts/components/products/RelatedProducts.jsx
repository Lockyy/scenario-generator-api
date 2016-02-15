import React from 'react/addons';
const ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
import _ from 'lodash';
import ProductBox from '../ProductBox';
import SectionRow from '../SectionRow';
import Section from '../Section';

function sumSizeFunc(item) {
  return item.props.size;
}

class RelatedProducts extends React.Component {
  constructor() {
    super();

    this.state = {
      offset: 0,
      rows: 1
    };
  }

  fetchProducts() {
    let product;
    let products = [];
    let hasItems;
    let needsItem;
    let sumItems;
    let currentItem = 0;

    if (!this.props.items) return [];

    do {
      product = this.props.items[currentItem++];

      products.push(<ProductBox
          typeSizeImage="medium_height"
          size={this.props.size} {...product} />);

      hasItems = this.props.items.length > currentItem;
      sumItems = _.sum(products, sumSizeFunc);
      needsItem = sumItems < this.state.rows * this.props.cols;
    } while (hasItems && needsItem);

    this.state.offset = currentItem;
    return products;
  }

  render() {
    return (
      <Section
        hasPagination={false}
        customHeaderTag={this.props.customHeaderTag}
        {...this.props}
        className='section-row related-products' >
        {this.fetchProducts()}
      </Section>
    );
  }
}

RelatedProducts.displayName = 'RelatedProducts';

RelatedProducts.defaultProps = {
  cols: 4,
  title: 'Related Products'
};

RelatedProducts.propTypes = {
  cols: React.PropTypes.number.isRequired,
  items: React.PropTypes.array.isRequired,
  title: React.PropTypes.string.isRequired,
  itemsClass: React.PropTypes.string
};

export default RelatedProducts;
