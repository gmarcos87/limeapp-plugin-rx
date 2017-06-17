'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.changeNode = exports.stopTimer = exports.getNodeStatus = undefined;

var _rxConstants = require('./rxConstants');

var _preactRouterRedux = require('preact-router-redux');

var getNodeStatus = exports.getNodeStatus = function getNodeStatus() {
  return function (dispatch) {
    dispatch({
      type: _rxConstants.GET_NODE_STATUS,
      payload: {}
    });
  };
};

var stopTimer = exports.stopTimer = function stopTimer() {
  return function (dispatch) {
    dispatch({
      type: _rxConstants.TIMER_STOP
    });
  };
};

var changeNode = exports.changeNode = function changeNode(hostname) {
  return function (dispatch) {
    dispatch((0, _preactRouterRedux.push)('changeNode/' + hostname));
  };
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9yeEFjdGlvbnMuanMiXSwibmFtZXMiOlsiZ2V0Tm9kZVN0YXR1cyIsImRpc3BhdGNoIiwidHlwZSIsInBheWxvYWQiLCJzdG9wVGltZXIiLCJjaGFuZ2VOb2RlIiwiaG9zdG5hbWUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFLQTs7QUFFTyxJQUFNQSx3Q0FBZ0IsU0FBaEJBLGFBQWdCO0FBQUEsU0FBTSxVQUFDQyxRQUFELEVBQWM7QUFDL0NBLGFBQVM7QUFDUEMsd0NBRE87QUFFUEMsZUFBUztBQUZGLEtBQVQ7QUFJRCxHQUw0QjtBQUFBLENBQXRCOztBQU9BLElBQU1DLGdDQUFZLFNBQVpBLFNBQVk7QUFBQSxTQUFNLFVBQUNILFFBQUQsRUFBYztBQUMzQ0EsYUFBUztBQUNQQztBQURPLEtBQVQ7QUFHRCxHQUp3QjtBQUFBLENBQWxCOztBQU1BLElBQU1HLGtDQUFhLFNBQWJBLFVBQWEsQ0FBQ0MsUUFBRDtBQUFBLFNBQWMsVUFBQ0wsUUFBRCxFQUFjO0FBQ3BEQSxhQUFTLDZCQUFLLGdCQUFjSyxRQUFuQixDQUFUO0FBQ0QsR0FGeUI7QUFBQSxDQUFuQiIsImZpbGUiOiJyeEFjdGlvbnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIEdFVF9OT0RFX1NUQVRVUyxcbiAgICBUSU1FUl9TVE9QXG59IGZyb20gJy4vcnhDb25zdGFudHMnO1xuXG5pbXBvcnQgeyBwdXNoIH0gZnJvbSAncHJlYWN0LXJvdXRlci1yZWR1eCc7XG5cbmV4cG9ydCBjb25zdCBnZXROb2RlU3RhdHVzID0gKCkgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIGRpc3BhdGNoKHtcbiAgICB0eXBlOiBHRVRfTk9ERV9TVEFUVVMsXG4gICAgcGF5bG9hZDoge31cbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3Qgc3RvcFRpbWVyID0gKCkgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIGRpc3BhdGNoKHtcbiAgICB0eXBlOlRJTUVSX1NUT1BcbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3QgY2hhbmdlTm9kZSA9IChob3N0bmFtZSkgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIGRpc3BhdGNoKHB1c2goJ2NoYW5nZU5vZGUvJytob3N0bmFtZSkpO1xufTsiXX0=