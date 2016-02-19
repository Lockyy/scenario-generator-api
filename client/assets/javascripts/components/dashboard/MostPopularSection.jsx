import React from 'react/addons';
const ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
import _ from 'lodash';
import Section from '../Section';
import SectionRow from '../SectionRow';
import ProductBox from '../ProductBox';
import TagsBox from '../TagsBox';
import RenderMobile from '../RenderMobile';
import RenderDesktop from '../RenderDesktop';


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
    let boxSize = gridSize - 1;
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

  fetchProducts() {
    let product;
    let desktopProducts = [];
    let mobileProducts = [];
    let hasItems;
    let needsItem;
    let sumItems;
    let currentItem = 0;
    let gridSize = this.props.cols;

    if (!this.props.items) return [];

    do {
      product = this.props.items[currentItem++];

      desktopProducts.push(this.getProductBoxDesktopComponent(desktopProducts, product));
      mobileProducts.push(this.getProductBoxMobileComponent(product));

      hasItems = this.props.items.length > currentItem;
      sumItems = _.sum(desktopProducts, sumSizeFunc);
      needsItem = sumItems < this.state.rows * gridSize;
    } while (hasItems && needsItem);

    this.state.offset = currentItem;

    let allProducts = [];
    for(let i = 0; i < desktopProducts.length; i++){
      allProducts.push(desktopProducts[i])
      allProducts.push(mobileProducts[i])
    }

    return allProducts;
  }

  getProductBoxDesktopComponent(products, product){
    return (
      <RenderDesktop
        component={ProductBox}
        size={this.getCurrentBoxSize(products, product)}
        key={`most_popular_product_desktop_box_${product.id}`}
        typeSizeImage="medium"
        {...product}
      />
    )
  }

  getProductBoxMobileComponent(product){
    return (
      <RenderMobile
        component={ProductBox}
        size="1"
        key={`most_popular_product_mobile_box_${product.id}`}
        typeSizeImage="medium"
        {...product}
      />
    )
  }

  fetchItems() {
    return this.fetchProducts();
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
