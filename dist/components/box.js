'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Box = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _preact = require('preact');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Box = exports.Box = function (_Component) {
  _inherits(Box, _Component);

  function Box() {
    _classCallCheck(this, Box);

    return _possibleConstructorReturn(this, (Box.__proto__ || Object.getPrototypeOf(Box)).apply(this, arguments));
  }

  _createClass(Box, [{
    key: 'render',
    value: function render() {
      return (0, _preact.h)(
        'div',
        { style: { marginBottom: '10px' } },
        (0, _preact.h)(
          'div',
          { style: { background: '#90d504', padding: '10px', color: '#fff' } },
          (0, _preact.h)(
            'b',
            null,
            this.props.title
          )
        ),
        (0, _preact.h)(
          'div',
          { style: { border: '1px solid #ccc', padding: '10px' } },
          this.props.children
        )
      );
    }
  }]);

  return Box;
}(_preact.Component);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL2JveC5qcyJdLCJuYW1lcyI6WyJCb3giLCJtYXJnaW5Cb3R0b20iLCJiYWNrZ3JvdW5kIiwicGFkZGluZyIsImNvbG9yIiwicHJvcHMiLCJ0aXRsZSIsImJvcmRlciIsImNoaWxkcmVuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7SUFFYUEsRyxXQUFBQSxHOzs7Ozs7Ozs7Ozs2QkFDRjtBQUNQLGFBQ0U7QUFBQTtBQUFBLFVBQUssT0FBTyxFQUFDQyxjQUFhLE1BQWQsRUFBWjtBQUNFO0FBQUE7QUFBQSxZQUFLLE9BQU8sRUFBQ0MsWUFBVyxTQUFaLEVBQXNCQyxTQUFRLE1BQTlCLEVBQXFDQyxPQUFNLE1BQTNDLEVBQVo7QUFDRTtBQUFBO0FBQUE7QUFBSSxpQkFBS0MsS0FBTCxDQUFXQztBQUFmO0FBREYsU0FERjtBQUlFO0FBQUE7QUFBQSxZQUFLLE9BQU8sRUFBQ0MsUUFBTyxnQkFBUixFQUF5QkosU0FBUSxNQUFqQyxFQUFaO0FBQ0csZUFBS0UsS0FBTCxDQUFXRztBQURkO0FBSkYsT0FERjtBQVVEIiwiZmlsZSI6ImJveC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGgsIENvbXBvbmVudCB9IGZyb20gJ3ByZWFjdCc7XG5cbmV4cG9ydCBjbGFzcyBCb3ggZXh0ZW5kcyBDb21wb25lbnQge1xuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgc3R5bGU9e3ttYXJnaW5Cb3R0b206JzEwcHgnfX0+XG4gICAgICAgIDxkaXYgc3R5bGU9e3tiYWNrZ3JvdW5kOicjOTBkNTA0JyxwYWRkaW5nOicxMHB4Jyxjb2xvcjonI2ZmZid9fT5cbiAgICAgICAgICA8Yj57dGhpcy5wcm9wcy50aXRsZX08L2I+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IHN0eWxlPXt7Ym9yZGVyOicxcHggc29saWQgI2NjYycscGFkZGluZzonMTBweCd9fT5cbiAgICAgICAgICB7dGhpcy5wcm9wcy5jaGlsZHJlbn1cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59Il19