const initSession = auth => ({
  type: 'INIT_SESSION',
  payload: auth,
});

const closeSession = () => ({
  type: 'CLOSE_SESSION',
  payload: {
    authorize: false,
  },
});

const clearSession = () => ({
  type: 'DESTROY_SESSION',
});

export const loginUser = auth => dispatch => dispatch(initSession(auth));

export const logout = () => dispatch => dispatch(closeSession());

export const destroySession = () => dispatch => dispatch(clearSession());
