import React from 'react'
import { BrowserRouter as Router } from "react-router-dom"
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'

import SlaveTable from '../components/SlaveTable'

test('renders content', () => {
  const slaves = [
    {
      name: 'SlaveMachine0',
      address: 'http://127.0.0.1:1000',
      status: 'OFFLINE',
      vulnerabilitiesFound: 0,
      username: 'admin123',
      password: 'DontTellAnyone',
      id: '1111111111111111'
    },
    {
      name: 'SlaveMachine1',
      address: 'http://127.0.0.1:1001',
      status: 'OFFLINE',
      vulnerabilitiesFound: 0,
      id: '2222222222222222'
    },
    {
      name: 'SlaveMachine2',
      address: 'http://127.0.0.1:1002',
      status: 'OFFLINE',
      vulnerabilitiesFound: 1,
      id: '3333333333333333'
    }
  ]

  const view = render(
    <Router>
      <SlaveTable slaves={slaves} />
    </Router>
  )

  expect(view.container).toHaveTextContent(
    'SlaveMachine0'
  )
  expect(view.container).toHaveTextContent(
    'http://127.0.0.1:1001'
  )
  expect(view.container).toHaveTextContent(
    'OFFLINE'
  )
})