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
      if (node.hostname) {
        return (0, _preact.h)(
          'div',
          null,
          (0, _preact.h)(
            'h3',
            null,
            (0, _preact.h)(
              'b',
              null,
              I18n.t('Node')
            ),
            ' ',
            node.hostname
          ),
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
              { style: { fontSize: '1.4em' } },
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
        { 'class': 'container', style: { paddingTop: '100px' } },
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
    stopTimer: (0, _redux.bindActionCreators)(_rxActions.stopTimer, dispatch)
  };
};

exports.default = (0, _preactRedux.connect)(mapStateToProps, mapDispatchToProps)(Page);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9yeFBhZ2UuanMiXSwibmFtZXMiOlsiUGFnZSIsInByb3BzIiwiZ2V0Tm9kZVN0YXR1cyIsInN0b3BUaW1lciIsIm9wdGlvbiIsIm5vZGVEYXRhIiwibm9kZVN0YXR1cyIsInRleHRBbGlnbiIsIkkxOG4iLCJ0Iiwibm9kZSIsImhvc3RuYW1lIiwiZmxvYXQiLCJmb250U2l6ZSIsIm1vc3RfYWN0aXZlIiwic2lnbmFsIiwic3BsaXQiLCJpZmFjZSIsIk1hdGgiLCJyb3VuZCIsInJ4X2J5dGVzIiwidHhfYnl0ZXMiLCJjbGVhciIsImludGVybmV0IiwiSVB2NCIsIndvcmtpbmciLCJjb2xvciIsIklQdjYiLCJETlMiLCJpcHMiLCJtYXAiLCJpcCIsImtleSIsInZlcnNpb24iLCJhZGRyZXNzIiwicGFkZGluZ1RvcCIsImxvYWRpbmciLCJpc0xvYWRpbmciLCJtYXBTdGF0ZVRvUHJvcHMiLCJzdGF0ZSIsIm1hcERpc3BhdGNoVG9Qcm9wcyIsImRpc3BhdGNoIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTs7QUFFQTs7QUFDQTs7QUFFQTs7QUFDQTs7QUFFQTs7Ozs7Ozs7SUFFYUEsSSxXQUFBQSxJOzs7Ozs7Ozs7Ozt3Q0FFUztBQUNsQixXQUFLQyxLQUFMLENBQVdDLGFBQVg7QUFDRDs7OzJDQUVzQjtBQUNyQixXQUFLRCxLQUFMLENBQVdFLFNBQVg7QUFDRDs7OzRCQUVPQyxNLEVBQVFDLFEsRUFBUztBQUN2QixVQUFJLENBQUNELE1BQUwsRUFBYTtBQUNYLGVBQU8sS0FBS0UsVUFBTCxDQUFnQkQsUUFBaEIsQ0FBUDtBQUNEO0FBQ0QsYUFDRTtBQUFBO0FBQUEsVUFBSSxPQUFPLEVBQUNFLFdBQVUsUUFBWCxFQUFYO0FBQ0dDLGFBQUtDLENBQUwsQ0FBTyx3QkFBUDtBQURILE9BREY7QUFLRDs7OytCQUVVQyxJLEVBQUs7QUFDZCxVQUFJQSxLQUFLQyxRQUFULEVBQW1CO0FBQ2pCLGVBQ0U7QUFBQTtBQUFBO0FBQ0U7QUFBQTtBQUFBO0FB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QyxlQURhO0FBQUEsYUFBYjtBQURKO0FBbkJKLFNBREY7QUE4QkQ7QUFDRjs7OzZCQUVRO0FBQ1AsYUFDRTtBQUFBO0FBQUEsVUFBSyxTQUFNLFdBQVgsRUFBdUIsT0FBTyxFQUFDQyxZQUFXLE9BQVosRUFBOUI7QUFDSSxhQUFLQyxPQUFMLENBQWEsS0FBS25DLEtBQUwsQ0FBV29DLFNBQXhCLEVBQW1DLEtBQUtwQyxLQUFMLENBQVdJLFFBQTlDLEVBQXVELEtBQUtKLEtBQUwsQ0FBV2MsTUFBbEU7QUFESixPQURGO0FBS0Q7Ozs7OztBQUlJLElBQU11Qiw0Q0FBa0IsU0FBbEJBLGVBQWtCLENBQUNDLEtBQUQsRUFBVztBQUN4QyxTQUFPO0FBQ0xsQyxjQUFVLDhCQUFZa0MsS0FBWixDQURMO0FBRUxGLGVBQVcsNEJBQVVFLEtBQVY7QUFGTixHQUFQO0FBSUQsQ0FMTTs7QUFPQSxJQUFNQyxrREFBcUIsU0FBckJBLGtCQUFxQixDQUFDQyxRQUFELEVBQWM7QUFDOUMsU0FBTztBQUNMdkMsbUJBQWUseURBQWlDdUMsUUFBakMsQ0FEVjtBQUVMdEMsZUFBVyxxREFBNkJzQyxRQUE3QjtBQUZOLEdBQVA7QUFJRCxDQUxNOztrQkFPUSwwQkFBUUgsZUFBUixFQUF5QkUsa0JBQXpCLEVBQTZDeEMsSUFBN0MsQyIsImZpbGUiOiJyeFBhZ2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBoLCBDb21wb25lbnQgfSBmcm9tICdwcmVhY3QnO1xuXG5pbXBvcnQgeyBiaW5kQWN0aW9uQ3JlYXRvcnMgfSBmcm9tICdyZWR1eCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncHJlYWN0LXJlZHV4JztcblxuaW1wb3J0IHsgZ2V0Tm9kZVN0YXR1cywgc3RvcFRpbWVyIH0gZnJvbSAnLi9yeEFjdGlvbnMnO1xuaW1wb3J0IHsgZ2V0Tm9kZURhdGEsIGlzTG9hZGluZyB9IGZyb20gJy4vcnhTZWxlY3RvcnMnO1xuXG5pbXBvcnQgeyBCb3ggfSBmcm9tICcuL2NvbXBvbmVudHMvYm94LmpzJztcblxuZXhwb3J0IGNsYXNzIFBhZ2UgZXh0ZW5kcyBDb21wb25lbnQge1xuICBcbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgdGhpcy5wcm9wcy5nZXROb2RlU3RhdHVzKCk7XG4gIH1cblxuICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICB0aGlzLnByb3BzLnN0b3BUaW1lcigpO1xuICB9XG5cbiAgbG9hZGluZyhvcHRpb24sIG5vZGVEYXRhKXtcbiAgICBpZiAoIW9wdGlvbikge1xuICAgICAgcmV0dXJuIHRoaXMubm9kZVN0YXR1cyhub2RlRGF0YSk7XG4gICAgfVxuICAgIHJldHVybiAoXG4gICAgICA8aDQgc3R5bGU9e3t0ZXh0QWxpZ246J2NlbnRlcid9fSA+XG4gICAgICAgIHtJMThuLnQoJ0xvYWRpbmcgbm9kZSBzdGF0dXMuLi4nKX1cbiAgICAgIDwvaDQ+XG4gICAgKTtcbiAgfVxuXG4gIG5vZGVTdGF0dXMobm9kZSl7XG4gICAgaWYgKG5vZGUuaG9zdG5hbWUpIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPGgzPjxiPntJMThuLnQoJ05vZGUnKX08L2I+IHtub2RlLmhvc3RuYW1lfTwvaDM+XG4gICAgICAgICAgXG4gICAgICAgICAgPEJveCB0aXRsZT17STE4bi50KCdNb3N0IEFjdGl2ZScpfT5cbiAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17e2Zsb2F0OidyaWdodCcsZm9udFNpemU6JzIuN2VtJ319Pntub2RlLm1vc3RfYWN0aXZlLnNpZ25hbH08L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3tmb250U2l6ZTonMS40ZW0nfX0+PGI+e25vZGUubW9zdF9hY3RpdmUuaG9zdG5hbWUuc3BsaXQoJ18nKVswXX08L2I+PC9zcGFuPjxici8+XG4gICAgICAgICAgICAgICAgPGI+e0kxOG4udCgnSW50ZXJmYWNlJyl9IDwvYj57bm9kZS5tb3N0X2FjdGl2ZS5pZmFjZS5zcGxpdCgnLScpWzBdfTxici8+XG4gICAgICAgICAgICAgICAgPGI+e0kxOG4udCgnVHJhZmZpYycpfSA8L2I+IHtNYXRoLnJvdW5kKChub2RlLm1vc3RfYWN0aXZlLnJ4X2J5dGVzICsgbm9kZS5tb3N0X2FjdGl2ZS50eF9ieXRlcykvMTAyNC8xMDI0KX1NQlxuICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17e2NsZWFyOidib3RoJ319PjwvZGl2PlxuICAgICAgICAgICA8L0JveD5cblxuICAgICAgICAgICAgPEJveCB0aXRsZT17STE4bi50KCdJbnRlcm5ldCBjb25uZWN0aW9uJyl9PlxuICAgICAgICAgICAgICA8c3Bhbj5cbiAgICAgICAgICAgICAgICA8Yj4geyhub2RlLmludGVybmV0LklQdjQud29ya2luZyA9PT0gMSk/ICg8c3BhbiBzdHlsZT17e2NvbG9yOidncmVlbid9fT7inJQ8L3NwYW4+KTogKDxzcGFuIHN0eWxlPXt7Y29sb3I6J3JlZCd9fT7inJg8L3NwYW4+KX0gSVB2NCA8L2I+XG4gICAgICAgICAgICAgICAgPGI+IHsobm9kZS5pbnRlcm5ldC5JUHY2LndvcmtpbmcgPT09IDEpPyAoPHNwYW4gc3R5bGU9e3tjb2xvcjonZ3JlZW4nfX0+4pyUPC9zcGFuPik6ICg8c3BhbiBzdHlsZT17e2NvbG9yOidyZWQnfX0+4pyYPC9zcGFuPil9IElQdjYgPC9iPlxuICAgICAgICAgICAgICAgIDxiPiB7KG5vZGUuaW50ZXJuZXQuRE5TLndvcmtpbmcgPT09IDEpPyAoPHNwYW4gc3R5bGU9e3tjb2xvcjonZ3JlZW4nfX0+4pyUPC9zcGFuPik6ICg8c3BhbiBzdHlsZT17e2NvbG9yOidyZWQnfX0+4pyYPC9zcGFuPil9IEROUyA8L2I+XG4gICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgIDwvQm94PlxuICAgICAgICAgICAgXG4gICAgICAgICAgICA8Qm94IHRpdGxlPXtJMThuLnQoJ0lQIEFkZHJlc3NlcycpfT5cbiAgICAgICAgICAgICAgeyBub2RlLmlwcy5tYXAoKGlwLGtleSkgPT4gKFxuICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXsoa2V5ID09PSAwKT8ge2ZvbnRTaXplOicxLjRlbSd9IDp7fX0+XG4gICAgICAgICAgICAgICAgICA8Yj5JUHZ7aXAudmVyc2lvbn0gPC9iPiB7aXAuYWRkcmVzc308IGJyLz5cbiAgICAgICAgICAgICAgICA8L3NwYW4+KVxuICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgPC9Cb3g+XG5cbiAgICAgICAgPC9kaXY+XG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzcz1cImNvbnRhaW5lclwiIHN0eWxlPXt7cGFkZGluZ1RvcDonMTAwcHgnfX0+XG4gICAgICAgIHsgdGhpcy5sb2FkaW5nKHRoaXMucHJvcHMuaXNMb2FkaW5nLCB0aGlzLnByb3BzLm5vZGVEYXRhLHRoaXMucHJvcHMuc2lnbmFsKSB9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cblxuZXhwb3J0IGNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IChzdGF0ZSkgPT4ge1xuICByZXR1cm4ge1xuICAgIG5vZGVEYXRhOiBnZXROb2RlRGF0YShzdGF0ZSksXG4gICAgaXNMb2FkaW5nOiBpc0xvYWRpbmcoc3RhdGUpXG4gIH07XG59O1xuXG5leHBvcnQgY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gKGRpc3BhdGNoKSA9PiB7XG4gIHJldHVybiB7XG4gICAgZ2V0Tm9kZVN0YXR1czogYmluZEFjdGlvbkNyZWF0b3JzKGdldE5vZGVTdGF0dXMsZGlzcGF0Y2gpLFxuICAgIHN0b3BUaW1lcjogYmluZEFjdGlvbkNyZWF0b3JzKHN0b3BUaW1lcixkaXNwYXRjaClcbiAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpKFBhZ2UpOyJdfQ==