import React, { Component } from 'react';
import { SearchProps } from '../../models';

export default class SearchField extends Component<SearchProps> {
  render() {
    const { handleSearch, search } = this.props
    return <input onChange={e => handleSearch(e)} value={search} />
  }
}
