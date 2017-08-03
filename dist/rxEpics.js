'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.nodeStatus = undefined;

var _rxConstants = require('./rxConstants');

var _rxApi = require('./rxApi');

var _Observable = require('rxjs/Observable');

require('rxjs/add/observable/interval');

require('rxjs/add/operator/catch');

require('rxjs/add/operator/takeUntil');

require('rxjs/add/operator/map');

require('rxjs/add/operator/mergeMap');

var nodeStatus = exports.nodeStatus = function nodeStatus(action$, store, _ref) {
  var wsAPI = _ref.wsAPI;
  return action$.ofType(_rxConstants.GET_NODE_STATUS).mergeMap(function () {
    return (0, _rxApi.getNodeStauts)(wsAPI, store.getState().meta.sid);
  }).map(function (payload) {
    return { type: _rxConstants.GET_NODE_STATUS_SUCCESS, payload: payload };
  }).catch([{ type: _rxConstants.GET_NODE_STATUS_ERROR }]);
};

var runTimer = function runTimer(action$, store) {
  return action$.ofType.apply(action$, [_rxConstants.GET_NODE_STATUS_SUCCESS, _rxConstants.TIMER_START]).mergeMap(function () {
    return _Observable.Observable.interval(store.getState().rx.interval).takeUntil(action$.ofType(_rxConstants.TIMER_STOP)).map(function () {
      return { type: _rxConstants.INTERVAL_GET };
    });
  });
};

var getSignal = function getSignal(action$, _ref2, _ref3) {
  var getState = _ref2.getState;
  var wsAPI = _ref3.wsAPI;
  return action$.ofType.apply(action$, [_rxConstants.GET_SIGNAL, _rxConstants.INTERVAL_GET]).switchMap(function () {
    return (0, _rxApi.getStationSignal)(wsAPI, getState().meta.sid, getState().rx.data.most_active);
  }).map(function (signal) {
    return { type: _rxConstants.GET_SIGNAL_SUCCESS, payload: signal };
  });
};

var getTraffic = function getTraffic(action$, _ref4, _ref5) {
  var getState = _ref4.getState;
  var wsAPI = _ref5.wsAPI;
  return action$.ofType.apply(action$, [_rxConstants.GET_TRAFFIC, _rxConstants.INTERVAL_GET]).switchMap(function () {
    return (0, _rxApi.getStationTraffic)(wsAPI, getState().meta.sid, getState().rx.data.most_active);
  }).map(function (signal) {
    return { type: _rxConstants.GET_TRAFFIC_SUCCESS, payload: signal };
  });
};

var getInternet = function getInternet(action$, _ref6, _ref7) {
  var getState = _ref6.getState;
  var wsAPI = _ref7.wsAPI;
  return action$.ofType.apply(action$, [_rxConstants.GET_NODE_STATUS_SUCCESS]).switchMap(function () {
    return (0, _rxApi.getInternetStatus)(wsAPI, getState().meta.sid);
  }).map(function (status) {
    return { type: _rxConstants.GET_INTERNET_STATUS_SUCCESS, payload: status };
  });
};

exports.default = {
  nodeStatus: nodeStatus, runTimer: runTimer, getSignal: getSignal, getTraffic: getTraffic, getInternet: getInternet
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9yeEVwaWNzLmpzIl0sIm5hbWVzIjpbIm5vZGVTdGF0dXMiLCJhY3Rpb24kIiwic3RvcmUiLCJ3c0FQSSIsIm9mVHlwZSIsIm1lcmdlTWFwIiwiZ2V0U3RhdGUiLCJtZXRhIiwic2lkIiwibWFwIiwidHlwZSIsInBheWxvYWQiLCJjYXRjaCIsInJ1blRpbWVyIiwiaW50ZXJ2YWwiLCJyeCIsInRha2VVbnRpbCIsImdldFNpZ25hbCIsInN3aXRjaE1hcCIsImRhdGEiLCJtb3N0X2FjdGl2ZSIsInNpZ25hbCIsImdldFRyYWZmaWMiLCJnZXRJbnRlcm5ldCIsInN0YXR1cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQWVBOztBQU9BOztBQUVBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUVPLElBQU1BLGtDQUFhLFNBQWJBLFVBQWEsQ0FBRUMsT0FBRixFQUFXQyxLQUFYO0FBQUEsTUFBb0JDLEtBQXBCLFFBQW9CQSxLQUFwQjtBQUFBLFNBQ3hCRixRQUFRRyxNQUFSLCtCQUNHQyxRQURILENBQ1k7QUFBQSxXQUFNLDBCQUFjRixLQUFkLEVBQXFCRCxNQUFNSSxRQUFOLEdBQWlCQyxJQUFqQixDQUFzQkMsR0FBM0MsQ0FBTjtBQUFBLEdBRFosRUFFR0MsR0FGSCxDQUVRO0FBQUEsV0FBWSxFQUFFQywwQ0FBRixFQUFpQ0MsZ0JBQWpDLEVBQVo7QUFBQSxHQUZSLEVBR0dDLEtBSEgsQ0FHVSxDQUFDLEVBQUNGLHdDQUFELEVBQUQsQ0FIVixDQUR3QjtBQUFBLENBQW5COztBQU9QLElBQU1HLFdBQVcsU0FBWEEsUUFBVyxDQUFFWixPQUFGLEVBQVdDLEtBQVg7QUFBQSxTQUNmRCxRQUFRRyxNQUFSLGdCQUFrQixnRUFBbEIsRUFDR0MsUUFESCxDQUNZLFlBQU07QUFDZCxXQUFPLHVCQUFXUyxRQUFYLENBQW9CWixNQUFNSSxRQUFOLEdBQWlCUyxFQUFqQixDQUFvQkQsUUFBeEMsRUFDSkUsU0FESSxDQUNNZixRQUFRRyxNQUFSLHlCQUROLEVBRUpLLEdBRkksQ0FFQTtBQUFBLGFBQU8sRUFBRUMsK0JBQUYsRUFBUDtBQUFBLEtBRkEsQ0FBUDtBQUdELEdBTEgsQ0FEZTtBQUFBLENBQWpCOztBQVFBLElBQU1PLFlBQVksU0FBWkEsU0FBWSxDQUFFaEIsT0FBRjtBQUFBLE1BQWFLLFFBQWIsU0FBYUEsUUFBYjtBQUFBLE1BQTBCSCxLQUExQixTQUEwQkEsS0FBMUI7QUFBQSxTQUNoQkYsUUFBUUcsTUFBUixnQkFBa0Isb0RBQWxCLEVBQ0djLFNBREgsQ0FDYTtBQUFBLFdBQU0sNkJBQWlCZixLQUFqQixFQUF3QkcsV0FBV0MsSUFBWCxDQUFnQkMsR0FBeEMsRUFBNkNGLFdBQVdTLEVBQVgsQ0FBY0ksSUFBZCxDQUFtQkMsV0FBaEUsQ0FBTjtBQUFBLEdBRGIsRUFFS1gsR0FGTCxDQUVVO0FBQUEsV0FBVyxFQUFFQyxxQ0FBRixFQUE0QkMsU0FBU1UsTUFBckMsRUFBWDtBQUFBLEdBRlYsQ0FEZ0I7QUFBQSxDQUFsQjs7QUFLQSxJQUFNQyxhQUFhLFNBQWJBLFVBQWEsQ0FBRXJCLE9BQUY7QUFBQSxNQUFhSyxRQUFiLFNBQWFBLFFBQWI7QUFBQSxNQUEwQkgsS0FBMUIsU0FBMEJBLEtBQTFCO0FBQUEsU0FDakJGLFFBQVFHLE1BQVIsZ0JBQWtCLHFEQUFsQixFQUNHYyxTQURILENBQ2E7QUFBQSxXQUFNLDhCQUFrQmYsS0FBbEIsRUFBeUJHLFdBQVdDLElBQVgsQ0FBZ0JDLEdBQXpDLEVBQThDRixXQUFXUyxFQUFYLENBQWNJLElBQWQsQ0FBbUJDLFdBQWpFLENBQU47QUFBQSxHQURiLEVBRUtYLEdBRkwsQ0FFVTtBQUFBLFdBQVcsRUFBRUMsc0NBQUYsRUFBNkJDLFNBQVNVLE1BQXRDLEVBQVg7QUFBQSxHQUZWLENBRGlCO0FBQUEsQ0FBbkI7O0FBS0EsSUFBTUUsY0FBYyxTQUFkQSxXQUFjLENBQUV0QixPQUFGO0FBQUEsTUFBYUssUUFBYixTQUFhQSxRQUFiO0FBQUEsTUFBMEJILEtBQTFCLFNBQTBCQSxLQUExQjtBQUFBLFNBQ2xCRixRQUFRRyxNQUFSLGdCQUFrQixzQ0FBbEIsRUFDR2MsU0FESCxDQUNhO0FBQUEsV0FBTSw4QkFBa0JmLEtBQWxCLEVBQXlCRyxXQUFXQyxJQUFYLENBQWdCQyxHQUF6QyxDQUFOO0FBQUEsR0FEYixFQUVLQyxHQUZMLENBRVU7QUFBQSxXQUFXLEVBQUVDLDhDQUFGLEVBQXFDQyxTQUFTYSxNQUE5QyxFQUFYO0FBQUEsR0FGVixDQURrQjtBQUFBLENBQXBCOztrQkFNZTtBQUNieEIsd0JBRGEsRUFDRGEsa0JBREMsRUFDU0ksb0JBRFQsRUFDb0JLLHNCQURwQixFQUNnQ0M7QUFEaEMsQyIsImZpbGUiOiJyeEVwaWNzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgR0VUX05PREVfU1RBVFVTLFxuICBHRVRfTk9ERV9TVEFUVVNfRVJST1IsXG4gIEdFVF9OT0RFX1NUQVRVU19TVUNDRVNTLFxuICBUSU1FUl9TVEFSVCxcbiAgVElNRVJfU1RPUCxcbiAgSU5URVJWQUxfR0VULFxuICBHRVRfU0lHTkFMLFxuICBHRVRfU0lHTkFMX1NVQ0NFU1MsXG4gIEdFVF9UUkFGRklDLFxuICBHRVRfVFJBRkZJQ19TVUNDRVNTLFxuICBHRVRfSU5URVJORVRfU1RBVFVTX1NVQ0NFU1NcblxufSBmcm9tICcuL3J4Q29uc3RhbnRzJztcblxuaW1wb3J0IHtcbiAgZ2V0Tm9kZVN0YXV0cyxcbiAgZ2V0U3RhdGlvblNpZ25hbCxcbiAgZ2V0U3RhdGlvblRyYWZmaWMsXG4gIGdldEludGVybmV0U3RhdHVzXG59IGZyb20gJy4vcnhBcGknO1xuXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcblxuaW1wb3J0ICdyeGpzL2FkZC9vYnNlcnZhYmxlL2ludGVydmFsJztcbmltcG9ydCAncnhqcy9hZGQvb3BlcmF0b3IvY2F0Y2gnO1xuaW1wb3J0ICdyeGpzL2FkZC9vcGVyYXRvci90YWtlVW50aWwnO1xuaW1wb3J0ICdyeGpzL2FkZC9vcGVyYXRvci9tYXAnO1xuaW1wb3J0ICdyeGpzL2FkZC9vcGVyYXRvci9tZXJnZU1hcCc7XG5cbmV4cG9ydCBjb25zdCBub2RlU3RhdHVzID0gKCBhY3Rpb24kLCBzdG9yZSwgeyB3c0FQSSB9ICkgPT5cbiAgYWN0aW9uJC5vZlR5cGUoR0VUX05PREVfU1RBVFVTKVxuICAgIC5tZXJnZU1hcCgoKSA9PiBnZXROb2RlU3RhdXRzKHdzQVBJLCBzdG9yZS5nZXRTdGF0ZSgpLm1ldGEuc2lkKSlcbiAgICAubWFwKCBwYXlsb2FkID0+ICh7IHR5cGU6IEdFVF9OT0RFX1NUQVRVU19TVUNDRVNTLCBwYXlsb2FkIH0pKVxuICAgIC5jYXRjaCgoW3t0eXBlOkdFVF9OT0RFX1NUQVRVU19FUlJPUn1dKSk7XG5cbiAgXG5jb25zdCBydW5UaW1lciA9ICggYWN0aW9uJCwgc3RvcmUgKSA9PlxuICBhY3Rpb24kLm9mVHlwZSguLi5bR0VUX05PREVfU1RBVFVTX1NVQ0NFU1MsIFRJTUVSX1NUQVJUXSlcbiAgICAubWVyZ2VNYXAoKCkgPT4ge1xuICAgICAgcmV0dXJuIE9ic2VydmFibGUuaW50ZXJ2YWwoc3RvcmUuZ2V0U3RhdGUoKS5yeC5pbnRlcnZhbClcbiAgICAgICAgLnRha2VVbnRpbChhY3Rpb24kLm9mVHlwZShUSU1FUl9TVE9QKSlcbiAgICAgICAgLm1hcCgoKSA9PiAoeyB0eXBlOiBJTlRFUlZBTF9HRVQgfSkpO1xuICAgIH0pO1xuXG5jb25zdCBnZXRTaWduYWwgPSAoIGFjdGlvbiQsIHsgZ2V0U3RhdGV9LCB7IHdzQVBJIH0gKSA9PlxuICBhY3Rpb24kLm9mVHlwZSguLi5bR0VUX1NJR05BTCxJTlRFUlZBTF9HRVRdKVxuICAgIC5zd2l0Y2hNYXAoKCkgPT4gZ2V0U3RhdGlvblNpZ25hbCh3c0FQSSwgZ2V0U3RhdGUoKS5tZXRhLnNpZCwgZ2V0U3RhdGUoKS5yeC5kYXRhLm1vc3RfYWN0aXZlKSlcbiAgICAgIC5tYXAoIHNpZ25hbCA9PiAoeyB0eXBlOiBHRVRfU0lHTkFMX1NVQ0NFU1MsIHBheWxvYWQ6IHNpZ25hbCB9KSk7XG5cbmNvbnN0IGdldFRyYWZmaWMgPSAoIGFjdGlvbiQsIHsgZ2V0U3RhdGV9LCB7IHdzQVBJIH0gKSA9PlxuICBhY3Rpb24kLm9mVHlwZSguLi5bR0VUX1RSQUZGSUMsSU5URVJWQUxfR0VUXSlcbiAgICAuc3dpdGNoTWFwKCgpID0+IGdldFN0YXRpb25UcmFmZmljKHdzQVBJLCBnZXRTdGF0ZSgpLm1ldGEuc2lkLCBnZXRTdGF0ZSgpLnJ4LmRhdGEubW9zdF9hY3RpdmUpKVxuICAgICAgLm1hcCggc2lnbmFsID0+ICh7IHR5cGU6IEdFVF9UUkFGRklDX1NVQ0NFU1MsIHBheWxvYWQ6IHNpZ25hbCB9KSk7XG5cbmNvbnN0IGdldEludGVybmV0ID0gKCBhY3Rpb24kLCB7IGdldFN0YXRlfSwgeyB3c0FQSSB9ICkgPT5cbiAgYWN0aW9uJC5vZlR5cGUoLi4uW0dFVF9OT0RFX1NUQVRVU19TVUNDRVNTXSlcbiAgICAuc3dpdGNoTWFwKCgpID0+IGdldEludGVybmV0U3RhdHVzKHdzQVBJLCBnZXRTdGF0ZSgpLm1ldGEuc2lkKSlcbiAgICAgIC5tYXAoIHN0YXR1cyA9PiAoeyB0eXBlOiBHRVRfSU5URVJORVRfU1RBVFVTX1NVQ0NFU1MsIHBheWxvYWQ6IHN0YXR1cyB9KSk7XG5cblxuZXhwb3J0IGRlZmF1bHQge1xuICBub2RlU3RhdHVzLCBydW5UaW1lciwgZ2V0U2lnbmFsLCBnZXRUcmFmZmljLCBnZXRJbnRlcm5ldFxufTsiXX0=