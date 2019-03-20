import React, { Component } from 'react';
import { SORT_ORDER } from '../../const';
import { TableProps, TableState } from '../../models';
import '../../styles/Table.scss';
import Legend from '../Legend';
import SearchField from '../SearchField';
import TBody from '../TBody';
import THead from '../THead';

class Table extends Component<TableProps> {
  state: TableState
  constructor(props: TableProps) {
    super(props)
    this.state = {
      search: '',
      newData: [],
      columns: []
    }
  }

  componentDidMount() {
    this.setState({ newData: this.props.data })
  }

  updateColumns = (updatedColumns: any[]) => {
    this.setState({ columns: [...updatedColumns] })
  }

  componentDidUpdate(prevProps: TableProps, prevState: TableState) {
    const { search } = this.state
    const { data } = this.props

    if (search !== prevState.search) {
      this.setState({
        newData:
          search === '' ? data : data.filter(el => this.hasValue(el, search))
      })
    }
  }

  sorting = (value: string | number, type: string) => {
    let sortedData = this.state.newData
    if (type === 'string') {
      sortedData.sort((a, b) => {
        const nameA = a[value] ? a[value].toUpperCase() : ''
        const nameB = b[value] ? b[value].toUpperCase() : ''
        if (nameA < nameB) {
          return -1
        }
        if (nameA > nameB) {
          return 1
        }
        return 0
      })
      this.setState({ newData: sortedData })
    } else {
      sortedData.sort((a, b) => {
        return a[value] - b[value]
      })
      this.setState({ newData: sortedData })
    }
  }

  sortUpUnSorted = (columnIndex: number) => {
    this.sorting(
      this.state.columns[columnIndex].value,
      this.state.columns[columnIndex].type
    )
    let newColumns = this.state.columns
    newColumns[columnIndex].order = SORT_ORDER.SORTED_UP
    this.setState({ columns: newColumns })
  }

  sortUpSorted = (sortedData: any[], columnIndex: number) => {
    this.setState({ newData: sortedData.reverse() })
    let newColumns = this.state.columns
    newColumns[columnIndex].order = SORT_ORDER.SORTED_UP
    this.setState({ columns: newColumns })
  }

  sortDownSorted = (sortedData: any[], columnIndex: number) => {
    this.setState({ newData: sortedData.reverse() })
    let newColumns = this.state.columns
    newColumns[columnIndex].order = SORT_ORDER.SORTED_DOWN
    this.setState({ columns: newColumns })
  }

  onSort = (columnIndex: number) => {
    let sortedData = this.state.newData
    this.state.columns.forEach((col, i) => {
      if (i !== columnIndex) {
        col.order = SORT_ORDER.NOT_SORTED
      }
    })
    if (this.state.columns[columnIndex].order === SORT_ORDER.NOT_SORTED) {
      this.sortUpUnSorted(columnIndex)
    } else if (this.state.columns[columnIndex].order === SORT_ORDER.SORTED_UP) {
      this.sortDownSorted(sortedData, columnIndex)
    } else {
      this.sortUpSorted(sortedData, columnIndex)
    }
  }

  handleSearch = (e: any) => {
    this.setState({ search: e.target.value })
  }

  hasValue(obj: any, search: string) {
    return Object.values(obj).some(
      x =>
        x.toString().includes(search) ||
        search.includes('Yes') ||
        search.includes('No')
    )
  }

  handleToggleColumn = (columnIndex: number) => {
    const newColumns = this.state.columns
    newColumns[columnIndex].visible = !newColumns[columnIndex].visible
    this.setState({ columns: newColumns })
  }

  render() {
    const { updateColumns, onSort } = this
    const { search, newData, columns } = this.state
    const { handleToggleColumn, handleSearch } = this

    return (
      <div className="table_main_view">
        <div>
          <SearchField search={search} handleSearch={handleSearch} />
          <table>
            <THead
              data={newData}
              columns={columns}
              updateColumns={updateColumns}
              onSort={onSort}
            />
            <TBody data={newData} columns={columns} search={search} />
          </table>
        </div>
        <Legend columns={columns} handleToggleColumn={handleToggleColumn} />
      </div>
    )
  }
}

export default Table
