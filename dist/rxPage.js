'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapDispatchToProps = exports.mapStateToProps = exports.Page = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _preact = require('preact');

var _redux = require('redux');

var _preactRedux = require('preact-redux');

var _rxActions = require('./rxActions');

var _rxSelectors = require('./rxSelectors');

var _box = require('./components/box.js');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*global I18n */


var toHHMMSS = function toHHMMSS(secs, plus) {
  var sec_num = parseInt(secs, 10) + plus;
  var days = Math.floor(sec_num / 86400) % 24;
  var hours = Math.floor(sec_num / 3600) % 24;
  var minutes = Math.floor(sec_num / 60) % 60;
  var seconds = sec_num % 60;
  return [days, hours, minutes, seconds].map(function (v) {
    return v < 10 ? "0" + v : v;
  }).join(":");
};

var SystemBox = function (_Component) {
  _inherits(SystemBox, _Component);

  function SystemBox() {
    _classCallCheck(this, SystemBox);

    return _possibleConstructorReturn(this, (SystemBox.__proto__ || Object.getPrototypeOf(SystemBox)).apply(this, arguments));
  }

  _createClass(SystemBox, [{
    key: 'render',
    value: function render() {
      if (typeof this.props.node.uptime !== 'undefined') {
        this.props.update();
        return (0, _preact.h)(
          _box.Box,
          { title: I18n.t('System') },
          (0, _preact.h)(
            'span',
            null,
            (0, _preact.h)(
              'b',
              null,
              I18n.t('Uptime'),
              ' '
            ),
            toHHMMSS(this.props.node.uptime, this.props.count),
            (0, _preact.h)('br', null)
          )
        );
      }
      return (0, _preact.h)('span', null);
    }
  }]);

  return SystemBox;
}(_preact.Component);

var Page = exports.Page = function (_Component2) {
  _inherits(Page, _Component2);

  function Page() {
    _classCallCheck(this, Page);

    return _possibleConstructorReturn(this, (Page.__proto__ || Object.getPrototypeOf(Page)).apply(this, arguments));
  }

  _createClass(Page, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.props.getNodeStatus();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.props.stopTimer();
      this.stopCount();
    }
  }, {
    key: 'loading',
    value: function loading(option, nodeData) {
      if (!option) {
        return this.nodeStatus(nodeData);
      }
      return (0, _preact.h)(
        'h4',
        { style: { textAlign: 'center' } },
        I18n.t('Loading node status...')
      );
    }
  }, {
    key: 'startCount',
    value: function startCount() {
      var _this3 = this;

      if (typeof this.count === 'undefined') {
        this.setState({ plusTime: 0 });
        this.count = setInterval(function () {
          var newTime = _this3.state.plusTime + 1;
          _this3.setState({ plusTime: newTime });
        }, 1000);
      }
    }
  }, {
    key: 'stopCount',
    value: function stopCount() {
      clearInterval(this.count);
      this.setState({ plusTime: 0 });
      delete this.count;
    }
  }, {
    key: 'nodeStatus',
    value: function nodeStatus(node) {
      var _this4 = this;

      if (node.hostname) {
        this.startCount();
        return (0, _preact.h)(
          'div',
          null,
          (0, _preact.h)(
            _box.Box,
            { title: I18n.t('Most Active') },
            (0, _preact.h)(
              'span',
              { style: { float: 'right', fontSize: '2.7em' } },
              node.most_active.signal
            ),
            (0, _preact.h)(
              'span',
              { style: { fontSize: '1.4em' }, onClick: function onClick() {
                  return _this4.props.changeNode(node.most_active.hostname.split('_')[0]);
                } },
              (0, _preact.h)(
                'b',
                null,
                node.most_active.hostname.split('_')[0]
              )
            ),
            (0, _preact.h)('br', null),
            (0, _preact.h)(
              'b',
              null,
              I18n.t('Interface'),
              ' '
            ),
            node.most_active.iface.split('-')[0],
            (0, _preact.h)('br', null),
            (0, _preact.h)(
              'b',
              null,
              I18n.t('Traffic'),
              ' '
            ),
            ' ',
            Math.round((node.most_active.rx_bytes + node.most_active.tx_bytes) / 1024 / 1024),
            'MB',
            (0, _preact.h)('div', { style: { clear: 'both' } })
          ),
          (0, _preact.h)(SystemBox, { node: node, count: this.state.plusTime, update: this.startCount.bind(this) }),
          (0, _preact.h)(
            _box.Box,
            { title: I18n.t('Internet connection') },
            (0, _preact.h)(
              'span',
              null,
              (0, _preact.h)(
                'b',
                null,
                ' ',
                node.internet.IPv4.working === 1 ? (0, _preact.h)(
                  'span',
                  { style: { color: 'green' } },
                  '\u2714'
                ) : (0, _preact.h)(
                  'span',
                  { style: { color: 'red' } },
                  '\u2718'
                ),
                ' IPv4 '
              ),
              (0, _preact.h)(
                'b',
                null,
                ' ',
                node.internet.IPv6.working === 1 ? (0, _preact.h)(
                  'span',
                  { style: { color: 'green' } },
                  '\u2714'
                ) : (0, _preact.h)(
                  'span',
                  { style: { color: 'red' } },
                  '\u2718'
                ),
                ' IPv6 '
              ),
              (0, _preact.h)(
                'b',
                null,
                ' ',
                node.internet.DNS.working === 1 ? (0, _preact.h)(
                  'span',
                  { style: { color: 'green' } },
                  '\u2714'
                ) : (0, _preact.h)(
                  'span',
                  { style: { color: 'red' } },
                  '\u2718'
                ),
                ' DNS '
              )
            )
          ),
          (0, _preact.h)(
            _box.Box,
            { title: I18n.t('IP Addresses') },
            node.ips.map(function (ip, key) {
              return (0, _preact.h)(
                'span',
                { style: key === 0 ? { fontSize: '1.4em' } : {} },
                (0, _preact.h)(
                  'b',
                  null,
                  'IPv',
                  ip.version,
                  ' '
                ),
                ' ',
                ip.address,
                (0, _preact.h)('br', null)
              );
            })
          )
        );
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return (0, _preact.h)(
        'div',
        { 'class': 'container', style: { paddingTop: '80px' } },
        this.loading(this.props.isLoading, this.props.nodeData, this.props.signal)
      );
    }
  }]);

  return Page;
}(_preact.Component);

var mapStateToProps = exports.mapStateToProps = function mapStateToProps(state) {
  return {
    nodeData: (0, _rxSelectors.getNodeData)(state),
    isLoading: (0, _rxSelectors.isLoading)(state)
  };
};

var mapDispatchToProps = exports.mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    getNodeStatus: (0, _redux.bindActionCreators)(_rxActions.getNodeStatus, dispatch),
    stopTimer: (0, _redux.bindActionCreators)(_rxActions.stopTimer, dispatch),
    changeNode: (0, _redux.bindActionCreators)(_rxActions.changeNode, dispatch)
  };
};

exports.default = (0, _preactRedux.connect)(mapStateToProps, mapDispatchToProps)(Page);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9yeFBhZ2UuanMiXSwibmFtZXMiOlsidG9ISE1NU1MiLCJzZWNzIiwicGx1cyIsInNlY19udW0iLCJwYXJzZUludCIsImRheXMiLCJNYXRoIiwiZmxvb3IiLCJob3VycyIsIm1pbnV0ZXMiLCJzZWNvbmRzIiwibWFwIiwidiIsImpvaW4iLCJTeXN0ZW1Cb3giLCJwcm9wcyIsIm5vZGUiLCJ1cHRpbWUiLCJ1cGRhdGUiLCJJMThuIiwidCIsImNvdW50IiwiUGFnZSIsImdldE5vZGVTdGF0dXMiLCJzdG9wVGltZXIiLCJzdG9wQ291bnQiLCJvcHRpb24iLCJub2RlRGF0YSIsIm5vZGVTdGF0dXMiLCJ0ZXh0QWxpZ24iLCJzZXRTdGF0ZSIsInBsdXNUaW1lIiwic2V0SW50ZXJ2YWwiLCJuZXdUaW1lIiwic3RhdGUiLCJjbGVhckludGVydmFsIiwiaG9zdG5hbWUiLCJzdGFydENvdW50IiwiZmxvYXQiLCJmb250U2l6ZSIsIm1vc3RfYWN0aXZlIiwic2lnbmFsIiwiY2hhbmdlTm9kZSIsInNwbGl0IiwiaWZhY2UiLCJyb3VuZCIsInJ4X2J5dGVzIiwidHhfYnl0ZXMiLCJjbGVhciIsImJpbmQiLCJpbnRlcm5ldCIsIklQdjQiLCJ3b3JraW5nIiwiY29sb3IiLCJJUHY2IiwiRE5TIiwiaXBzIiwiaXAiLCJrZXkiLCJ2ZXJzaW9uIiwiYWRkcmVzcyIsInBhZGRpbmdUb3AiLCJsb2FkaW5nIiwiaXNMb2FkaW5nIiwibWFwU3RhdGVUb1Byb3BzIiwibWFwRGlzcGF0Y2hUb1Byb3BzIiwiZGlzcGF0Y2giXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOztBQUVBOztBQUNBOztBQUVBOztBQUNBOztBQUVBOzs7Ozs7K2VBVEE7OztBQVdBLElBQU1BLFdBQVcsU0FBWEEsUUFBVyxDQUFDQyxJQUFELEVBQU9DLElBQVAsRUFBZ0I7QUFDL0IsTUFBSUMsVUFBVUMsU0FBU0gsSUFBVCxFQUFlLEVBQWYsSUFBcUJDLElBQW5DO0FBQ0EsTUFBSUcsT0FBVUMsS0FB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LE9BQU8sRUFBQ0MsWUFBVyxNQUFaLEVBQTlCO0FBQ0ksYUFBS0MsT0FBTCxDQUFhLEtBQUsvQyxLQUFMLENBQVdnRCxTQUF4QixFQUFtQyxLQUFLaEQsS0FBTCxDQUFXWSxRQUE5QyxFQUF1RCxLQUFLWixLQUFMLENBQVcwQixNQUFsRTtBQURKLE9BREY7QUFLRDs7Ozs7O0FBSUksSUFBTXVCLDRDQUFrQixTQUFsQkEsZUFBa0IsQ0FBQzlCLEtBQUQsRUFBVztBQUN4QyxTQUFPO0FBQ0xQLGNBQVUsOEJBQVlPLEtBQVosQ0FETDtBQUVMNkIsZUFBVyw0QkFBVTdCLEtBQVY7QUFGTixHQUFQO0FBSUQsQ0FMTTs7QUFPQSxJQUFNK0Isa0RBQXFCLFNBQXJCQSxrQkFBcUIsQ0FBQ0MsUUFBRCxFQUFjO0FBQzlDLFNBQU87QUFDTDNDLG1CQUFlLHlEQUFpQzJDLFFBQWpDLENBRFY7QUFFTDFDLGVBQVcscURBQTZCMEMsUUFBN0IsQ0FGTjtBQUdMeEIsZ0JBQVksc0RBQThCd0IsUUFBOUI7QUFIUCxHQUFQO0FBS0QsQ0FOTTs7a0JBUVEsMEJBQVFGLGVBQVIsRUFBeUJDLGtCQUF6QixFQUE2QzNDLElBQTdDLEMiLCJmaWxlIjoicnhQYWdlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLypnbG9iYWwgSTE4biAqL1xuaW1wb3J0IHsgaCwgQ29tcG9uZW50IH0gZnJvbSAncHJlYWN0JztcblxuaW1wb3J0IHsgYmluZEFjdGlvbkNyZWF0b3JzIH0gZnJvbSAncmVkdXgnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3ByZWFjdC1yZWR1eCc7XG5cbmltcG9ydCB7IGdldE5vZGVTdGF0dXMsIHN0b3BUaW1lciwgY2hhbmdlTm9kZSB9IGZyb20gJy4vcnhBY3Rpb25zJztcbmltcG9ydCB7IGdldE5vZGVEYXRhLCBpc0xvYWRpbmcgfSBmcm9tICcuL3J4U2VsZWN0b3JzJztcblxuaW1wb3J0IHsgQm94IH0gZnJvbSAnLi9jb21wb25lbnRzL2JveC5qcyc7XG5cbmNvbnN0IHRvSEhNTVNTID0gKHNlY3MsIHBsdXMpID0+IHtcbiAgbGV0IHNlY19udW0gPSBwYXJzZUludChzZWNzLCAxMCkgKyBwbHVzO1xuICBsZXQgZGF5cyAgICA9IE1hdGguZmxvb3Ioc2VjX251bSAvIDg2NDAwKSAlIDI0O1xuICBsZXQgaG91cnMgICA9IE1hdGguZmxvb3Ioc2VjX251bSAvIDM2MDApICUgMjQ7XG4gIGxldCBtaW51dGVzID0gTWF0aC5mbG9vcihzZWNfbnVtIC8gNjApICUgNjA7XG4gIGxldCBzZWNvbmRzID0gc2VjX251bSAlIDYwO1xuICByZXR1cm4gW2RheXMsaG91cnMsbWludXRlcyxzZWNvbmRzXVxuICAgICAgICAubWFwKHYgPT4gdiA8IDEwID8gXCIwXCIgKyB2IDogdilcbiAgICAgICAgLmpvaW4oXCI6XCIpO1xufTtcblxuY2xhc3MgU3lzdGVtQm94IGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgcmVuZGVyKCkge1xuICAgIGlmICh0eXBlb2YgdGhpcy5wcm9wcy5ub2RlLnVwdGltZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHRoaXMucHJvcHMudXBkYXRlKCk7XG4gICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPEJveCB0aXRsZT17STE4bi50KCdTeXN0ZW0nKX0+XG4gICAgICAgICAgICAgIDxzcGFuPlxuICAgICAgICAgICAgICAgIDxiPntJMThuLnQoJ1VwdGltZScpfSA8L2I+e3RvSEhNTVNTKHRoaXMucHJvcHMubm9kZS51cHRpbWUsdGhpcy5wcm9wcy5jb3VudCl9PGJyLz5cbiAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgPC9Cb3g+XG4gICAgICApO1xuICAgIH1cbiAgICByZXR1cm4gKDxzcGFuPjwvc3Bhbj4pO1xuICB9XG59XG5cblxuZXhwb3J0IGNsYXNzIFBhZ2UgZXh0ZW5kcyBDb21wb25lbnQge1xuICBcbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgdGhpcy5wcm9wcy5nZXROb2RlU3RhdHVzKCk7XG4gIH1cblxuICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICB0aGlzLnByb3BzLnN0b3BUaW1lcigpO1xuICAgIHRoaXMuc3RvcENvdW50KCk7XG4gIH1cblxuICBsb2FkaW5nKG9wdGlvbiwgbm9kZURhdGEpe1xuICAgIGlmICghb3B0aW9uKSB7XG4gICAgICByZXR1cm4gdGhpcy5ub2RlU3RhdHVzKG5vZGVEYXRhKTtcbiAgICB9XG4gICAgcmV0dXJuIChcbiAgICAgIDxoNCBzdHlsZT17e3RleHRBbGlnbjonY2VudGVyJ319ID5cbiAgICAgICAge0kxOG4udCgnTG9hZGluZyBub2RlIHN0YXR1cy4uLicpfVxuICAgICAgPC9oND5cbiAgICApO1xuICB9XG5cbiAgc3RhcnRDb3VudCgpIHtcbiAgICBpZiAodHlwZW9mIHRoaXMuY291bnQgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtwbHVzVGltZTogMH0pO1xuICAgICAgdGhpcy5jb3VudCA9IHNldEludGVydmFsKCgpPT57XG4gICAgICAgIGxldCBuZXdUaW1lID0gdGhpcy5zdGF0ZS5wbHVzVGltZSArIDE7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe3BsdXNUaW1lOiBuZXdUaW1lfSk7XG4gICAgICB9LDEwMDApO1xuICAgIH1cbiAgfVxuXG4gIHN0b3BDb3VudCgpIHtcbiAgICBjbGVhckludGVydmFsKHRoaXMuY291bnQpO1xuICAgIHRoaXMuc2V0U3RhdGUoe3BsdXNUaW1lOjB9KTtcbiAgICBkZWxldGUgdGhpcy5jb3VudDtcbiAgfVxuXG4gIG5vZGVTdGF0dXMobm9kZSl7XG4gICAgaWYgKG5vZGUuaG9zdG5hbWUpIHtcbiAgICAgIHRoaXMuc3RhcnRDb3VudCgpO1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8Qm94IHRpdGxlPXtJMThuLnQoJ01vc3QgQWN0aXZlJyl9PlxuICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7ZmxvYXQ6J3JpZ2h0Jyxmb250U2l6ZTonMi43ZW0nfX0+e25vZGUubW9zdF9hY3RpdmUuc2lnbmFsfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17e2ZvbnRTaXplOicxLjRlbSd9fSBvbkNsaWNrPXsoKT0+dGhpcy5wcm9wcy5jaGFuZ2VOb2RlKG5vZGUubW9zdF9hY3RpdmUuaG9zdG5hbWUuc3BsaXQoJ18nKVswXSl9PjxiPntub2RlLm1vc3RfYWN0aXZlLmhvc3RuYW1lLnNwbGl0KCdfJylbMF19PC9iPjwvc3Bhbj48YnIvPlxuICAgICAgICAgICAgICAgIDxiPntJMThuLnQoJ0ludGVyZmFjZScpfSA8L2I+e25vZGUubW9zdF9hY3RpdmUuaWZhY2Uuc3BsaXQoJy0nKVswXX08YnIvPlxuICAgICAgICAgICAgICAgIDxiPntJMThuLnQoJ1RyYWZmaWMnKX0gPC9iPiB7TWF0aC5yb3VuZCgobm9kZS5tb3N0X2FjdGl2ZS5yeF9ieXRlcyArIG5vZGUubW9zdF9hY3RpdmUudHhfYnl0ZXMpLzEwMjQvMTAyNCl9TUJcbiAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3tjbGVhcjonYm90aCd9fT48L2Rpdj5cbiAgICAgICAgICAgPC9Cb3g+XG5cbiAgICAgICAgICAgPFN5c3RlbUJveCBub2RlPXtub2RlfSBjb3VudD17dGhpcy5zdGF0ZS5wbHVzVGltZX0gdXBkYXRlPXt0aGlzLnN0YXJ0Q291bnQuYmluZCh0aGlzKX0vPlxuXG4gICAgICAgICAgICA8Qm94IHRpdGxlPXtJMThuLnQoJ0ludGVybmV0IGNvbm5lY3Rpb24nKX0+XG4gICAgICAgICAgICAgIDxzcGFuPlxuICAgICAgICAgICAgICAgIDxiPiB7KG5vZGUuaW50ZXJuZXQuSVB2NC53b3JraW5nID09PSAxKT8gKDxzcGFuIHN0eWxlPXt7Y29sb3I6J2dyZWVuJ319PuKclDwvc3Bhbj4pOiAoPHNwYW4gc3R5bGU9e3tjb2xvcjoncmVkJ319PuKcmDwvc3Bhbj4pfSBJUHY0IDwvYj5cbiAgICAgICAgICAgICAgICA8Yj4geyhub2RlLmludGVybmV0LklQdjYud29ya2luZyA9PT0gMSk/ICg8c3BhbiBzdHlsZT17e2NvbG9yOidncmVlbid9fT7inJQ8L3NwYW4+KTogKDxzcGFuIHN0eWxlPXt7Y29sb3I6J3JlZCd9fT7inJg8L3NwYW4+KX0gSVB2NiA8L2I+XG4gICAgICAgICAgICAgICAgPGI+IHsobm9kZS5pbnRlcm5ldC5ETlMud29ya2luZyA9PT0gMSk/ICg8c3BhbiBzdHlsZT17e2NvbG9yOidncmVlbid9fT7inJQ8L3NwYW4+KTogKDxzcGFuIHN0eWxlPXt7Y29sb3I6J3JlZCd9fT7inJg8L3NwYW4+KX0gRE5TIDwvYj5cbiAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgPC9Cb3g+XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIDxCb3ggdGl0bGU9e0kxOG4udCgnSVAgQWRkcmVzc2VzJyl9PlxuICAgICAgICAgICAgICB7IG5vZGUuaXBzLm1hcCgoaXAsa2V5KSA9PiAoXG4gICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9eyhrZXkgPT09IDApPyB7Zm9udFNpemU6JzEuNGVtJ30gOnt9fT5cbiAgICAgICAgICAgICAgICAgIDxiPklQdntpcC52ZXJzaW9ufSA8L2I+IHtpcC5hZGRyZXNzfTwgYnIvPlxuICAgICAgICAgICAgICAgIDwvc3Bhbj4pXG4gICAgICAgICAgICAgICl9XG4gICAgICAgICAgICA8L0JveD5cblxuICAgICAgICA8L2Rpdj5cbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzPVwiY29udGFpbmVyXCIgc3R5bGU9e3twYWRkaW5nVG9wOic4MHB4J319PlxuICAgICAgICB7IHRoaXMubG9hZGluZyh0aGlzLnByb3BzLmlzTG9hZGluZywgdGhpcy5wcm9wcy5ub2RlRGF0YSx0aGlzLnByb3BzLnNpZ25hbCkgfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5cbmV4cG9ydCBjb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoc3RhdGUpID0+IHtcbiAgcmV0dXJuIHtcbiAgICBub2RlRGF0YTogZ2V0Tm9kZURhdGEoc3RhdGUpLFxuICAgIGlzTG9hZGluZzogaXNMb2FkaW5nKHN0YXRlKVxuICB9O1xufTtcblxuZXhwb3J0IGNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IChkaXNwYXRjaCkgPT4ge1xuICByZXR1cm4ge1xuICAgIGdldE5vZGVTdGF0dXM6IGJpbmRBY3Rpb25DcmVhdG9ycyhnZXROb2RlU3RhdHVzLGRpc3BhdGNoKSxcbiAgICBzdG9wVGltZXI6IGJpbmRBY3Rpb25DcmVhdG9ycyhzdG9wVGltZXIsZGlzcGF0Y2gpLFxuICAgIGNoYW5nZU5vZGU6IGJpbmRBY3Rpb25DcmVhdG9ycyhjaGFuZ2VOb2RlLGRpc3BhdGNoKVxuICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wcykoUGFnZSk7Il19