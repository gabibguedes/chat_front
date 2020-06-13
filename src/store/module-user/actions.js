const login = ({ commit }, user) => {
  commit('login', user)
}
const logout = ({ commit }, user) => {
  commit('logout', user)
}

export {
  login,
  logout
}
