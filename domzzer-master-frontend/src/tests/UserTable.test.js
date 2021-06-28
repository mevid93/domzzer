import React from 'react'
import {
  BrowserRouter as Router,
} from "react-router-dom"
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'

import UserTable from '../components/UserTable'

test('renders content', () => {
  const users = [
    {
      username: 'LiteUser',
      password: 'elite1337',
      userRole: 'LITE',
      id: '1111111111111111'
    },
    {
      username: 'PROUser',
      password: 'propulsion',
      userRole: 'PRO',
      id: '2222222222222222'
    },
    {
      username: 'admin',
      password: 'iamalmighty',
      userRole: 'ADMIN',
      id: '3333333333333333'
    }
  ]

  const component = render(
    <Router>
      <UserTable users={users} />
    </Router>
  )

  expect(component.container).toHaveTextContent(
    'LiteUser'
  )
  expect(component.container).toHaveTextContent(
    'PRO'
  )
  expect(component.container).not.toHaveTextContent(
    'iamalmighty'
  )
})