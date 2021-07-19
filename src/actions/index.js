import * as c from './ActionTypes';

export const requestHeadlines = () => ({
  type: c.REQUEST_HEADLINES
});

export const getHeadlinesSuccess = (headlines) => ({
  type: c.GET_HEADLINES_SUCCESS,
  headlines
});

export const getHeadlinesFailure = (error) => ({
  type: c.GET_HEADLINES_FAILURE,
  error
});

// write a function to handle the exception here, then call it in the .then block
// const handle429 = (response) => {
//   if (response.fault) return dispatch(getHeadlinesFailure(response.fault.faultstring))
// }

export const makeApiCall = () => {
  return dispatch => {
    dispatch(requestHeadlines);
    return fetch(`https://api.nytimes.com/svc/topstories/v2/home.json?api-key=${process.env.REACT_APP_API_KEY}`)
      // if block
      .then((response) => {
        if (response.fault) {
          return dispatch(getHeadlinesFailure(response.fault.faultstring))
      } else {
        return response.json()
        // .then(handle429(response))
        .then(
          (jsonifiedResponse) => {
            console.log(jsonifiedResponse)
            dispatch(getHeadlinesSuccess(jsonifiedResponse.results));
          })
        .catch((error) => {
          dispatch(getHeadlinesFailure(error));
        });
      }})
  }
}

// {fault: {…}}
// fault:
//  detail:
//    errorcode: "policies.ratelimit.QuotaViolation"
// __proto__: Object
//  faultstring: "Rate limit quota violation. Quota limit  exceeded. Identifier : 20bd1f0d-1c0f-495d-820c-28258ca8c175"
// __proto__: Object
// __proto__: Object