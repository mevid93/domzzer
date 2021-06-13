import React, { useState } from 'react'
import slaveService from '../services/SlaveService'
import { useDispatch } from 'react-redux'
import { errorMsgChange } from '../reducers/ErrorMsgReducer'
import { infoMsgChange } from '../reducers/InfoMsgReducer'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles((theme) => ({
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


const NewSlaveForm = () => {
  const dispatch = useDispatch()
  const classes = useStyles()
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')

  const addSlave = (event) => {
    event.preventDefault()
    const newSlave = {
      name: name,
      address: address
    }
    slaveService.create(newSlave)
      .then(result => {
        dispatch(infoMsgChange("Succesfully added new slave to database!"))
        setTimeout(() => {
          dispatch(infoMsgChange(null))
        }, 5000)
        setName('')
        setAddress('')
      })
      .catch(error => {
        dispatch(errorMsgChange("Could not add new slave to database!"))
        setTimeout(() => {
          dispatch(errorMsgChange(null))
        }, 5000)
      })
  }

  const handleSlaveNameChange = (event) => {
    setName(event.target.value)
  }

  const handleSlaveAddressChange = (event) => {
    setAddress(event.target.value)
  }

  return (
    <div>
      <h1>domzzer / Slaves / New</h1>

      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>

          <Typography gutterBottom variant="h3">Add New Slave</Typography>

          <form onSubmit={addSlave} className={classes.form}>

            <TextField
              label="Name"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              onChange={handleSlaveNameChange}
              value={name}
            />

            <TextField
              label="Address"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              onChange={handleSlaveAddressChange}
              value={address}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Add
            </Button>

          </form>

        </div>
      </Container>
    </div >
  )
}

export default NewSlaveForm