import React, { Component } from 'react';
import { TBodyProps } from '../../models';

class TBody extends Component<TBodyProps> {
  handleTypeView = (val: string | number | boolean, search: string) => {
    // return RenderValue(val)
    switch (typeof val) {
      case 'number': {
        if (val.toString().includes(search) && search !== '') {
          return <mark>{val}</mark>
        }
        return val
      }
      case 'string': {
        if (val.includes(search) && search !== '') {
          return <mark>{val}</mark>
        }
        return val
      }
      case 'boolean': {
        if (search.includes('Yes')) {
          return <mark>Yes</mark>
        }
        if (search.includes('No')) {
          return <mark>No</mark>
        }
        return val ? 'Yes' : 'No'
      }
    }
  }

  render() {
    const { data, columns, search } = this.props
    return (
      <tbody>
        {data.map((row, i) => (
          <tr key={i}>
            {columns.map((col, j) =>
              col.visible ? (
                <td key={j}>{this.handleTypeView(row[col.value], search)}</td>
              ) : null
            )}
          </tr>
        ))}
      </tbody>
    )
  }
}

export default TBody
