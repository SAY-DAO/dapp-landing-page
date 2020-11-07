export default (state = { text: 'Loading ...', status: 'enabled' }, action) => {
  switch (action.type) {
    case 'UPDATE_BUTTON_TEXT':
      return { text: action.payload.text, status: action.payload.status };
    default:
      return state;
  }
};
