import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'

import userService from '../services/UserService'
import { useMessager } from '../hooks/Messager'
import { insertUser, setAllUsers } from '../reducers/AllUsersReducer'
import DeleteDialog from './DeleteDialog'
import EditUserForm from './EditUserForm'

import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  gridItem: {
    margin: theme.spacing(3, 0, 2)
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    padding: theme.spacing(2),
    margin: theme.spacing(3, 0, 2),
  }
}))

const UserPage = () => {
  const classes = useStyles()
  const history = useHistory()
  const dispatch = useDispatch()
  const messager = useMessager()
  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false)
  const id = useParams().id
  const allUsers = useSelector(state => state.allUsers)
  const loggedUser = useSelector(state => state.user)
  const user = allUsers.find(u => u.id === id)

  useEffect(() => {
    userService.getById(id)
      .then(user => {
        dispatch(insertUser(user))
      })
      .catch((exception) => {
        const error = exception.response.data.error || "Could not retrieve user data from server!"
        messager.showErrorMessage(error)
      })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const deleteUser = () => {
    userService.remove(id)
      .then(() => {
        messager.showInfoMessage('User data succesfully deleted!')
        const filteredUsers = allUsers.filter(u => u.id !== id)
        dispatch(setAllUsers(filteredUsers))
        history.push('/users')
      })
      .catch((exception) => {
        const error = exception.response.data.error || "Could not delete user data from server!"
        messager.showErrorMessage(error)
      })
  }

  const handleDeleteDialogYesAnswer = () => {
    setDeleteDialogVisible(false)
    deleteUser()
  }

  const handleDeleteDialogNoAnswer = () => {
    setDeleteDialogVisible(false)
  }

  if (user === undefined) {
    return (
      <div>
        <h1>domzzer / Users / 404 (User not found) </h1>
      </div>
    )
  }

  return (
    <div>
      <h1>domzzer / Users / {user.username} </h1>

      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <EditUserForm user={user} />
        </div>
      </Container>

      <Grid container direction="column" justifyContent="center" alignItems="center">
        {loggedUser !== null && loggedUser.userRole === 'ADMIN' &&
          <Grid item xs>
            <Button
              style={{ marginTop: 25 }}
              color="secondary"
              variant="contained"
              size="large"
              onClick={() => setDeleteDialogVisible(true)} >
              Remove from database
            </Button>
            <DeleteDialog
              open={deleteDialogVisible}
              handleDialogYesAnswer={handleDeleteDialogYesAnswer}
              handleDialogNoAnswer={handleDeleteDialogNoAnswer}
            />
          </Grid>
        }
      </Grid>
    </div >
  )
}

export default UserPage