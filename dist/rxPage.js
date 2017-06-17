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

var Page = exports.Page = function (_Component) {
  _inherits(Page, _Component);

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
    key: 'nodeStatus',
    value: function nodeStatus(node) {
      var _this2 = this;

      if (node.hostname) {
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
                  return _this2.props.changeNode(node.most_active.hostname.split('_')[0]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9yeFBhZ2UuanMiXSwibmFtZXMiOlsiUGFnZSIsInByb3BzIiwiZ2V0Tm9kZVN0YXR1cyIsInN0b3BUaW1lciIsIm9wdGlvbiIsIm5vZGVEYXRhIiwibm9kZVN0YXR1cyIsInRleHRBbGlnbiIsIkkxOG4iLCJ0Iiwibm9kZSIsImhvc3RuYW1lIiwiZmxvYXQiLCJmb250U2l6ZSIsIm1vc3RfYWN0aXZlIiwic2lnbmFsIiwiY2hhbmdlTm9kZSIsInNwbGl0IiwiaWZhY2UiLCJNYXRoIiwicm91bmQiLCJyeF9ieXRlcyIsInR4X2J5dGVzIiwiY2xlYXIiLCJpbnRlcm5ldCIsIklQdjQiLCJ3b3JraW5nIiwiY29sb3IiLCJJUHY2IiwiRE5TIiwiaXBzIiwibWFwIiwiaXAiLCJrZXkiLCJ2ZXJzaW9uIiwiYWRkcmVzcyIsInBhZGRpbmdUb3AiLCJsb2FkaW5nIiwiaXNMb2FkaW5nIiwibWFwU3RhdGVUb1Byb3BzIiwic3RhdGUiLCJtYXBEaXNwYXRjaFRvUHJvcHMiLCJkaXNwYXRjaCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7O0FBRUE7O0FBQ0E7O0FBQ0E7O0FBRUE7O0FBQ0E7O0FBRUE7Ozs7Ozs7O0lBRWFBLEksV0FBQUEsSTs7Ozs7Ozs7Ozs7d0NBRVM7QUFDbEIsV0FBS0MsS0FBTCxDQUFXQyxhQUFYO0FBQ0Q7OzsyQ0FFc0I7QUFDckIsV0FBS0QsS0FBTCxDQUFXRSxTQUFYO0FBQ0Q7Ozs0QkFFT0MsTSxFQUFRQyxRLEVBQVM7QUFDdkIsVUFBSSxDQUFDRCxNQUFMLEVBQWE7QUFDWCxlQUFPLEtBQUtFLFVBQUwsQ0FBZ0JELFFBQWhCLENBQVA7QUFDRDtBQUNELGFBQ0U7QUFBQTtBQUFBLFVBQUksT0FBTyxFQUFDRSxXQUFVLFFBQVgsRUFBWDtBQUNHQyxhQUFLQyxDQUFMLENBQU8sd0JBQVA7QUFESCxPQURGO0FBS0Q7OzsrQkFFVUMsSSxFQUFLO0FBQUE7O0FBQ2QsVUFBSUEsS0FBS0MsUUFBVCxFQUFtQjtBQUNqQixlQUNFO0FB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QkFBR0UsT0FBVjtBQUFBO0FBQUEsaUJBREY7QUFBQTtBQUMyQkYsbUJBQUdHLE9BRDlCO0FBQ3NDO0FBRHRDLGVBRGE7QUFBQSxhQUFiO0FBREo7QUFsQkosU0FERjtBQTZCRDtBQUNGOzs7NkJBRVE7QUFDUCxhQUNFO0FBQUE7QUFBQSxVQUFLLFNBQU0sV0FBWCxFQUF1QixPQUFPLEVBQUNDLFlBQVcsTUFBWixFQUE5QjtBQUNJLGFBQUtDLE9BQUwsQ0FBYSxLQUFLcEMsS0FBTCxDQUFXcUMsU0FBeEIsRUFBbUMsS0FBS3JDLEtBQUwsQ0FBV0ksUUFBOUMsRUFBdUQsS0FBS0osS0FBTCxDQUFXYyxNQUFsRTtBQURKLE9BREY7QUFLRDs7Ozs7O0FBSUksSUFBTXdCLDRDQUFrQixTQUFsQkEsZUFBa0IsQ0FBQ0MsS0FBRCxFQUFXO0FBQ3hDLFNBQU87QUFDTG5DLGNBQVUsOEJBQVltQyxLQUFaLENBREw7QUFFTEYsZUFBVyw0QkFBVUUsS0FBVjtBQUZOLEdBQVA7QUFJRCxDQUxNOztBQU9BLElBQU1DLGtEQUFxQixTQUFyQkEsa0JBQXFCLENBQUNDLFFBQUQsRUFBYztBQUM5QyxTQUFPO0FBQ0x4QyxtQkFBZSx5REFBaUN3QyxRQUFqQyxDQURWO0FBRUx2QyxlQUFXLHFEQUE2QnVDLFFBQTdCLENBRk47QUFHTDFCLGdCQUFZLHNEQUE4QjBCLFFBQTlCO0FBSFAsR0FBUDtBQUtELENBTk07O2tCQVFRLDBCQUFRSCxlQUFSLEVBQXlCRSxrQkFBekIsRUFBNkN6QyxJQUE3QyxDIiwiZmlsZSI6InJ4UGFnZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGgsIENvbXBvbmVudCB9IGZyb20gJ3ByZWFjdCc7XG5cbmltcG9ydCB7IGJpbmRBY3Rpb25DcmVhdG9ycyB9IGZyb20gJ3JlZHV4JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdwcmVhY3QtcmVkdXgnO1xuaW1wb3J0IHsgTGluayB9IGZyb20gJ3ByZWFjdC1yb3V0ZXIvbWF0Y2gnO1xuXG5pbXBvcnQgeyBnZXROb2RlU3RhdHVzLCBzdG9wVGltZXIsIGNoYW5nZU5vZGUgfSBmcm9tICcuL3J4QWN0aW9ucyc7XG5pbXBvcnQgeyBnZXROb2RlRGF0YSwgaXNMb2FkaW5nIH0gZnJvbSAnLi9yeFNlbGVjdG9ycyc7XG5cbmltcG9ydCB7IEJveCB9IGZyb20gJy4vY29tcG9uZW50cy9ib3guanMnO1xuXG5leHBvcnQgY2xhc3MgUGFnZSBleHRlbmRzIENvbXBvbmVudCB7XG4gIFxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICB0aGlzLnByb3BzLmdldE5vZGVTdGF0dXMoKTtcbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgIHRoaXMucHJvcHMuc3RvcFRpbWVyKCk7XG4gIH1cblxuICBsb2FkaW5nKG9wdGlvbiwgbm9kZURhdGEpe1xuICAgIGlmICghb3B0aW9uKSB7XG4gICAgICByZXR1cm4gdGhpcy5ub2RlU3RhdHVzKG5vZGVEYXRhKTtcbiAgICB9XG4gICAgcmV0dXJuIChcbiAgICAgIDxoNCBzdHlsZT17e3RleHRBbGlnbjonY2VudGVyJ319ID5cbiAgICAgICAge0kxOG4udCgnTG9hZGluZyBub2RlIHN0YXR1cy4uLicpfVxuICAgICAgPC9oND5cbiAgICApO1xuICB9XG5cbiAgbm9kZVN0YXR1cyhub2RlKXtcbiAgICBpZiAobm9kZS5ob3N0bmFtZSkge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGRpdj5cblxuICAgICAgICAgIDxCb3ggdGl0bGU9e0kxOG4udCgnTW9zdCBBY3RpdmUnKX0+XG4gICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3tmbG9hdDoncmlnaHQnLGZvbnRTaXplOicyLjdlbSd9fT57bm9kZS5tb3N0X2FjdGl2ZS5zaWduYWx9PC9zcGFuPlxuICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7Zm9udFNpemU6JzEuNGVtJ319IG9uQ2xpY2s9eygpPT50aGlzLnByb3BzLmNoYW5nZU5vZGUobm9kZS5tb3N0X2FjdGl2ZS5ob3N0bmFtZS5zcGxpdCgnXycpWzBdKX0+PGI+e25vZGUubW9zdF9hY3RpdmUuaG9zdG5hbWUuc3BsaXQoJ18nKVswXX08L2I+PC9zcGFuPjxici8+XG4gICAgICAgICAgICAgICAgPGI+e0kxOG4udCgnSW50ZXJmYWNlJyl9IDwvYj57bm9kZS5tb3N0X2FjdGl2ZS5pZmFjZS5zcGxpdCgnLScpWzBdfTxici8+XG4gICAgICAgICAgICAgICAgPGI+e0kxOG4udCgnVHJhZmZpYycpfSA8L2I+IHtNYXRoLnJvdW5kKChub2RlLm1vc3RfYWN0aXZlLnJ4X2J5dGVzICsgbm9kZS5tb3N0X2FjdGl2ZS50eF9ieXRlcykvMTAyNC8xMDI0KX1NQlxuICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17e2NsZWFyOidib3RoJ319PjwvZGl2PlxuICAgICAgICAgICA8L0JveD5cblxuICAgICAgICAgICAgPEJveCB0aXRsZT17STE4bi50KCdJbnRlcm5ldCBjb25uZWN0aW9uJyl9PlxuICAgICAgICAgICAgICA8c3Bhbj5cbiAgICAgICAgICAgICAgICA8Yj4geyhub2RlLmludGVybmV0LklQdjQud29ya2luZyA9PT0gMSk/ICg8c3BhbiBzdHlsZT17e2NvbG9yOidncmVlbid9fT7inJQ8L3NwYW4+KTogKDxzcGFuIHN0eWxlPXt7Y29sb3I6J3JlZCd9fT7inJg8L3NwYW4+KX0gSVB2NCA8L2I+XG4gICAgICAgICAgICAgICAgPGI+IHsobm9kZS5pbnRlcm5ldC5JUHY2LndvcmtpbmcgPT09IDEpPyAoPHNwYW4gc3R5bGU9e3tjb2xvcjonZ3JlZW4nfX0+4pyUPC9zcGFuPik6ICg8c3BhbiBzdHlsZT17e2NvbG9yOidyZWQnfX0+4pyYPC9zcGFuPil9IElQdjYgPC9iPlxuICAgICAgICAgICAgICAgIDxiPiB7KG5vZGUuaW50ZXJuZXQuRE5TLndvcmtpbmcgPT09IDEpPyAoPHNwYW4gc3R5bGU9e3tjb2xvcjonZ3JlZW4nfX0+4pyUPC9zcGFuPik6ICg8c3BhbiBzdHlsZT17e2NvbG9yOidyZWQnfX0+4pyYPC9zcGFuPil9IEROUyA8L2I+XG4gICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgIDwvQm94PlxuICAgICAgICAgICAgXG4gICAgICAgICAgICA8Qm94IHRpdGxlPXtJMThuLnQoJ0lQIEFkZHJlc3NlcycpfT5cbiAgICAgICAgICAgICAgeyBub2RlLmlwcy5tYXAoKGlwLGtleSkgPT4gKFxuICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXsoa2V5ID09PSAwKT8ge2ZvbnRTaXplOicxLjRlbSd9IDp7fX0+XG4gICAgICAgICAgICAgICAgICA8Yj5JUHZ7aXAudmVyc2lvbn0gPC9iPiB7aXAuYWRkcmVzc308IGJyLz5cbiAgICAgICAgICAgICAgICA8L3NwYW4+KVxuICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgPC9Cb3g+XG5cbiAgICAgICAgPC9kaXY+XG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzcz1cImNvbnRhaW5lclwiIHN0eWxlPXt7cGFkZGluZ1RvcDonODBweCd9fT5cbiAgICAgICAgeyB0aGlzLmxvYWRpbmcodGhpcy5wcm9wcy5pc0xvYWRpbmcsIHRoaXMucHJvcHMubm9kZURhdGEsdGhpcy5wcm9wcy5zaWduYWwpIH1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuXG5leHBvcnQgY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHN0YXRlKSA9PiB7XG4gIHJldHVybiB7XG4gICAgbm9kZURhdGE6IGdldE5vZGVEYXRhKHN0YXRlKSxcbiAgICBpc0xvYWRpbmc6IGlzTG9hZGluZyhzdGF0ZSlcbiAgfTtcbn07XG5cbmV4cG9ydCBjb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSAoZGlzcGF0Y2gpID0+IHtcbiAgcmV0dXJuIHtcbiAgICBnZXROb2RlU3RhdHVzOiBiaW5kQWN0aW9uQ3JlYXRvcnMoZ2V0Tm9kZVN0YXR1cyxkaXNwYXRjaCksXG4gICAgc3RvcFRpbWVyOiBiaW5kQWN0aW9uQ3JlYXRvcnMoc3RvcFRpbWVyLGRpc3BhdGNoKSxcbiAgICBjaGFuZ2VOb2RlOiBiaW5kQWN0aW9uQ3JlYXRvcnMoY2hhbmdlTm9kZSxkaXNwYXRjaClcbiAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpKFBhZ2UpOyJdfQ==