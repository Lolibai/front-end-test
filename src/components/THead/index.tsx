import React, { Component } from 'react';
import { SORT_ORDER } from '../../const';
import { THeadProps } from '../../models';

class THead extends Component<THeadProps> {
  handleSortIcon = (order: number) => {
    switch (order) {
      case SORT_ORDER.SORTED_UP: {
        return <span>&#x2191;</span>
      }
      case SORT_ORDER.SORTED_DOWN: {
        return <span>&#x2193;</span>
      }
      case SORT_ORDER.NOT_SORTED: {
        return <span>&#x21c5;</span>
      }
    }
  }

  componentDidUpdate(prevProps: THeadProps) {
    const { data, columns, updateColumns } = this.props

    const tmpColumns = columns

    if (this.props.data !== prevProps.data) {
      data.map(element => {
        Object.keys(element).map(kel => {
          if (
            element.hasOwnProperty(kel) &&
            tmpColumns.map(col => col.value).indexOf(kel) === -1
          ) {
            const columnData = {
              value: kel,
              order: SORT_ORDER.NOT_SORTED,
              type: typeof element[kel],
              visible:
                data.filter(
                  el =>
                    el[kel] === '' || el[kel] === undefined || el[kel] === null
                ).length <
                data.length * 0.2
            }
            tmpColumns.push(columnData)
          }
        })
      })
      updateColumns(tmpColumns)
    }
  }

  render() {
    const { columns, onSort } = this.props
    return (
      <thead>
        <tr>
          {columns.map((col, j) =>
            col.visible ? (
              <th key={j} onClick={() => onSort(j)}>
                {col.value}&nbsp;
                {this.handleSortIcon(col.order)}
              </th>
            ) : null
          )}
        </tr>
      </thead>
    )
  }
}

export default THead
