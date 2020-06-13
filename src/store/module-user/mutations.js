const login = (state, loginInfo) => {
  if (loginInfo.auth_token) {
    state.userToken = loginInfo.auth_token
  }
  if (loginInfo.id) {
    state.userID = loginInfo.id
  }
  if (loginInfo.username) {
    state.username = loginInfo.username
  }
  if (loginInfo.first_name) {
    state.firstName = loginInfo.first_name
  }
  if (loginInfo.last_name) {
    state.lastName = loginInfo.last_name
  }
}

const logout = (state) => {
  state.userToken = ''
  state.userID = ''
  state.username = ''
  state.firstName = ''
  state.lastName = ''
}

export {
  login,
  logout
}
