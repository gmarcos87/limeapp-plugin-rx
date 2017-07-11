'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapDispatchToProps = exports.mapStateToProps = exports.Page = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _preact = require('preact');

var _redux = require('redux');

var _preactRedux = require('preact-redux');

var _match = require('preact-router/match');

var _rxActions = require('./rxActions');

var _rxSelectors = require('./rxSelectors');

var _box = require('./components/box.js');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var toHHMMSS = function toHHMMSS(secs, plus) {
  var sec_num = parseInt(secs, 10) + plus;
  var days = Math.floor(sec_num / 86400) % 24;
  var hours = Math.floor(sec_num / 3600) % 24;
  var minutes = Math.floor(sec_num / 60) % 60;
  var seconds = sec_num % 60;
  return [days, hours, minutes, seconds].map(function (v) {
    return v < 10 ? "0" + v : v;
  })
  //.filter((v,i) => v !== "00" || i > 0)
  .join(":");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9yeFBhZ2UuanMiXSwibmFtZXMiOlsidG9ISE1NU1MiLCJzZWNzIiwicGx1cyIsInNlY19udW0iLCJwYXJzZUludCIsImRheXMiLCJNYXRoIiwiZmxvb3IiLCJob3VycyIsIm1pbnV0ZXMiLCJzZWNvbmRzIiwibWFwIiwidiIsImpvaW4iLCJTeXN0ZW1Cb3giLCJwcm9wcyIsIm5vZGUiLCJ1cHRpbWUiLCJ1cGRhdGUiLCJJMThuIiwidCIsImNvdW50IiwiUGFnZSIsImdldE5vZGVTdGF0dXMiLCJzdG9wVGltZXIiLCJzdG9wQ291bnQiLCJvcHRpb24iLCJub2RlRGF0YSIsIm5vZGVTdGF0dXMiLCJ0ZXh0QWxpZ24iLCJzZXRTdGF0ZSIsInBsdXNUaW1lIiwic2V0SW50ZXJ2YWwiLCJuZXdUaW1lIiwic3RhdGUiLCJjbGVhckludGVydmFsIiwiaG9zdG5hbWUiLCJzdGFydENvdW50IiwiZmxvYXQiLCJmb250U2l6ZSIsIm1vc3RfYWN0aXZlIiwic2lnbmFsIiwiY2hhbmdlTm9kZSIsInNwbGl0IiwiaWZhY2UiLCJyb3VuZCIsInJ4X2J5dGVzIiwidHhfYnl0ZXMiLCJjbGVhciIsImJpbmQiLCJpbnRlcm5ldCIsIklQdjQiLCJ3b3JraW5nIiwiY29sb3IiLCJJUHY2IiwiRE5TIiwiaXBzIiwiaXAiLCJrZXkiLCJ2ZXJzaW9uIiwiYWRkcmVzcyIsInBhZGRpbmdUb3AiLCJsb2FkaW5nIiwiaXNMb2FkaW5nIiwibWFwU3RhdGVUb1Byb3BzIiwibWFwRGlzcGF0Y2hUb1Byb3BzIiwiZGlzcGF0Y2giXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBOztBQUVBOztBQUNBOztBQUNBOztBQUVBOztBQUNBOztBQUVBOzs7Ozs7OztBQUVBLElBQU1BLFdBQVcsU0FBWEEsUUFBVyxDQUFDQyxJQUFELEVBQU9DLElBQVAsRUFBZ0I7QUFDL0IsTUFBSUMsVUFBVUMsU0FBU0gsSUFBVCxFQUFlLEVBQWYsSUFBcUJDLElBQW5DO0FBQ0EsTUFBSUcsT0FBVUMsS0FB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V0FBWCxFQUF1QixPQUFPLEVBQUNDLFlBQVcsTUFBWixFQUE5QjtBQUNJLGFBQUtDLE9BQUwsQ0FBYSxLQUFLL0MsS0FBTCxDQUFXZ0QsU0FBeEIsRUFBbUMsS0FBS2hELEtBQUwsQ0FBV1ksUUFBOUMsRUFBdUQsS0FBS1osS0FBTCxDQUFXMEIsTUFBbEU7QUFESixPQURGO0FBS0Q7Ozs7OztBQUlJLElBQU11Qiw0Q0FBa0IsU0FBbEJBLGVBQWtCLENBQUM5QixLQUFELEVBQVc7QUFDeEMsU0FBTztBQUNMUCxjQUFVLDhCQUFZTyxLQUFaLENBREw7QUFFTDZCLGVBQVcsNEJBQVU3QixLQUFWO0FBRk4sR0FBUDtBQUlELENBTE07O0FBT0EsSUFBTStCLGtEQUFxQixTQUFyQkEsa0JBQXFCLENBQUNDLFFBQUQsRUFBYztBQUM5QyxTQUFPO0FBQ0wzQyxtQkFBZSx5REFBaUMyQyxRQUFqQyxDQURWO0FBRUwxQyxlQUFXLHFEQUE2QjBDLFFBQTdCLENBRk47QUFHTHhCLGdCQUFZLHNEQUE4QndCLFFBQTlCO0FBSFAsR0FBUDtBQUtELENBTk07O2tCQVFRLDBCQUFRRixlQUFSLEVBQXlCQyxrQkFBekIsRUFBNkMzQyxJQUE3QyxDIiwiZmlsZSI6InJ4UGFnZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGgsIENvbXBvbmVudCB9IGZyb20gJ3ByZWFjdCc7XG5cbmltcG9ydCB7IGJpbmRBY3Rpb25DcmVhdG9ycyB9IGZyb20gJ3JlZHV4JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdwcmVhY3QtcmVkdXgnO1xuaW1wb3J0IHsgTGluayB9IGZyb20gJ3ByZWFjdC1yb3V0ZXIvbWF0Y2gnO1xuXG5pbXBvcnQgeyBnZXROb2RlU3RhdHVzLCBzdG9wVGltZXIsIGNoYW5nZU5vZGUgfSBmcm9tICcuL3J4QWN0aW9ucyc7XG5pbXBvcnQgeyBnZXROb2RlRGF0YSwgaXNMb2FkaW5nIH0gZnJvbSAnLi9yeFNlbGVjdG9ycyc7XG5cbmltcG9ydCB7IEJveCB9IGZyb20gJy4vY29tcG9uZW50cy9ib3guanMnO1xuXG5jb25zdCB0b0hITU1TUyA9IChzZWNzLCBwbHVzKSA9PiB7XG4gIGxldCBzZWNfbnVtID0gcGFyc2VJbnQoc2VjcywgMTApICsgcGx1cztcbiAgbGV0IGRheXMgICAgPSBNYXRoLmZsb29yKHNlY19udW0gLyA4NjQwMCkgJSAyNDtcbiAgbGV0IGhvdXJzICAgPSBNYXRoLmZsb29yKHNlY19udW0gLyAzNjAwKSAlIDI0O1xuICBsZXQgbWludXRlcyA9IE1hdGguZmxvb3Ioc2VjX251bSAvIDYwKSAlIDYwO1xuICBsZXQgc2Vjb25kcyA9IHNlY19udW0gJSA2MDtcbiAgcmV0dXJuIFtkYXlzLGhvdXJzLG1pbnV0ZXMsc2Vjb25kc11cbiAgICAgICAgLm1hcCh2ID0+IHYgPCAxMCA/IFwiMFwiICsgdiA6IHYpXG4gICAgICAgIC8vLmZpbHRlcigodixpKSA9PiB2ICE9PSBcIjAwXCIgfHwgaSA+IDApXG4gICAgICAgIC5qb2luKFwiOlwiKTtcbn07XG5cbmNsYXNzIFN5c3RlbUJveCBleHRlbmRzIENvbXBvbmVudCB7XG4gIHJlbmRlcigpIHtcbiAgICBpZiAodHlwZW9mIHRoaXMucHJvcHMubm9kZS51cHRpbWUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICB0aGlzLnByb3BzLnVwZGF0ZSgpO1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxCb3ggdGl0bGU9e0kxOG4udCgnU3lzdGVtJyl9PlxuICAgICAgICAgICAgICA8c3Bhbj5cbiAgICAgICAgICAgICAgICA8Yj57STE4bi50KCdVcHRpbWUnKX0gPC9iPnt0b0hITU1TUyh0aGlzLnByb3BzLm5vZGUudXB0aW1lLHRoaXMucHJvcHMuY291bnQpfTxici8+XG4gICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgIDwvQm94PlxuICAgICAgKTtcbiAgICB9XG4gICAgcmV0dXJuICg8c3Bhbj48L3NwYW4+KTtcbiAgfVxufVxuXG5cbmV4cG9ydCBjbGFzcyBQYWdlIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIHRoaXMucHJvcHMuZ2V0Tm9kZVN0YXR1cygpO1xuICB9XG5cbiAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgdGhpcy5wcm9wcy5zdG9wVGltZXIoKTtcbiAgICB0aGlzLnN0b3BDb3VudCgpO1xuICB9XG5cbiAgbG9hZGluZyhvcHRpb24sIG5vZGVEYXRhKXtcbiAgICBpZiAoIW9wdGlvbikge1xuICAgICAgcmV0dXJuIHRoaXMubm9kZVN0YXR1cyhub2RlRGF0YSk7XG4gICAgfVxuICAgIHJldHVybiAoXG4gICAgICA8aDQgc3R5bGU9e3t0ZXh0QWxpZ246J2NlbnRlcid9fSA+XG4gICAgICAgIHtJMThuLnQoJ0xvYWRpbmcgbm9kZSBzdGF0dXMuLi4nKX1cbiAgICAgIDwvaDQ+XG4gICAgKTtcbiAgfVxuXG4gIHN0YXJ0Q291bnQoKSB7XG4gICAgaWYgKHR5cGVvZiB0aGlzLmNvdW50ID09PSAndW5kZWZpbmVkJykge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7cGx1c1RpbWU6IDB9KTtcbiAgICAgIHRoaXMuY291bnQgPSBzZXRJbnRlcnZhbCgoKT0+e1xuICAgICAgICBsZXQgbmV3VGltZSA9IHRoaXMuc3RhdGUucGx1c1RpbWUgKyAxO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtwbHVzVGltZTogbmV3VGltZX0pO1xuICAgICAgfSwxMDAwKTtcbiAgICB9XG4gIH1cblxuICBzdG9wQ291bnQoKSB7XG4gICAgY2xlYXJJbnRlcnZhbCh0aGlzLmNvdW50KTtcbiAgICB0aGlzLnNldFN0YXRlKHtwbHVzVGltZTowfSk7XG4gICAgZGVsZXRlIHRoaXMuY291bnQ7XG4gIH1cblxuICBub2RlU3RhdHVzKG5vZGUpe1xuICAgIGlmIChub2RlLmhvc3RuYW1lKSB7XG4gICAgICB0aGlzLnN0YXJ0Q291bnQoKTtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPEJveCB0aXRsZT17STE4bi50KCdNb3N0IEFjdGl2ZScpfT5cbiAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17e2Zsb2F0OidyaWdodCcsZm9udFNpemU6JzIuN2VtJ319Pntub2RlLm1vc3RfYWN0aXZlLnNpZ25hbH08L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3tmb250U2l6ZTonMS40ZW0nfX0gb25DbGljaz17KCk9PnRoaXMucHJvcHMuY2hhbmdlTm9kZShub2RlLm1vc3RfYWN0aXZlLmhvc3RuYW1lLnNwbGl0KCdfJylbMF0pfT48Yj57bm9kZS5tb3N0X2FjdGl2ZS5ob3N0bmFtZS5zcGxpdCgnXycpWzBdfTwvYj48L3NwYW4+PGJyLz5cbiAgICAgICAgICAgICAgICA8Yj57STE4bi50KCdJbnRlcmZhY2UnKX0gPC9iPntub2RlLm1vc3RfYWN0aXZlLmlmYWNlLnNwbGl0KCctJylbMF19PGJyLz5cbiAgICAgICAgICAgICAgICA8Yj57STE4bi50KCdUcmFmZmljJyl9IDwvYj4ge01hdGgucm91bmQoKG5vZGUubW9zdF9hY3RpdmUucnhfYnl0ZXMgKyBub2RlLm1vc3RfYWN0aXZlLnR4X2J5dGVzKS8xMDI0LzEwMjQpfU1CXG4gICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7Y2xlYXI6J2JvdGgnfX0+PC9kaXY+XG4gICAgICAgICAgIDwvQm94PlxuXG4gICAgICAgICAgIDxTeXN0ZW1Cb3ggbm9kZT17bm9kZX0gY291bnQ9e3RoaXMuc3RhdGUucGx1c1RpbWV9IHVwZGF0ZT17dGhpcy5zdGFydENvdW50LmJpbmQodGhpcyl9Lz5cblxuICAgICAgICAgICAgPEJveCB0aXRsZT17STE4bi50KCdJbnRlcm5ldCBjb25uZWN0aW9uJyl9PlxuICAgICAgICAgICAgICA8c3Bhbj5cbiAgICAgICAgICAgICAgICA8Yj4geyhub2RlLmludGVybmV0LklQdjQud29ya2luZyA9PT0gMSk/ICg8c3BhbiBzdHlsZT17e2NvbG9yOidncmVlbid9fT7inJQ8L3NwYW4+KTogKDxzcGFuIHN0eWxlPXt7Y29sb3I6J3JlZCd9fT7inJg8L3NwYW4+KX0gSVB2NCA8L2I+XG4gICAgICAgICAgICAgICAgPGI+IHsobm9kZS5pbnRlcm5ldC5JUHY2LndvcmtpbmcgPT09IDEpPyAoPHNwYW4gc3R5bGU9e3tjb2xvcjonZ3JlZW4nfX0+4pyUPC9zcGFuPik6ICg8c3BhbiBzdHlsZT17e2NvbG9yOidyZWQnfX0+4pyYPC9zcGFuPil9IElQdjYgPC9iPlxuICAgICAgICAgICAgICAgIDxiPiB7KG5vZGUuaW50ZXJuZXQuRE5TLndvcmtpbmcgPT09IDEpPyAoPHNwYW4gc3R5bGU9e3tjb2xvcjonZ3JlZW4nfX0+4pyUPC9zcGFuPik6ICg8c3BhbiBzdHlsZT17e2NvbG9yOidyZWQnfX0+4pyYPC9zcGFuPil9IEROUyA8L2I+XG4gICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgIDwvQm94PlxuICAgICAgICAgICAgXG4gICAgICAgICAgICA8Qm94IHRpdGxlPXtJMThuLnQoJ0lQIEFkZHJlc3NlcycpfT5cbiAgICAgICAgICAgICAgeyBub2RlLmlwcy5tYXAoKGlwLGtleSkgPT4gKFxuICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXsoa2V5ID09PSAwKT8ge2ZvbnRTaXplOicxLjRlbSd9IDp7fX0+XG4gICAgICAgICAgICAgICAgICA8Yj5JUHZ7aXAudmVyc2lvbn0gPC9iPiB7aXAuYWRkcmVzc308IGJyLz5cbiAgICAgICAgICAgICAgICA8L3NwYW4+KVxuICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgPC9Cb3g+XG5cbiAgICAgICAgPC9kaXY+XG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzcz1cImNvbnRhaW5lclwiIHN0eWxlPXt7cGFkZGluZ1RvcDonODBweCd9fT5cbiAgICAgICAgeyB0aGlzLmxvYWRpbmcodGhpcy5wcm9wcy5pc0xvYWRpbmcsIHRoaXMucHJvcHMubm9kZURhdGEsdGhpcy5wcm9wcy5zaWduYWwpIH1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuXG5leHBvcnQgY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHN0YXRlKSA9PiB7XG4gIHJldHVybiB7XG4gICAgbm9kZURhdGE6IGdldE5vZGVEYXRhKHN0YXRlKSxcbiAgICBpc0xvYWRpbmc6IGlzTG9hZGluZyhzdGF0ZSlcbiAgfTtcbn07XG5cbmV4cG9ydCBjb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSAoZGlzcGF0Y2gpID0+IHtcbiAgcmV0dXJuIHtcbiAgICBnZXROb2RlU3RhdHVzOiBiaW5kQWN0aW9uQ3JlYXRvcnMoZ2V0Tm9kZVN0YXR1cyxkaXNwYXRjaCksXG4gICAgc3RvcFRpbWVyOiBiaW5kQWN0aW9uQ3JlYXRvcnMoc3RvcFRpbWVyLGRpc3BhdGNoKSxcbiAgICBjaGFuZ2VOb2RlOiBiaW5kQWN0aW9uQ3JlYXRvcnMoY2hhbmdlTm9kZSxkaXNwYXRjaClcbiAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpKFBhZ2UpOyJdfQ==