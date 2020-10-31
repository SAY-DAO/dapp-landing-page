export default (state = {}, action) => {
  switch (action.type) {
    case 'FETCH_NEED':
      return action.payload;
    // case "UPDATE_SERVER":
    //     return { state: action.payload.id };
    default:
      return state;
  }
};
