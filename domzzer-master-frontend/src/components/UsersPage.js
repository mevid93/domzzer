import { Link } from "react-router-dom"
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useMessager } from '../hooks/Messager'
import userService from '../services/UserService'
import { setAllUsers } from '../reducers/AllUsersReducer'
import UserTable from './UserTable'

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'

const UsersPage = () => {
  const dispatch = useDispatch()
  const messager = useMessager()
  const [filter, setFilter] = useState('')
  const users = useSelector(state => state.allUsers)

  const filteredUsers = users.filter(u => {
    if (u.username.toLowerCase().includes(filter.toLowerCase())) {
      return true
    }
    if (u.userRole.toLowerCase().includes(filter.toLowerCase())) {
      return true
    }
    return false
  })

  useEffect(() => {
    userService
      .getAll()
      .then(users => dispatch(setAllUsers(users)))
      .catch(exception => {
        const error = exception.response.data.error || "Could not retrieve user data from server!"
        messager.showErrorMessage(error)
      })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <h1>domzzer / Users</h1>

      <Grid container spacing={3} justify="flex-start">

        <Grid item xs={6} style={{ marginTop: 15, display: "flex", justifyContent: "flex-start" }}>
          <TextField
            onChange={(event) => setFilter(event.target.value)}
            fullWidth
            value={filter}
            placeholder="filter by keyword"
          />
        </Grid>

        <Grid item xs={6} style={{ display: "flex", justifyContent: "center" }}>
          <Button
            color="primary"
            variant="contained"
            component={Link}
            to="/users/new"
          >add new user</Button>
        </Grid>

      </Grid>

      <UserTable users={filteredUsers} />
    </div>
  )
}

export default UsersPage