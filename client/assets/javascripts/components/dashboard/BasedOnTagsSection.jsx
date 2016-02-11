import React from 'react/addons';
const ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
import _ from 'lodash';
import ProductBox from '../ProductBox';
import SectionRow from '../SectionRow';
import Section from '../Section';

function sumSizeFunc(item) {
  return item.props.size;
}

class BasedOnTagsSection extends React.Component {
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
    let gridSize = this.props.cols;
    let boxSize = 2;
    if (products.length > 1) {
      boxSize = _.last(products).props.size;
      if (_.uniq(_.takeRight(products, 2), function(pr) { return pr.props.size }).length == 1) {
        boxSize = _.last(products).props.size - 1;
      }
    }

    return boxSize <= 0 ? 0.5 : boxSize;
  }

  buildRows(products) {
    let sectionRows = [];
    let row;

    while (products.length > 0) {
      row = _.last(sectionRows);

      if (!row || _.sum(row, sumSizeFunc) >= this.props.cols) {
        row = [];
        sectionRows.push(row);
      }

      row.push(products.shift());
    }

    return sectionRows.map(function mapRows(sectionRow, index) {
      return (<SectionRow key={`based_on_tags_row_${index}`} items={sectionRow}/>);
    });
  }

  getCustomizeProductBoxDetailFn(tag) {
    return function(props) {
      return <a className='link-tag' href={`/app/tag/${tag.slug}/products/1`}>
        <span className='tag'>{tag.name}</span>
      </a>
    }
  }

  fetchProducts() {
    let items = [];
    let _this = this;

    if (_.isEmpty(this.props.items)) return [];
    _.each(this.props.items, function(products) {
      _.each(products, function(product) {
        let tag = _.sample(product.user_tags);

        items.push(<ProductBox
                    typeSizeImage="medium_height"
                    key={`based_on_tags_product_box_${product.id}`}
                    size={_this.getCurrentBoxSize(items, product)}
                    onCustomizeDetail={_this.getCustomizeProductBoxDetailFn(tag)}
                    {...product} />);
      });
    });

    this.state.offset = items.length;
    return items;
  }

  fetchRows() {
    return this.buildRows(this.fetchProducts());
  }

  render() {
    return (<Section hasPagination={this.state.hasPagination} {...this.props}>
      <ReactCSSTransitionGroup transitionName="section-row">
        {this.fetchRows()}
      </ReactCSSTransitionGroup >
    </Section>);
  }
}

BasedOnTagsSection.displayName = 'BasedOnTagsSection';

BasedOnTagsSection.defaultProps = {
  cols: 4,
  rows: 2,
  title: 'Based on your tags'
};

BasedOnTagsSection.propTypes = {
  cols: React.PropTypes.number.isRequired,
  items: React.PropTypes.object.isRequired,
  title: React.PropTypes.string.isRequired,
  itemsClass: React.PropTypes.string
};

export default BasedOnTagsSection;
