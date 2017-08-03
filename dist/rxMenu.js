'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RxMenu = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _preact = require('preact');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var globalTranslate = function globalTranslate(value) {
  if (window.I18n === undefined) {
    return value;
  }
  return window.I18n(value);
};

var RxMenu = exports.RxMenu = function (_Component) {
  _inherits(RxMenu, _Component);

  function RxMenu() {
    _classCallCheck(this, RxMenu);

    return _possibleConstructorReturn(this, (RxMenu.__proto__ || Object.getPrototypeOf(RxMenu)).apply(this, arguments));
  }

  _createClass(RxMenu, [{
    key: 'render',
    value: function render() {
      return (0, _preact.h)(
        'a',
        { href: '#/rx' },
        globalTranslate('Status')
      );
    }
  }]);

  return RxMenu;
}(_preact.Component);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9yeE1lbnUuanMiXSwibmFtZXMiOlsiZ2xvYmFsVHJhbnNsYXRlIiwidmFsdWUiLCJ3aW5kb3ciLCJJMThuIiwidW5kZWZpbmVkIiwiUnhNZW51Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7QUFFQSxJQUFNQSxrQkFBa0IsU0FBbEJBLGVBQWtCLENBQUNDLEtBQUQsRUFBVztBQUNqQyxNQUFJQyxPQUFPQyxJQUFQLEtBQWdCQyxTQUFwQixFQUErQjtBQUM3QixXQUFPSCxLQUFQO0FBQ0Q7QUFDRCxTQUFPQyxPQUFPQyxJQUFQLENBQVlGLEtBQVosQ0FBUDtBQUNELENBTEQ7O0lBT2FJLE0sV0FBQUEsTTs7Ozs7Ozs7Ozs7NkJBQ0Y7QUFDUCxhQUFRO0FBQUE7QUFBQSxVQUFHLE1BQU0sTUFBVDtBQUFrQkwsd0JBQWdCLFFBQWhCO0FBQWxCLE9BQVI7QUFDRCIsImZpbGUiOiJyeE1lbnUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIGggfSBmcm9tICdwcmVhY3QnO1xuXG5jb25zdCBnbG9iYWxUcmFuc2xhdGUgPSAodmFsdWUpID0+IHtcbiAgaWYgKHdpbmRvdy5JMThuID09PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cbiAgcmV0dXJuIHdpbmRvdy5JMThuKHZhbHVlKTtcbn07XG5cbmV4cG9ydCBjbGFzcyBSeE1lbnUgZXh0ZW5kcyBDb21wb25lbnQge1xuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuICg8YSBocmVmPXsnIy9yeCd9PntnbG9iYWxUcmFuc2xhdGUoJ1N0YXR1cycpfTwvYT4pO1xuICB9XG59Il19