import { Table } from 'json-table-react';
import React, { Component } from 'react';
import './App.css';
import data100 from './data/report_100.json';

class App extends Component {
  render() {
    return (
      <Table data={data100}/>
    );
  }
}

export default App;
