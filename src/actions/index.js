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

export const makeApiCall = () => {
  return dispatch => {
    dispatch(requestHeadlines);
    return fetch(`https://api.nytimes.com/svc/topstories/v2/home.json?api-key=${process.env.REACT_APP_API_KEY}`)
      .then(function(response) {
        return response.json()
      })
      .then(function(jsonifiedResponse) {
        if (jsonifiedResponse.fault) {
          console.log("Response.fault has evaluated to true");
          throw Error(jsonifiedResponse.fault.faultstring);
        } else {
          console.log(jsonifiedResponse)
          dispatch(getHeadlinesSuccess(jsonifiedResponse.results));
        }
        })
      .catch((error) => {
        dispatch(getHeadlinesFailure(error));
      });
  }
}
