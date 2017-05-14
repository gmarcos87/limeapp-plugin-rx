import {
    GET_NODE_STATUS,
    TIMER_STOP
} from './rxConstants';

export const getNodeStatus = () => (dispatch) => {
  dispatch({
    type: GET_NODE_STATUS,
    payload: {}
  });
};

export const stopTimer = () => (dispatch) => {
  dispatch({
    type:TIMER_STOP
  });
};