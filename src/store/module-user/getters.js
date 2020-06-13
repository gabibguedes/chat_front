const getUser = (state) => {
  const user = {
    username: state.username,
    firstName: state.firstName,
    lastName: state.lastName,
    id: state.userID,
    token: state.userToken
  }
  return user
}

const authStatus = (state) => {
  return state.userToken && state.userID
}

export {
  getUser,
  authStatus
}
