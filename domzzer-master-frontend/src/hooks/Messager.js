import { useDispatch } from 'react-redux'

import { errorMsgChange } from '../reducers/ErrorMsgReducer'
import { infoMsgChange } from '../reducers/InfoMsgReducer'

const MSG_DISPLAY_TIME = 5000

const useMessager = () => {
  const dispatch = useDispatch()

  const showInfoMessage = (message) => {
    if (message === null || message === undefined) {
      return
    }
    dispatch(infoMsgChange(message))
    setTimeout(() => {
      dispatch(infoMsgChange(null))
    }, MSG_DISPLAY_TIME)
  }

  const showErrorMessage = (message) => {
    if (message === null || message === undefined) {
      return
    }
    dispatch(errorMsgChange(message))
    setTimeout(() => {
      dispatch(errorMsgChange(null))
    }, MSG_DISPLAY_TIME)
  }

  return {
    showErrorMessage,
    showInfoMessage,
  }
}

export { useMessager }