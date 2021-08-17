export const state = () => ({
  current_user: {}
})

export const mutations = {
  login(state, user) {
    state.current_user= user
  },
  getCurrentUser(state){
    return state.current_user
  },
  
  is_logged_in(state){
    if (state.current_user == {}){
      return True
    }
    else{
      return False
    }
  },
  logout(state){
    state.current_user = {}
  }
}