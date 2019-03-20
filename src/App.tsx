import React, { Component } from 'react';
import Table from './components/Table';
import data100 from './data/report_100.json';
import './styles/App.scss';
class App extends Component {
  render() {
    return <Table data={data100} />
  }
}

export default App
