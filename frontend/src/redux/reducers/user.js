const InitialState = {}

const userReducer = (state = InitialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case "UPDATE_USER":
      return {
        ...payload
      };
    case "LOGOUT":
      return InitialState
    default:
      return state;
  }
};

export default userReducer;