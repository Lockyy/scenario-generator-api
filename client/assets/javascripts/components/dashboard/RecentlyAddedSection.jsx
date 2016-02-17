import React from 'react/addons';
const ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
import _ from 'lodash';
import ProductBox from '../ProductBox';
import SectionRow from '../SectionRow';
import Section from '../Section';
import TagsBox from '../TagsBox';

function sumSizeFunc(item) {
  return item.props.size;
}

class RecentlyAddedSection extends React.Component {
  constructor() {
    super();

    this.state = {
      offset: 0,
      rows: 2,
      hasPagination: true
    };
  }

  getOffset() {
    return this.state.offset;
  }

  getMax() {
    // TODO: add smart method to calculate
    return 8;
  }

  getCurrentBoxSize(products, product) {
    //This needs to be refactored
    let gridSize = products.length == 1 ? this.props.cols - 1 : this.props.cols;
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

    boxSize = boxSize == 3 ? boxSize - 1 : boxSize;
    return boxSize === 0 ? 0.5 : boxSize;
  }

  fetchProducts() {
    let product;
    let products = [];
    let hasItems;
    let needsItem;
    let sumItems;
    let currentItem = 0;
    let tagsBox = false;

    if (!this.props.items || !this.props.items.products) return [];

    do {
      product = this.props.items.products[currentItem++];

      products.push(<ProductBox
                      size={this.getCurrentBoxSize(products, product)}
                      key={`recently_added_tags_product_box_${product.id}`}
                      typeSizeImage="medium"
                      {...product} />);

      if(!tagsBox && _.sum(products, sumSizeFunc) == 3) {
        tagsBox = true
        products.push(this.fetchTags())
      }

      hasItems = this.props.items.products.length > currentItem;
      sumItems = _.sum(products, sumSizeFunc);
      needsItem = sumItems < this.state.rows * this.props.cols;
    } while (hasItems && needsItem);

    this.state.offset = currentItem;
    return products;
  }

  fetchTags() {
    if (!this.props.items || !this.props.items.tags) return '';

    return (<TagsBox key={`most_popular_tags_box`} size={1} title={'Popular tags'} tags={this.props.items.tags} />);
  }

  render() {
    return (
        <Section hasPagination={this.state.hasPagination} {...this.props}>
          <ReactCSSTransitionGroup transitionName="section-row">
            {this.fetchProducts()}
          </ReactCSSTransitionGroup >
        </Section>);
  }
}

RecentlyAddedSection.displayName = 'RecentlyAddedSection';

RecentlyAddedSection.defaultProps = {
  cols: 4,
  rows: 2,
  title: 'Recently Added Products'
};

RecentlyAddedSection.propTypes = {
  cols: React.PropTypes.number.isRequired,
  items: React.PropTypes.array.isRequired,
  title: React.PropTypes.string.isRequired,
  itemsClass: React.PropTypes.string
};

export default RecentlyAddedSection;
