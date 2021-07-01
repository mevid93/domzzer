import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

const DeleteDialog = (props) => {
  const open = props.open
  const handleYesAnswer = props.handleDialogYesAnswer
  const handleNoAnswer = props.handleDialogNoAnswer

  return (
    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Delete record from database?"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to remove record from the database?
          This operation cannot be undone later.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleYesAnswer} color="primary" autoFocus>
          Yes
        </Button>
        <Button onClick={handleNoAnswer} color="primary">
          No
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DeleteDialog