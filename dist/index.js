'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _rxEpics = require('./rxEpics');

var _rxEpics2 = _interopRequireDefault(_rxEpics);

var _rxReducer = require('./rxReducer');

var _rxSelectors = require('./rxSelectors');

var selector = _interopRequireWildcard(_rxSelectors);

var _rxConstants = require('./rxConstants');

var constants = _interopRequireWildcard(_rxConstants);

var _rxPage = require('./rxPage');

var _rxPage2 = _interopRequireDefault(_rxPage);

var _rxMenu = require('./rxMenu');

var _es = require('../i18n/translations/es.json');

var _es2 = _interopRequireDefault(_es);

var _en = require('../i18n/translations/en.json');

var _en2 = _interopRequireDefault(_en);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'Rx',
  page: _rxPage2.default,
  menu: _rxMenu.RxMenu,
  store: {
    name: 'rx',
    epics: _rxEpics2.default,
    reducer: _rxReducer.reducer,
    selector: selector,
    constants: constants
  },
  translations: Object.assign(_en2.default, _es2.default)
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJzZWxlY3RvciIsImNvbnN0YW50cyIsIm5hbWUiLCJwYWdlIiwibWVudSIsInN0b3JlIiwiZXBpY3MiLCJyZWR1Y2VyIiwidHJhbnNsYXRpb25zIiwiT2JqZWN0IiwiYXNzaWduIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7OztBQUNBOztBQUNBOztJQUFZQSxROztBQUNaOztJQUFZQyxTOztBQUNaOzs7O0FBQ0E7O0FBRUE7Ozs7QUFDQTs7Ozs7Ozs7a0JBRWU7QUFDYkMsUUFBTSxJQURPO0FBRWJDLHdCQUZhO0FBR2JDLHNCQUhhO0FBSWJDLFNBQU87QUFDTEgsVUFBTSxJQUREO0FBRUxJLDRCQUZLO0FBR0xDLCtCQUhLO0FBSUxQLHNCQUpLO0FBS0xDO0FBTEssR0FKTTtBQVdiTyxnQkFBY0MsT0FBT0MsTUFBUDtBQVhELEMiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgIGVwaWNzIGZyb20gJy4vcnhFcGljcyc7XG5pbXBvcnQgeyByZWR1Y2VyIH0gZnJvbSAnLi9yeFJlZHVjZXInO1xuaW1wb3J0ICogYXMgc2VsZWN0b3IgZnJvbSAnLi9yeFNlbGVjdG9ycyc7XG5pbXBvcnQgKiBhcyBjb25zdGFudHMgZnJvbSAnLi9yeENvbnN0YW50cyc7XG5pbXBvcnQgUnggZnJvbSAnLi9yeFBhZ2UnO1xuaW1wb3J0IHsgUnhNZW51IH0gZnJvbSAnLi9yeE1lbnUnO1xuXG5pbXBvcnQgaTE4bkVzIGZyb20gJy4uL2kxOG4vdHJhbnNsYXRpb25zL2VzLmpzb24nO1xuaW1wb3J0IGkxOG5FbiBmcm9tICcuLi9pMThuL3RyYW5zbGF0aW9ucy9lbi5qc29uJztcblxuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAnUngnLFxuICBwYWdlOiBSeCxcbiAgbWVudTogUnhNZW51LFxuICBzdG9yZToge1xuICAgIG5hbWU6ICdyeCcsXG4gICAgZXBpY3MsXG4gICAgcmVkdWNlcixcbiAgICBzZWxlY3RvcixcbiAgICBjb25zdGFudHNcbiAgfSxcbiAgdHJhbnNsYXRpb25zOiBPYmplY3QuYXNzaWduKFxuICAgIGkxOG5FbixcbiAgICBpMThuRXNcbiAgKVxufTtcbiJdfQ==