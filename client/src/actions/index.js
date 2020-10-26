import randomNeed from "../apis/randomNeed";

// export const fetchNeed = (formValues) => {
//     return async dispatch => {
//         randomNeed.get('/api/v2/public/random/need')
//     }
// }

// refactored
export const fetchNeed = () =>  async dispatch => {
        const response = await randomNeed.get('/api/v2/public/random/need?_lang=en')
        dispatch({
                type: "FETCH_NEED",
                payload: response.data
        })
}

//
// export const updateServer = (data) => async dispatch => {
//         const response = randomNeed.post(`/ethereum/${data.needId}/${data.transaction}`);
//         dispatch({
//                 type: "UPDATE_SERVER",
//                 payload: response.data
//         });
// }