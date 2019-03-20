import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { render } from 'react-testing-library';
import 'react-testing-library/cleanup-after-each';
import TBody from '../components/TBody';
import data100 from '../data/report_100.json';

Enzyme.configure({ adapter: new Adapter() });

describe('TBody', () => {
  const { container } = render(
    <table>
      <TBody data={data100} columns={Object.keys(data100[0])} search="" />
    </table>
  )

  test('renders tbody', () => {
    let tBody = container.querySelector('tbody')
    expect(tBody).toBeDefined()
  })

  test('render rows', () => {
    afterAll(() => {
      let rows = container.querySelectorAll('tr')
      expect(rows.length).toBe(data100.length)
    })
  })

  test('type view number', () => {
    const wrapper = shallow(
      <TBody data={data100} columns={Object.keys(data100[0])} search="" />
    )
    expect(wrapper.instance().handleTypeView(3, '')).toBe(3)
  })
  
  test('type view bool yes', () => {
    const wrapper = shallow(
      <TBody data={data100} columns={Object.keys(data100[0])} search="" />
    )
    expect(wrapper.instance().handleTypeView(true, '')).toBe('Yes')
  })
  
  test('type view bool no', () => {
    const wrapper = shallow(
      <TBody data={data100} columns={Object.keys(data100[0])} search="" />
    )
    expect(wrapper.instance().handleTypeView(false, '')).toBe('No')
  })
  
  test('type view string', () => {
    const wrapper = shallow(
      <TBody data={data100} columns={Object.keys(data100[0])} search="" />
    )
    expect(wrapper.instance().handleTypeView('something', '')).toBe('something')
  })
  
  test('type view number with search', () => {
    const wrapper = shallow(
      <TBody data={data100} columns={Object.keys(data100[0])} search="" />
    )
    const returnValue = shallow(wrapper.instance().handleTypeView(3, '3'))
    expect(returnValue.html()).toBe('<mark>3</mark>')
  })
  
  test('type view bool with search', () => {
    const wrapper = shallow(
      <TBody data={data100} columns={Object.keys(data100[0])} search="" />
    )
    const returnValue = shallow(wrapper.instance().handleTypeView(true, 'Yes'))
    expect(returnValue.html()).toBe('<mark>Yes</mark>')
  })
  
  test('type view bool with search', () => {
    const wrapper = shallow(
      <TBody data={data100} columns={Object.keys(data100[0])} search="" />
    )
    const returnValue = shallow(wrapper.instance().handleTypeView(false, 'No'))
    expect(returnValue.html()).toBe('<mark>No</mark>')
  })
  
  test('type view text with search', () => {
    const wrapper = shallow(
      <TBody data={data100} columns={Object.keys(data100[0])} search="" />
    )
    const returnValue = shallow(wrapper.instance().handleTypeView('field', 'field'))
    expect(returnValue.html()).toBe('<mark>field</mark>')
  })
})
