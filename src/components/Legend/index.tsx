import React, { Component } from 'react';
import { LegendProps } from '../../models';

class Legend extends Component<LegendProps> {
  render() {
    const { columns, handleToggleColumn } = this.props
    return (
      <div>
        {columns.map((col, i) => (
          <div key={i}>
            {' '}
            <label htmlFor={col.value}>{col.value}</label>
            <input
              type="checkbox"
              checked={col.visible}
              name={col.value}
              onChange={() => handleToggleColumn(i)}
            />
          </div>
        ))}
      </div>
    )
  }
}
export default Legend
