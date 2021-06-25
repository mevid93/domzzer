import React from 'react'
import {
  BrowserRouter as Router,
} from "react-router-dom"
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'

import SlaveTable from '../components/SlaveTable'

test('renders content', () => {
  const slaves = [
    {
      name: 'SlaveMachine0',
      address: 'http://127.0.0.1:1000',
      status: 'OFFLINE',
      testsDone: 50,
      vulnerabilitiesFound: 0,
      username: 'admin123',
      password: 'DontTellAnyone',
      id: '1111111111111111'
    },
    {
      name: 'SlaveMachine1',
      address: 'http://127.0.0.1:1001',
      status: 'OFFLINE',
      testsDone: 100,
      vulnerabilitiesFound: 0,
      id: '2222222222222222'
    },
    {
      name: 'SlaveMachine2',
      address: 'http://127.0.0.1:1002',
      status: 'OFFLINE',
      testsDone: 50,
      vulnerabilitiesFound: 1,
      id: '3333333333333333'
    }
  ]

  const component = render(
    <Router>
      <SlaveTable slaves={slaves} />
    </Router>
  )

  expect(component.container).toHaveTextContent(
    'SlaveMachine0'
  )
  expect(component.container).toHaveTextContent(
    'http://127.0.0.1:1001'
  )
  expect(component.container).toHaveTextContent(
    'OFFLINE'
  )
})