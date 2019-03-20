import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { render } from 'react-testing-library';
import 'react-testing-library/cleanup-after-each';
import Table from '../components/Table';
import THead from '../components/THead';
import data100 from '../data/report_100.json';

Enzyme.configure({ adapter: new Adapter() })

describe('THead', () => {
  const wrapper = shallow(<Table data={data100} />)
  const { container } = render(
    <table>
      <THead
        data={data100}
        columns={Object.keys(data100[0])}
        onSort={wrapper.instance().onSort}
        updateColumns={wrapper.instance().updateColumns}
      />
    </table>
  )

  test('renders thead', () => {
    let tHead = container.querySelector('thead')
    expect(tHead).toBeDefined()
  })

  test('render th', () => {
    afterAll(() => {
      let ths = container.querySelectorAll('th')
      expect(ths.length).toBe(wrapper.instance().state.columns.length)
    })
  })

  test('default order th', () => {
    afterAll(() => {
      expect(
        wrapper.instance().state.columns.every(col => col.order === -1)
      ).toBeTruthy()
    })
  })
})
