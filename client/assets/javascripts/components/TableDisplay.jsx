import React from 'react';
import _ from 'lodash';
import { Link, Navigation } from 'react-router';
import RenderDesktop from './RenderDesktop';
import Rating from './Rating'

// <TableDisplay
//   data={products}
//   allow_sorting={true}
//   columns={[
//     {
//       title: 'Product',
//       link: true,
//       link_to: 'products',
//       dataColumn: 'added_on',
//       secondaryDataType: 'rating',
//       secondaryDataColumn: 'rating',
//       sortByColumn: 'added_on',
//       width: 8,
//     },
//     {
//       title: 'Date Added',
//       dataColumn: 'added_on',
//       secondaryDataType: 'string',
//       secondaryDataColumn: 'added_by',
//       sortByColumn: 'added_on',
//       width: 8,
//     },
//     {
//       title: '',
//       dataColumn: '',
//       value: 'Remove',
//       className='linked underlined',
//       onClick={this.removeProduct},
//       display={this.ownedByUser()},
//       width: 1
//     }
//   ]} />

const TableDisplay = React.createClass ({

  // LifeCycle
  ////////////

  getInitialState: function () {
    return {
      data: [],
      sortByColumn: null,
      sortDirection: 'desc'
    }
  },

  componentWillReceiveProps: function(nextProps) {
    this.performSort(nextProps.data, nextProps.defaultSortColumn, null, 'desc')
  },

  // Events
  /////////

  onSortClick: function(column) {
    if(this.clickableColumn(column)) {
      let sortByColumn = column.sortByColumn;
      let sortByColumnAttribute = column.sortByColumnAttribute
      let newSortDirection = this.newSortDirection(sortByColumn);

      this.performSort(this.state.data, sortByColumn, sortByColumnAttribute, newSortDirection)
    }
  },

  performSort: function(data, column, columnAttribute, direction) {
    let sortedData = _.sortBy(data, function(row) {
      let value = row[column];
      if(columnAttribute) {
        value = value[columnAttribute];
      }
      return value
    })

    if(direction == 'desc') {
      sortedData = sortedData.reverse()
    }

    this.setState({
      data: sortedData,
      sortByColumn: column,
      sortDirection: direction
    })
  },

  newSortDirection: function(newSortColumn) {
    if(newSortColumn == this.state.sortByColumn) {
      return this.state.sortDirection == 'asc' ? 'desc' : 'asc'
    }
    return 'asc'
  },

  // Data Handling
  ////////////////

  getRows: function() {
    return this.state.data
  },

  getRowLink: function(row, type) {
    return `/app/${type}/${row.id}/${row.slug}`
  },

  displayColumn: function(column) {
    return column.display == undefined || column.display
  },

  getComponent: function(column) {
    switch(column.hiddenOn) {
      case 'mobile':
        return RenderDesktop;
      case 'desktop':
        return RenderMobile;
    }
  },

  clickableColumn: function(column) {
    return this.props.allowSorting && column.sortByColumn
  },

  // Rendering
  ////////////

  renderHeader: function() {
    return (
      <RenderDesktop component='div' className='row table-header'>
        {
          _.map(this.props.columns, function(column) {
            return (
              <div
                className={`col-xs-${column.width} ${this.clickableColumn(column) ? 'clickable' : ''}`}
                onClick={() => this.onSortClick(column)}>
                {column.title}
                {this.renderColumnSortIcon(column)}
              </div>
            )
          }.bind(this))
        }
      </RenderDesktop>
    )
  },

  renderColumnSortIcon: function(column) {
    if(column.sortByColumn == this.state.sortByColumn && this.props.allowSorting) {
      return <span className={`sort-icon ${this.state.sortDirection}`} />
    }
  },

  renderRows: function() {
    return (
      <div className='table-display-rows'>
        {_.map(this.getRows(), this.renderRow)}
      </div>
    )
  },

  renderRow: function(row) {
    return (
      <div className='row table-display-row'>

        {_.map(this.props.columns, function(column) {
          return this.renderColumnForRow(row, column)
        }.bind(this))}

      </div>
    )
  },

  renderColumnForRow: function(row, column) {
    if(this.displayColumn(column)) {
      let component = this.getComponent(column);

      return React.createElement(
        component || 'div',
        {
          className: `col-xs-${column.width}`
        },
        [
          this.renderRowData(row, column),
          this.renderRowSecondaryData(row,column)
        ]
      )
    }
  },

  renderRowData: function(row, column) {
    let rowValue;

    if(column.dataColumnAttribute) {
      rowValue = column.value || row[column.dataColumn][column.dataColumnAttribute];
    } else {
      rowValue = column.value || row[column.dataColumn];
    }

    if(column.linkTo) {
      return (
        <Link
          to={this.getRowLink(row, column.linkTo)}
          className={column.className}>
          {rowValue}
        </Link>
      )
    } else {
      return (
        <div
          className={`${column.className} ${row.onClick ? 'clickable' : ''}`}
          onClick={() => row.onClick(row)}>
          {rowValue}
        </div>
      )
    }
  },

  renderRowSecondaryData: function(row, column) {
    if(column.secondaryDataType && column.secondaryDataColumn) {
      switch(column.secondaryDataType) {
        case 'string':
          return <div>{row[column.secondaryDataColumn]}</div>
        case 'rating':
          return <Rating value={row[column.secondaryDataColumn]} name='rating'/>
      }
    }
  },

  render: function() {
    return (
      <div className={`table-display ${this.props.className}`}>
        {this.renderHeader()}
        {this.renderRows()}
      </div>
    )
  },
})

TableDisplay.displayName = 'TableDisplay';

export default TableDisplay;
