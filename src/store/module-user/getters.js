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

export {
  getUser
}
