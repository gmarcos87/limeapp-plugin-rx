'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reducer = exports.initialState = undefined;

var _rxConstants = require('./rxConstants');

var initialState = exports.initialState = {
  loading: false,
  interval: 800,
  data: {
    internet: {
      IPv4: { working: null },
      IPv6: { working: null },
      DNS: { working: null }
    }
  }
};

var reducer = exports.reducer = function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var _ref = arguments[1];
  var type = _ref.type,
      payload = _ref.payload;

  switch (type) {
    case _rxConstants.GET_NODE_STATUS:
      return Object.assign(initialState, { loading: true, data: {
          internet: {
            IPv4: { working: null },
            IPv6: { working: null },
            DNS: { working: null }
          }
        } });
    case _rxConstants.GET_NODE_STATUS_SUCCESS:
      return Object.assign({}, state, { loading: false, data: Object.assign({}, state.data, payload) });
    case _rxConstants.GET_NODE_STATUS_ERROR:
      return Object.assign({}, state, { loading: false, data: Object.assign({}, state.data, payload) });
    case _rxConstants.GET_SIGNAL_SUCCESS:
      return Object.assign({}, state, {
        data: Object.assign({}, state.data, {
          most_active: Object.assign({}, state.data.most_active, {
            signal: payload.signal
          })
        })
      });
    case _rxConstants.GET_TRAFFIC_SUCCESS:
      return Object.assign({}, state, {
        data: Object.assign({}, state.data, {
          most_active: Object.assign({}, state.data.most_active, {
            tx_bytes: payload.tx_bytes,
            rx_bytes: payload.rx_bytes
          })
        })
      });
    case _rxConstants.GET_INTERNET_STATUS_SUCCESS:
      return Object.assign({}, state, { data: Object.assign({}, state.data, { internet: payload }) });
    default:
      return state;
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9yeFJlZHVjZXIuanMiXSwibmFtZXMiOlsiaW5pdGlhbFN0YXRlIiwibG9hZGluZyIsImludGVydmFsIiwiZGF0YSIsImludGVybmV0IiwiSVB2NCIsIndvcmtpbmciLCJJUHY2IiwiRE5TIiwicmVkdWNlciIsInN0YXRlIiwidHlwZSIsInBheWxvYWQiLCJPYmplY3QiLCJhc3NpZ24iLCJtb3N0X2FjdGl2ZSIsInNpZ25hbCIsInR4X2J5dGVzIiwicnhfYnl0ZXMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFTTyxJQUFNQSxzQ0FBZTtBQUMxQkMsV0FBUyxLQURpQjtBQUUxQkMsWUFBVSxHQUZnQjtBQUcxQkMsUUFBTTtBQUNKQyxjQUFVO0FBQ1JDLFlBQU0sRUFBRUMsU0FBVSxJQUFaLEVBREU7QUFFUkMsWUFBTSxFQUFFRCxTQUFVLElBQVosRUFGRTtBQUdSRSxXQUFNLEVBQUVGLFNBQVUsSUFBWjtBQUhFO0FBRE47QUFIb0IsQ0FBckI7O0FBWUEsSUFBTUcsNEJBQVUsU0FBVkEsT0FBVSxHQUE2QztBQUFBLE1BQTVDQyxLQUE0Qyx1RUFBcENWLFlBQW9DO0FBQUE7QUFBQSxNQUFwQlcsSUFBb0IsUUFBcEJBLElBQW9CO0FBQUEsTUFBZEMsT0FBYyxRQUFkQSxPQUFjOztBQUNsRSxVQUFRRCxJQUFSO0FBQ0U7QUFDRSxhQUFPRSxPQUFPQyxNQUFQLENBQWVkLFlBQWYsRUFBNkIsRUFBQ0MsU0FBUyxJQUFWLEVBQWdCRSxNQUFNO0FBQ3hEQyxvQkFBVTtBQUNSQyxrQkFBTSxFQUFFQyxTQUFVLElBQVosRUFERTtBQUVSQyxrQkFBTSxFQUFFRCxTQUFVLElBQVosRUFGRTtBQUdSRSxpQkFBTSxFQUFFRixTQUFVLElBQVo7QUFIRTtBQUQ4QyxTQUF0QixFQUE3QixDQUFQO0FBT0Y7QUFDRSxhQUFPTyxPQUFPQyxNQUFQLENBQWMsRUFBZCxFQUFrQkosS0FBbEIsRUFBeUIsRUFBQ1QsU0FBUyxLQUFWLEVBQWlCRSxNQUFNVSxPQUFPQyxNQUFQLENBQWMsRUFBZCxFQUFrQkosTUFBTVAsSUFBeEIsRUFBOEJTLE9BQTlCLENBQXZCLEVBQXpCLENBQVA7QUFDRjtBQUNFLGFBQU9DLE9BQU9DLE1BQVAsQ0FBYyxFQUFkLEVBQWtCSixLQUFsQixFQUF5QixFQUFDVCxTQUFTLEtBQVYsRUFBaUJFLE1BQU1VLE9BQU9DLE1BQVAsQ0FBYyxFQUFkLEVBQWtCSixNQUFNUCxJQUF4QixFQUE4QlMsT0FBOUIsQ0FBdkIsRUFBekIsQ0FBUDtBQUNGO0FBQ0UsYUFBT0MsT0FBT0MsTUFBUCxDQUFjLEVBQWQsRUFBa0JKLEtBQWxCLEVBQXlCO0FBQzlCUCxjQUFNVSxPQUFPQyxNQUFQLENBQWMsRUFBZCxFQUFpQkosTUFBTVAsSUFBdkIsRUFBNkI7QUFDakNZLHVCQUFhRixPQUFPQyxNQUFQLENBQWMsRUFBZCxFQUFpQkosTUFBTVAsSUFBTixDQUFXWSxXQUE1QixFQUF5QztBQUNwREMsb0JBQVFKLFFBQVFJO0FBRG9DLFdBQXpDO0FBRG9CLFNBQTdCO0FBRHdCLE9BQXpCLENBQVA7QUFPRjtBQUNFLGFBQU9ILE9BQU9DLE1BQVAsQ0FBYyxFQUFkLEVBQWtCSixLQUFsQixFQUF5QjtBQUM5QlAsY0FBTVUsT0FBT0MsTUFBUCxDQUFjLEVBQWQsRUFBaUJKLE1BQU1QLElBQXZCLEVBQTZCO0FBQ2pDWSx1QkFBYUYsT0FBT0MsTUFBUCxDQUFjLEVBQWQsRUFBaUJKLE1BQU1QLElBQU4sQ0FBV1ksV0FBNUIsRUFBeUM7QUFDcERFLHNCQUFVTCxRQUFRSyxRQURrQztBQUVwREMsc0JBQVVOLFFBQVFNO0FBRmtDLFdBQXpDO0FBRG9CLFNBQTdCO0FBRHdCLE9BQXpCLENBQVA7QUFRRjtBQUNFLGFBQU9MLE9BQU9DLE1BQVAsQ0FBYyxFQUFkLEVBQWtCSixLQUFsQixFQUF5QixFQUFDUCxNQUFNVSxPQUFPQyxNQUFQLENBQWMsRUFBZCxFQUFrQkosTUFBTVAsSUFBeEIsRUFBOEIsRUFBRUMsVUFBVVEsT0FBWixFQUE5QixDQUFQLEVBQXpCLENBQVA7QUFDRjtBQUNFLGFBQU9GLEtBQVA7QUFqQ0o7QUFtQ0QsQ0FwQ00iLCJmaWxlIjoicnhSZWR1Y2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgR0VUX05PREVfU1RBVFVTLFxuICBHRVRfTk9ERV9TVEFUVVNfU1VDQ0VTUyxcbiAgR0VUX05PREVfU1RBVFVTX0VSUk9SLFxuICBHRVRfVFJBRkZJQ19TVUNDRVNTLFxuICBHRVRfU0lHTkFMX1NVQ0NFU1MsXG4gIEdFVF9JTlRFUk5FVF9TVEFUVVNfU1VDQ0VTU1xufSBmcm9tICcuL3J4Q29uc3RhbnRzJztcblxuZXhwb3J0IGNvbnN0IGluaXRpYWxTdGF0ZSA9IHtcbiAgbG9hZGluZzogZmFsc2UsXG4gIGludGVydmFsOiA4MDAsXG4gIGRhdGE6IHtcbiAgICBpbnRlcm5ldDoge1xuICAgICAgSVB2NDogeyB3b3JraW5nIDogbnVsbCB9LFxuICAgICAgSVB2NjogeyB3b3JraW5nIDogbnVsbCB9LFxuICAgICAgRE5TOiAgeyB3b3JraW5nIDogbnVsbCB9XG4gICAgfVxuICB9XG59O1xuXG5leHBvcnQgY29uc3QgcmVkdWNlciA9IChzdGF0ZSA9IGluaXRpYWxTdGF0ZSwgeyB0eXBlLCBwYXlsb2FkIH0pID0+IHtcbiAgc3dpdGNoICh0eXBlKSB7XG4gICAgY2FzZSBHRVRfTk9ERV9TVEFUVVM6XG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbiggaW5pdGlhbFN0YXRlLCB7bG9hZGluZzogdHJ1ZSwgZGF0YToge1xuICAgICAgICBpbnRlcm5ldDoge1xuICAgICAgICAgIElQdjQ6IHsgd29ya2luZyA6IG51bGwgfSxcbiAgICAgICAgICBJUHY2OiB7IHdvcmtpbmcgOiBudWxsIH0sXG4gICAgICAgICAgRE5TOiAgeyB3b3JraW5nIDogbnVsbCB9XG4gICAgICAgIH1cbiAgICAgIH19KTtcbiAgICBjYXNlIEdFVF9OT0RFX1NUQVRVU19TVUNDRVNTOlxuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7bG9hZGluZzogZmFsc2UsIGRhdGE6IE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLmRhdGEsIHBheWxvYWQpfSk7XG4gICAgY2FzZSBHRVRfTk9ERV9TVEFUVVNfRVJST1I6XG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtsb2FkaW5nOiBmYWxzZSwgZGF0YTogT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUuZGF0YSwgcGF5bG9hZCl9KTtcbiAgICBjYXNlIEdFVF9TSUdOQUxfU1VDQ0VTUzpcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xuICAgICAgICBkYXRhOiBPYmplY3QuYXNzaWduKHt9LHN0YXRlLmRhdGEsIHtcbiAgICAgICAgICBtb3N0X2FjdGl2ZTogT2JqZWN0LmFzc2lnbih7fSxzdGF0ZS5kYXRhLm1vc3RfYWN0aXZlLCB7XG4gICAgICAgICAgICBzaWduYWw6IHBheWxvYWQuc2lnbmFsXG4gICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICAgIH0pO1xuICAgIGNhc2UgR0VUX1RSQUZGSUNfU1VDQ0VTUzpcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xuICAgICAgICBkYXRhOiBPYmplY3QuYXNzaWduKHt9LHN0YXRlLmRhdGEsIHtcbiAgICAgICAgICBtb3N0X2FjdGl2ZTogT2JqZWN0LmFzc2lnbih7fSxzdGF0ZS5kYXRhLm1vc3RfYWN0aXZlLCB7XG4gICAgICAgICAgICB0eF9ieXRlczogcGF5bG9hZC50eF9ieXRlcyxcbiAgICAgICAgICAgIHJ4X2J5dGVzOiBwYXlsb2FkLnJ4X2J5dGVzXG4gICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICAgIH0pO1xuICAgIGNhc2UgR0VUX0lOVEVSTkVUX1NUQVRVU19TVUNDRVNTOlxuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7ZGF0YTogT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUuZGF0YSwgeyBpbnRlcm5ldDogcGF5bG9hZCB9KX0pO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gc3RhdGU7XG4gIH1cbn07XG4iXX0=