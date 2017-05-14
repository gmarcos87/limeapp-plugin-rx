'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stopTimer = exports.getNodeStatus = undefined;

var _rxConstants = require('./rxConstants');

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9yeEFjdGlvbnMuanMiXSwibmFtZXMiOlsiZ2V0Tm9kZVN0YXR1cyIsImRpc3BhdGNoIiwidHlwZSIsInBheWxvYWQiLCJzdG9wVGltZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFLTyxJQUFNQSx3Q0FBZ0IsU0FBaEJBLGFBQWdCO0FBQUEsU0FBTSxVQUFDQyxRQUFELEVBQWM7QUFDL0NBLGFBQVM7QUFDUEMsd0NBRE87QUFFUEMsZUFBUztBQUZGLEtBQVQ7QUFJRCxHQUw0QjtBQUFBLENBQXRCOztBQU9BLElBQU1DLGdDQUFZLFNBQVpBLFNBQVk7QUFBQSxTQUFNLFVBQUNILFFBQUQsRUFBYztBQUMzQ0EsYUFBUztBQUNQQztBQURPLEtBQVQ7QUFHRCxHQUp3QjtBQUFBLENBQWxCIiwiZmlsZSI6InJ4QWN0aW9ucy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgR0VUX05PREVfU1RBVFVTLFxuICAgIFRJTUVSX1NUT1Bcbn0gZnJvbSAnLi9yeENvbnN0YW50cyc7XG5cbmV4cG9ydCBjb25zdCBnZXROb2RlU3RhdHVzID0gKCkgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIGRpc3BhdGNoKHtcbiAgICB0eXBlOiBHRVRfTk9ERV9TVEFUVVMsXG4gICAgcGF5bG9hZDoge31cbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3Qgc3RvcFRpbWVyID0gKCkgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIGRpc3BhdGNoKHtcbiAgICB0eXBlOlRJTUVSX1NUT1BcbiAgfSk7XG59OyJdfQ==