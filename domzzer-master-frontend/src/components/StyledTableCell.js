import { withStyles } from "@material-ui/core/styles"
import TableCell from '@material-ui/core/TableCell'

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell)

export default StyledTableCell