import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { render } from 'react-testing-library';
import 'react-testing-library/cleanup-after-each';
import Table from '../components/Table';
import data100 from '../data/report_100.json';

Enzyme.configure({ adapter: new Adapter() })

describe('Table', () => {
  const { container } = render(<Table data={data100} />)

  test('renders table', () => {
    let mainTable = container.querySelector('table')
    expect(mainTable).toBeDefined()
  })

  test('type view bool no', () => {
    const wrapper = shallow(<Table data={data100} />)
    afterAll(() => {
      wrapper.instance().handleToggleColumn(0)
      if (data100.map(obj => obj))
        expect(wrapper.instance().state.columns[0].visible).toBeFalsy()
    })
  })
})
