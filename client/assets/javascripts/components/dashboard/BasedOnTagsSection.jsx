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

    return sectionRows.map(function mapRows(sectionRow) {
      return (<SectionRow items={sectionRow}/>);
    });
  }

  getCustomizeProductBoxDetailFn(tag) {
    return function(props) {
      return <span className='tag'>{tag}</span>
    }
  }

  fetchProducts() {
    let item;
    let items = [];
    let currentItem = 0;
    let _this = this;

    if (_.isEmpty(this.props.items)) return [];
    _.each(this.props.items, function(products, tag) {
      _.each(products, function(product) {
        items.push(<ProductBox size={_this.getCurrentBoxSize(items, product)}
          onCustomizeDetail={_this.getCustomizeProductBoxDetailFn(tag)} {...product} />);
      });
    });

    this.state.offset = items.length;
    return this.buildRows(items);
  }

  render() {
    return (<Section hasPagination={this.state.hasPagination} {...this.props}>
      <ReactCSSTransitionGroup transitionName="section-row">
        {this.fetchProducts()}
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
  items: React.PropTypes.array.isRequired,
  title: React.PropTypes.string.isRequired,
  itemsClass: React.PropTypes.string
};

export default BasedOnTagsSection;
