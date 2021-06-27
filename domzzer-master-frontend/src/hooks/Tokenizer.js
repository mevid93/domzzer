import serverInfoService from '../services/ServerInfoService'
import slaveService from '../services/SlaveService'
import userService from '../services/UserService'
import vulnerabilityService from '../services/VulnerabilityService'
import settingsService from '../services/SettingsService'

const useTokenizer = () => {
  
  const updateServicesWithToken = (token) => {
    serverInfoService.setToken(token)
    slaveService.setToken(token)
    userService.setToken(token)
    vulnerabilityService.setToken(token)
    settingsService.setToken(token)
  }

  const clearServicesFromToken = () => {
    updateServicesWithToken(null)
  }

  return { updateServicesWithToken, clearServicesFromToken }
}

export { useTokenizer }